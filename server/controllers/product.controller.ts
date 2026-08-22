import type { NextRequest } from "next/server";
import {
  createProductSchema,
  deleteImageSchema,
  productListQuerySchema,
  reorderProductsSchema,
  updateProductSchema,
} from "../validation/product.validation";
import {
  createProduct,
  deleteProduct,
  getProductByIdOrSlug,
  listProducts,
  removeProductImage,
  reorderProducts,
  updateProduct,
} from "../services/product.service";
import { requireAdmin, optionalAdmin } from "../middleware/auth.middleware";
import { apiCreated, apiSuccess } from "../utils/ApiResponse";

export async function listProductsController(request: NextRequest) {
  const admin = await optionalAdmin();
  const query = productListQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));

  const { items, pagination } = await listProducts(query, { publicOnly: !admin });
  return apiSuccess(items, "Products fetched successfully", 200, { pagination });
}

export async function getProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await optionalAdmin();
  const { id } = await context.params;

  const product = await getProductByIdOrSlug(id, { publicOnly: !admin });
  return apiSuccess(product, "Product fetched successfully");
}

export async function createProductController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = createProductSchema.parse(body);

  const product = await createProduct(input);
  return apiCreated(product, "Product created successfully");
}

export async function updateProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const input = updateProductSchema.parse(body);

  const product = await updateProduct(id, input);
  return apiSuccess(product, "Product updated successfully");
}

export async function deleteProductController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  await deleteProduct(id);
  return apiSuccess(null, "Product deleted successfully");
}

export async function reorderProductsController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { ids } = reorderProductsSchema.parse(body);

  const items = await reorderProducts(ids);
  return apiSuccess(items, "Product order updated successfully");
}

export async function deleteProductImageController(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const { publicId } = deleteImageSchema.parse(body);

  const product = await removeProductImage(id, publicId);
  return apiSuccess(product, "Image removed successfully");
}
