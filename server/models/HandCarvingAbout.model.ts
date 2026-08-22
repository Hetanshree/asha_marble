import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const HighlightSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const HandCarvingAboutSchema = new Schema(
  {
    sectionLabel: { type: String, default: "About Hand Carving", trim: true },
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    paragraphs: { type: [String], default: [] },
    images: { type: [String], default: [] },
    cloudinaryPublicIds: { type: [String], default: [] },
    highlights: { type: [HighlightSchema], default: [] },
  },
  { timestamps: true }
);

export type HandCarvingAboutDoc = InferSchemaType<typeof HandCarvingAboutSchema>;

export const HandCarvingAboutModel: Model<HandCarvingAboutDoc> =
  (models.HandCarvingAbout as Model<HandCarvingAboutDoc>) ||
  model<HandCarvingAboutDoc>("HandCarvingAbout", HandCarvingAboutSchema);
