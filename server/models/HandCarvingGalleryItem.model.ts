import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const HandCarvingGalleryItemSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    imagePublicId: { type: String, default: "" },
    title: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

HandCarvingGalleryItemSchema.index({ order: 1 });
HandCarvingGalleryItemSchema.index({ active: 1 });

export type HandCarvingGalleryItemDoc = InferSchemaType<typeof HandCarvingGalleryItemSchema>;

export const HandCarvingGalleryItemModel: Model<HandCarvingGalleryItemDoc> =
  (models.HandCarvingGalleryItem as Model<HandCarvingGalleryItemDoc>) ||
  model<HandCarvingGalleryItemDoc>("HandCarvingGalleryItem", HandCarvingGalleryItemSchema);
