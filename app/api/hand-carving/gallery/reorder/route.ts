import { withErrorHandling } from "@/server/utils/asyncHandler";
import { reorderHandCarvingGalleryController } from "@/server/controllers/hand-carving.controller";

export const PUT = withErrorHandling(reorderHandCarvingGalleryController);
