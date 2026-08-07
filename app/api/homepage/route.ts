import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getHomepageController, updateHomepageController } from "@/server/controllers/homepage.controller";

export const GET = withErrorHandling(getHomepageController);
export const PUT = withErrorHandling(updateHomepageController);
