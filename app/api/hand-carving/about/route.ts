import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getHandCarvingAboutController, updateHandCarvingAboutController } from "@/server/controllers/hand-carving.controller";

export const GET = withErrorHandling(getHandCarvingAboutController);
export const PUT = withErrorHandling(updateHandCarvingAboutController);
