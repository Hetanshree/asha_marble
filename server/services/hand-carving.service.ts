import { Types } from "mongoose";
import { dbConnect } from "../db/connect";
import { HandCarvingAboutModel } from "../models/HandCarvingAbout.model";
import { HandCarvingCustomModel } from "../models/HandCarvingCustom.model";
import { HandCarvingGalleryItemModel } from "../models/HandCarvingGalleryItem.model";
import { HandCarvingProductModel, type HandCarvingProductDoc } from "../models/HandCarvingProduct.model";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import { deleteImagesByPublicIds } from "./storage";
import type {
  CreateHandCarvingGalleryItemInput,
  CreateHandCarvingProductInput,
  HandCarvingGalleryListQuery,
  HandCarvingProductListQuery,
  UpdateHandCarvingAboutInput,
  UpdateHandCarvingCustomInput,
  UpdateHandCarvingGalleryItemInput,
  UpdateHandCarvingProductInput,
} from "../validation/hand-carving.validation";
import type { Pagination } from "../types/api.types";

export type HandCarvingProductLean = HandCarvingProductDoc & { _id: Types.ObjectId; createdAt: Date; updatedAt: Date };

/* ── About ─────────────────────────────────────────── */
export async function getHandCarvingAbout() {
  await dbConnect();
  return HandCarvingAboutModel.findOneAndUpdate(
    {},
    {},
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  ).lean();
}

export async function updateHandCarvingAbout(input: UpdateHandCarvingAboutInput) {
  await dbConnect();

  const existing = await HandCarvingAboutModel.findOne();
  if (existing && input.cloudinaryPublicIds !== undefined) {
    const removed = existing.cloudinaryPublicIds.filter((id) => id && !input.cloudinaryPublicIds!.includes(id));
    if (removed.length > 0) await deleteImagesByPublicIds(removed);
  }

  return HandCarvingAboutModel.findOneAndUpdate(
    {},
    { $set: input },
    { returnDocument: "after", upsert: true, runValidators: true }
  ).lean();
}

/* ── Custom section ────────────────────────────────── */
export async function getHandCarvingCustom() {
  await dbConnect();
  return HandCarvingCustomModel.findOneAndUpdate(
    {},
    {},
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  ).lean();
}

export async function updateHandCarvingCustom(input: UpdateHandCarvingCustomInput) {
  await dbConnect();
  return HandCarvingCustomModel.findOneAndUpdate(
    {},
    { $set: input },
    { returnDocument: "after", upsert: true, runValidators: true }
  ).lean();
}

/* ── Gallery ───────────────────────────────────────── */
export async function listHandCarvingGallery(query: HandCarvingGalleryListQuery, options: { publicOnly: boolean }) {
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (options.publicOnly) filter.active = true;
  else if (query.active !== undefined) filter.active = query.active;

  return HandCarvingGalleryItemModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
}

export async function getHandCarvingGalleryItemById(id: string) {
  await dbConnect();
  const item = await HandCarvingGalleryItemModel.findById(id).lean();
  if (!item) throw ApiError.notFound("Gallery item not found");
  return item;
}

export async function createHandCarvingGalleryItem(input: CreateHandCarvingGalleryItemInput) {
  await dbConnect();

  let order = input.order;
  if (order === undefined) {
    const last = await HandCarvingGalleryItemModel.findOne().sort({ order: -1 }).lean();
    order = last ? last.order + 1 : 0;
  }

  const item = await HandCarvingGalleryItemModel.create({ ...input, order });
  return item.toObject();
}

