import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const HandCarvingProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: String, required: true, trim: true },
    material: { type: String, default: "", trim: true },
    dimensions: { type: String, default: "", trim: true },
    price: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    cloudinaryPublicIds: { type: [String], default: [] },
    availability: { type: String, enum: ["available", "limited", "on-request"], default: "available" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

HandCarvingProductSchema.index({ category: 1 });
HandCarvingProductSchema.index({ featured: 1 });
HandCarvingProductSchema.index({ active: 1 });
HandCarvingProductSchema.index({ name: "text", shortDescription: "text", description: "text" });

export type HandCarvingProductDoc = InferSchemaType<typeof HandCarvingProductSchema>;

export const HandCarvingProductModel: Model<HandCarvingProductDoc> =
  (models.HandCarvingProduct as Model<HandCarvingProductDoc>) ||
  model<HandCarvingProductDoc>("HandCarvingProduct", HandCarvingProductSchema);
