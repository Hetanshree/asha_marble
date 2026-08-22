import type { NextRequest } from "next/server";
import {
  createTeamMemberSchema,
  reorderTeamSchema,
  teamListQuerySchema,
  updateTeamMemberSchema,
} from "../validation/team.validation";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMemberById,
  listTeamMembers,
  reorderTeamMembers,
  updateTeamMember,
} from "../services/team.service";
import { requireAdmin, optionalAdmin } from "../middleware/auth.middleware";
import { apiCreated, apiSuccess } from "../utils/ApiResponse";

export async function listTeamMembersController(request: NextRequest) {
  const admin = await optionalAdmin();
  const query = teamListQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));

  const items = await listTeamMembers(query, { publicOnly: !admin });
  return apiSuccess(items, "Team members fetched successfully");
}

export async function getTeamMemberController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  const member = await getTeamMemberById(id);
  return apiSuccess(member, "Team member fetched successfully");
}

export async function createTeamMemberController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const input = createTeamMemberSchema.parse(body);

  const member = await createTeamMember(input);
  return apiCreated(member, "Team member created successfully");
}

export async function updateTeamMemberController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const input = updateTeamMemberSchema.parse(body);

  const member = await updateTeamMember(id, input);
  return apiSuccess(member, "Team member updated successfully");
}

export async function deleteTeamMemberController(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await context.params;

  await deleteTeamMember(id);
  return apiSuccess(null, "Team member deleted successfully");
}

export async function reorderTeamMembersController(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { ids } = reorderTeamSchema.parse(body);

  const items = await reorderTeamMembers(ids);
  return apiSuccess(items, "Team order updated successfully");
}
