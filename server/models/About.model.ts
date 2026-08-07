import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const AboutSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    experience: { type: String, default: "" },
    images: { type: [String], default: [] },
    cloudinaryPublicIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export type AboutDoc = InferSchemaType<typeof AboutSchema>;

export const AboutModel: Model<AboutDoc> =
  (models.About as Model<AboutDoc>) || model<AboutDoc>("About", AboutSchema);
