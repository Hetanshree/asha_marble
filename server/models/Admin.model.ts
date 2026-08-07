import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type AdminDoc = InferSchemaType<typeof AdminSchema>;

export const AdminModel: Model<AdminDoc> =
  (models.Admin as Model<AdminDoc>) || model<AdminDoc>("Admin", AdminSchema);
