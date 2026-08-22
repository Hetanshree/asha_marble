import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  deleteHandCarvingGalleryItemController,
  getHandCarvingGalleryItemController,
  updateHandCarvingGalleryItemController,
} from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(getHandCarvingGalleryItemController);
export const PUT = withErrorHandling(updateHandCarvingGalleryItemController);
export const DELETE = withErrorHandling(deleteHandCarvingGalleryItemController);
