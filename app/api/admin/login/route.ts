import { withErrorHandling } from "@/server/utils/asyncHandler";
import { loginController } from "@/server/controllers/auth.controller";

export const POST = withErrorHandling(loginController);
