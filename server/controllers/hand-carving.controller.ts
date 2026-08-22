import type { NextRequest } from "next/server";
import {
  createHandCarvingGalleryItemSchema,
  createHandCarvingProductSchema,
  deleteHandCarvingProductImageSchema,
  handCarvingGalleryListQuerySchema,
  handCarvingProductListQuerySchema,
  reorderHandCarvingGallerySchema,
  updateHandCarvingAboutSchema,
  updateHandCarvingCustomSchema,
  updateHandCarvingGalleryItemSchema,
  updateHandCarvingProductSchema,
} from "../validation/hand-carving.validation";
import {
  createHandCarvingGalleryItem,
  createHandCarvingProduct,
  deleteHandCarvingGalleryItem,
  deleteHandCarvingProduct,
  getHandCarvingAbout,
  getHandCarvingCustom,
  getHandCarvingGalleryItemById,
  getHandCarvingProductByIdOrSlug,
  listHandCarvingGallery,
  listHandCarvingProducts,
  removeHandCarvingProductImage,
  reorderHandCarvingGallery,
  updateHandCarvingAbout,
  updateHandCarvingCustom,
  updateHandCarvingGalleryItem,
  updateHandCarvingProduct,
} from "../services/hand-carving.service";
import { requireAdmin, optionalAdmin } from "../middleware/auth.middleware";
import { apiCreated, apiSuccess } from "../utils/ApiResponse";

/* ── About ─────────────────────────────────────────── */
export async function getHandCarvingAboutController() {
  const about = await getHandCarvingAbout();
  return apiSuccess(about, "Hand carving about content fetched successfully");
}

export async function updateHandCarvingAboutController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = updateHandCarvingAboutSchema.parse(body);

  const about = await updateHandCarvingAbout(input);
  return apiSuccess(about, "Hand carving about content updated successfully");
}

/* ── Custom section ────────────────────────────────── */
export async function getHandCarvingCustomController() {
  const custom = await getHandCarvingCustom();
  return apiSuccess(custom, "Hand carving custom section fetched successfully");
}

export async function updateHandCarvingCustomController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = updateHandCarvingCustomSchema.parse(body);

  const custom = await updateHandCarvingCustom(input);
  return apiSuccess(custom, "Hand carving custom section updated successfully");
}

/* ── Gallery ───────────────────────────────────────── */
export async function listHandCarvingGalleryController(request: NextRequest) {
  const admin = await optionalAdmin();
  const query = handCarvingGalleryListQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));

  const items = await listHandCarvingGallery(query, { publicOnly: !admin });
  return apiSuccess(items, "Hand carving gallery fetched successfully");
}

export async function getHandCarvingGalleryItemController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  const item = await getHandCarvingGalleryItemById(id);
  return apiSuccess(item, "Gallery item fetched successfully");
}

export async function createHandCarvingGalleryItemController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = createHandCarvingGalleryItemSchema.parse(body);

  const item = await createHandCarvingGalleryItem(input);
  return apiCreated(item, "Gallery item created successfully");
}

export async function updateHandCarvingGalleryItemController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const input = updateHandCarvingGalleryItemSchema.parse(body);

  const item = await updateHandCarvingGalleryItem(id, input);
  return apiSuccess(item, "Gallery item updated successfully");
}

export async function deleteHandCarvingGalleryItemController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  await deleteHandCarvingGalleryItem(id);
  return apiSuccess(null, "Gallery item deleted successfully");
}

export async function reorderHandCarvingGalleryController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { ids } = reorderHandCarvingGallerySchema.parse(body);

  const items = await reorderHandCarvingGallery(ids);
  return apiSuccess(items, "Gallery order updated successfully");
}

/* ── Products ──────────────────────────────────────── */
export async function listHandCarvingProductsController(request: NextRequest) {
  const admin = await optionalAdmin();
  const query = handCarvingProductListQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));

  const { items, pagination } = await listHandCarvingProducts(query, { publicOnly: !admin });
  return apiSuccess(items, "Hand carving products fetched successfully", 200, { pagination });
}

export async function getHandCarvingProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await optionalAdmin();
  const { id } = await context.params;

  const product = await getHandCarvingProductByIdOrSlug(id, { publicOnly: !admin });
  return apiSuccess(product, "Product fetched successfully");
}

export async function createHandCarvingProductController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = createHandCarvingProductSchema.parse(body);

  const product = await createHandCarvingProduct(input);
  return apiCreated(product, "Product created successfully");
}

export async function updateHandCarvingProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const input = updateHandCarvingProductSchema.parse(body);

  const product = await updateHandCarvingProduct(id, input);
  return apiSuccess(product, "Product updated successfully");
}

export async function deleteHandCarvingProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  await deleteHandCarvingProduct(id);
  return apiSuccess(null, "Product deleted successfully");
}

export async function deleteHandCarvingProductImageController(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const { publicId } = deleteHandCarvingProductImageSchema.parse(body);

  const product = await removeHandCarvingProductImage(id, publicId);
  return apiSuccess(product, "Image removed successfully");
}
