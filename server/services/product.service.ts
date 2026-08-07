import { Types } from "mongoose";
import { dbConnect } from "../db/connect";
import { ProductModel, type ProductDoc } from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import { deleteImagesByPublicIds } from "./storage";
import type { CreateProductInput, ProductListQuery, UpdateProductInput } from "../validation/product.validation";
import type { Pagination } from "../types/api.types";

export type ProductLean = ProductDoc & { _id: Types.ObjectId; createdAt: Date; updatedAt: Date };

async function generateUniqueSlug(name: string, base?: string, excludeId?: string): Promise<string> {
  const root = slugify(base ?? name);
  let candidate = root;
  let suffix = 1;

  while (true) {
    const query: Record<string, unknown> = { slug: candidate };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await ProductModel.exists(query);
    if (!exists) return candidate;
    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
}

export async function listProducts(
  query: ProductListQuery,
  options: { publicOnly: boolean }
): Promise<{ items: ProductLean[]; pagination: Pagination }> {
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (options.publicOnly) filter.active = true;
  else if (query.active !== undefined) filter.active = query.active;

  if (query.category) filter.category = query.category;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.search) filter.$text = { $search: query.search };

  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    ProductModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit).lean(),
    ProductModel.countDocuments(filter),
  ]);

  return {
    items: items as unknown as ProductLean[],
    pagination: { page: query.page, limit: query.limit, total, totalPages: Math.max(1, Math.ceil(total / query.limit)) },
  };
}

export async function getProductByIdOrSlug(idOrSlug: string, options: { publicOnly: boolean }) {
  await dbConnect();

  const filter: Record<string, unknown> = Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  if (options.publicOnly) filter.active = true;

  const product = await ProductModel.findOne(filter).lean();
  if (!product) throw ApiError.notFound("Product not found");
  return product;
}

export async function createProduct(input: CreateProductInput) {
  await dbConnect();

  const slug = await generateUniqueSlug(input.name, input.slug);
  const product = await ProductModel.create({ ...input, slug });
  return product.toObject();
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  await dbConnect();

  const existing = await ProductModel.findById(id);
  if (!existing) throw ApiError.notFound("Product not found");

  const update: Record<string, unknown> = { ...input };
  if (input.name || input.slug) {
    update.slug = await generateUniqueSlug(input.name ?? existing.name, input.slug, id);
  }

  const updated = await ProductModel.findByIdAndUpdate(id, update, { returnDocument: "after", runValidators: true }).lean();
  if (!updated) throw ApiError.notFound("Product not found");
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  await dbConnect();

  const product = await ProductModel.findById(id);
  if (!product) throw ApiError.notFound("Product not found");

  await deleteImagesByPublicIds(product.cloudinaryPublicIds);
  await product.deleteOne();
}

export async function removeProductImage(id: string, publicId: string) {
  await dbConnect();

  const product = await ProductModel.findById(id);
  if (!product) throw ApiError.notFound("Product not found");

  const index = product.cloudinaryPublicIds.indexOf(publicId);
  if (index === -1) throw ApiError.notFound("Image not found on this product");

  product.images.splice(index, 1);
  product.cloudinaryPublicIds.splice(index, 1);
  await product.save();

  await deleteImagesByPublicIds([publicId]);
  return product.toObject();
}
