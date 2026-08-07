import { withErrorHandling } from "@/server/utils/asyncHandler";
import { logoutController } from "@/server/controllers/auth.controller";

export const POST = withErrorHandling(logoutController);
