import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    cloudinaryPublicIds: { type: [String], default: [] },
    availability: { type: String, enum: ["available", "limited", "on-request"], default: "available" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ active: 1 });
ProductSchema.index({ order: 1 });
ProductSchema.index({ name: "text", shortDescription: "text", description: "text" });

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export const ProductModel: Model<ProductDoc> =
  (models.Product as Model<ProductDoc>) || model<ProductDoc>("Product", ProductSchema);
