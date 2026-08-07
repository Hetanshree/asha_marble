import { withErrorHandling } from "@/server/utils/asyncHandler";
import { getDashboardController } from "@/server/controllers/dashboard.controller";

export const GET = withErrorHandling(getDashboardController);
