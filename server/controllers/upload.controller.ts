import type { NextRequest } from "next/server";
import { requireAdmin } from "../middleware/auth.middleware";
import { deleteImageByPublicId, uploadImageBuffer } from "../services/storage";
import { ApiError } from "../utils/ApiError";
import { apiCreated, apiSuccess } from "../utils/ApiResponse";
import { deleteImageSchema } from "../validation/product.validation";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadImageController(request: NextRequest) {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw ApiError.badRequest("No file provided");
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw ApiError.badRequest("Only JPEG, PNG, WEBP, and GIF images are allowed");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw ApiError.badRequest("Image must be smaller than 5MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadImageBuffer(buffer, file.type);

  return apiCreated(uploaded, "Image uploaded successfully");
}

export async function deleteImageController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { publicId } = deleteImageSchema.parse(body);

  await deleteImageByPublicId(publicId);
  return apiSuccess(null, "Image deleted successfully");
}
