import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  createHandCarvingProductController,
  listHandCarvingProductsController,
} from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(listHandCarvingProductsController);
export const POST = withErrorHandling(createHandCarvingProductController);
