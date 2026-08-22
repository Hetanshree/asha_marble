import { withErrorHandling } from "@/server/utils/asyncHandler";
import { reorderProductsController } from "@/server/controllers/product.controller";

export const PUT = withErrorHandling(reorderProductsController);
