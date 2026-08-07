import { withErrorHandling } from "@/server/utils/asyncHandler";
import { createProductController, listProductsController } from "@/server/controllers/product.controller";

export const GET = withErrorHandling(listProductsController);
export const POST = withErrorHandling(createProductController);
