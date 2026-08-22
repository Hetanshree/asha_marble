import { withErrorHandling } from "@/server/utils/asyncHandler";
import { createTeamMemberController, listTeamMembersController } from "@/server/controllers/team.controller";

export const GET = withErrorHandling(listTeamMembersController);
export const POST = withErrorHandling(createTeamMemberController);