export async function updateHandCarvingGalleryItem(id: string, input: UpdateHandCarvingGalleryItemInput) {
  await dbConnect();

  const existing = await HandCarvingGalleryItemModel.findById(id);
  if (!existing) throw ApiError.notFound("Gallery item not found");

  if (input.imagePublicId !== undefined && input.imagePublicId !== existing.imagePublicId && existing.imagePublicId) {
    await deleteImagesByPublicIds([existing.imagePublicId]);
  }

  const updated = await HandCarvingGalleryItemModel.findByIdAndUpdate(id, input, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
  if (!updated) throw ApiError.notFound("Gallery item not found");
  return updated;
}

export async function deleteHandCarvingGalleryItem(id: string): Promise<void> {
  await dbConnect();

  const item = await HandCarvingGalleryItemModel.findById(id);
  if (!item) throw ApiError.notFound("Gallery item not found");

  if (item.imagePublicId) await deleteImagesByPublicIds([item.imagePublicId]);
  await item.deleteOne();
}

export async function reorderHandCarvingGallery(ids: string[]) {
  await dbConnect();

  const bulkOps = ids.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
  }));
  if (bulkOps.length > 0) await HandCarvingGalleryItemModel.bulkWrite(bulkOps);

  return HandCarvingGalleryItemModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
}

/* ── Products ──────────────────────────────────────── */
async function generateUniqueSlug(name: string, base?: string, excludeId?: string): Promise<string> {
  const root = slugify(base ?? name);
  let candidate = root;
  let suffix = 1;

  while (true) {
    const query: Record<string, unknown> = { slug: candidate };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await HandCarvingProductModel.exists(query);
    if (!exists) return candidate;
    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
}

export async function listHandCarvingProducts(
  query: HandCarvingProductListQuery,
  options: { publicOnly: boolean }
): Promise<{ items: HandCarvingProductLean[]; pagination: Pagination }> {
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (options.publicOnly) filter.active = true;
  else if (query.active !== undefined) filter.active = query.active;

  if (query.category) filter.category = query.category;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.search) filter.$text = { $search: query.search };

  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    HandCarvingProductModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit).lean(),
    HandCarvingProductModel.countDocuments(filter),
  ]);

  return {
    items: items as unknown as HandCarvingProductLean[],
    pagination: { page: query.page, limit: query.limit, total, totalPages: Math.max(1, Math.ceil(total / query.limit)) },
  };
}

export async function getHandCarvingProductByIdOrSlug(idOrSlug: string, options: { publicOnly: boolean }) {
  await dbConnect();

  const filter: Record<string, unknown> = Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  if (options.publicOnly) filter.active = true;

  const product = await HandCarvingProductModel.findOne(filter).lean();
  if (!product) throw ApiError.notFound("Product not found");
  return product;
}

export async function createHandCarvingProduct(input: CreateHandCarvingProductInput) {
  await dbConnect();

  const slug = await generateUniqueSlug(input.name, input.slug);
  const product = await HandCarvingProductModel.create({ ...input, slug });
  return product.toObject();
}

export async function updateHandCarvingProduct(id: string, input: UpdateHandCarvingProductInput) {
  await dbConnect();

  const existing = await HandCarvingProductModel.findById(id);
  if (!existing) throw ApiError.notFound("Product not found");

  const update: Record<string, unknown> = { ...input };
  if (input.name || input.slug) {
    update.slug = await generateUniqueSlug(input.name ?? existing.name, input.slug, id);
  }

  const updated = await HandCarvingProductModel.findByIdAndUpdate(id, update, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
  if (!updated) throw ApiError.notFound("Product not found");
  return updated;
}

export async function deleteHandCarvingProduct(id: string): Promise<void> {
  await dbConnect();

  const product = await HandCarvingProductModel.findById(id);
  if (!product) throw ApiError.notFound("Product not found");

  await deleteImagesByPublicIds(product.cloudinaryPublicIds);
  await product.deleteOne();
}

export async function removeHandCarvingProductImage(id: string, publicId: string) {
  await dbConnect();

  const product = await HandCarvingProductModel.findById(id);
  if (!product) throw ApiError.notFound("Product not found");

  const index = product.cloudinaryPublicIds.indexOf(publicId);
  if (index === -1) throw ApiError.notFound("Image not found on this product");

  product.images.splice(index, 1);
  product.cloudinaryPublicIds.splice(index, 1);
  await product.save();

  await deleteImagesByPublicIds([publicId]);
  return product.toObject();
}
