import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    bio: { type: String, default: "", trim: true },
    photo: { type: String, default: "", trim: true },
    photoPublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ order: 1 });
TeamMemberSchema.index({ active: 1 });

export type TeamMemberDoc = InferSchemaType<typeof TeamMemberSchema>;

export const TeamMemberModel: Model<TeamMemberDoc> =
  (models.TeamMember as Model<TeamMemberDoc>) || model<TeamMemberDoc>("TeamMember", TeamMemberSchema);
