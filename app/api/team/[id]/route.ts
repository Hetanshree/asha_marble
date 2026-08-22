import { withErrorHandling } from "@/server/utils/asyncHandler";
import {
  deleteTeamMemberController,
  getTeamMemberController,
  updateTeamMemberController,
} from "@/server/controllers/team.controller";

export const GET = withErrorHandling(getTeamMemberController);
export const PUT = withErrorHandling(updateTeamMemberController);
export const DELETE = withErrorHandling(deleteTeamMemberController);
