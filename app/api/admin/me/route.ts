import { withErrorHandling } from "@/server/utils/asyncHandler";
import { meController } from "@/server/controllers/auth.controller";

export const GET = withErrorHandling(meController);
