import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  createHandCarvingGalleryItemController,
  listHandCarvingGalleryController,
} from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(listHandCarvingGalleryController);
export const POST = withErrorHandling(createHandCarvingGalleryItemController);
