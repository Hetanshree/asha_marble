import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  deleteHandCarvingProductController,
  getHandCarvingProductController,
  updateHandCarvingProductController,
} from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(getHandCarvingProductController);
export const PUT = withErrorHandling(updateHandCarvingProductController);
export const DELETE = withErrorHandling(deleteHandCarvingProductController);
