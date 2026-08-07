import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getAboutController, updateAboutController } from "@/server/controllers/about.controller";

export const GET = withErrorHandling(getAboutController);
export const PUT = withErrorHandling(updateAboutController);
