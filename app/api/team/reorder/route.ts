import { withErrorHandling } from "@/server/utils/asyncHandler";
import { reorderTeamMembersController } from "@/server/controllers/team.controller";

export const PUT = withErrorHandling(reorderTeamMembersController);
