import { withErrorHandling } from "@/server/utils/asyncHandler";
import { deleteHandCarvingProductImageController } from "@/server/controllers/hand-carving.controller";

export const DELETE = withErrorHandling(deleteHandCarvingProductImageController);
