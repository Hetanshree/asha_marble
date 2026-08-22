import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getHandCarvingCustomController, updateHandCarvingCustomController } from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(getHandCarvingCustomController);
export const PUT = withErrorHandling(updateHandCarvingCustomController);
