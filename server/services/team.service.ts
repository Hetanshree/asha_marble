import { dbConnect } from "../db/connect";
import { TeamMemberModel } from "../models/Team.model";
import { ApiError } from "../utils/ApiError";
import { deleteImagesByPublicIds } from "./storage";
import type { CreateTeamMemberInput, TeamListQuery, UpdateTeamMemberInput } from "../validation/team.validation";

export async function listTeamMembers(query: TeamListQuery, options: { publicOnly: boolean }) {
  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (options.publicOnly) filter.active = true;
  else if (query.active !== undefined) filter.active = query.active;

  return TeamMemberModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
}

export async function getTeamMemberById(id: string) {
  await dbConnect();

  const member = await TeamMemberModel.findById(id).lean();
  if (!member) throw ApiError.notFound("Team member not found");
  return member;
}

export async function createTeamMember(input: CreateTeamMemberInput) {
  await dbConnect();

  let order = input.order;
  if (order === undefined) {
    const last = await TeamMemberModel.findOne().sort({ order: -1 }).lean();
    order = last ? last.order + 1 : 0;
  }

  const member = await TeamMemberModel.create({ ...input, order });
  return member.toObject();
}

export async function updateTeamMember(id: string, input: UpdateTeamMemberInput) {
  await dbConnect();

  const existing = await TeamMemberModel.findById(id);
  if (!existing) throw ApiError.notFound("Team member not found");

  // Replacing the photo (without having gone through the uploader's own remove
  // step) would otherwise orphan the old Cloudinary asset — clean it up here.
  if (input.photoPublicId !== undefined && input.photoPublicId !== existing.photoPublicId && existing.photoPublicId) {
    await deleteImagesByPublicIds([existing.photoPublicId]);
  }

  const updated = await TeamMemberModel.findByIdAndUpdate(id, input, { returnDocument: "after", runValidators: true }).lean();
  if (!updated) throw ApiError.notFound("Team member not found");
  return updated;
}

export async function deleteTeamMember(id: string): Promise<void> {
  await dbConnect();

  const member = await TeamMemberModel.findById(id);
  if (!member) throw ApiError.notFound("Team member not found");

  if (member.photoPublicId) await deleteImagesByPublicIds([member.photoPublicId]);
  await member.deleteOne();
}

export async function reorderTeamMembers(ids: string[]) {
  await dbConnect();

  const bulkOps = ids.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
  }));
  if (bulkOps.length > 0) await TeamMemberModel.bulkWrite(bulkOps);

  return TeamMemberModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
}
