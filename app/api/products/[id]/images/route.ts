import { withErrorHandling } from "@/server/utils/asyncHandler";
import { deleteProductImageController } from "@/server/controllers/product.controller";

export const DELETE = withErrorHandling(deleteProductImageController);
