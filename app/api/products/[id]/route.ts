import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  deleteProductController,
  getProductController,
  updateProductController,
} from "@/server/controllers/product.controller";

export const GET = withErrorHandling(getProductController);
export const PUT = withErrorHandling(updateProductController);
export const DELETE = withErrorHandling(deleteProductController);
