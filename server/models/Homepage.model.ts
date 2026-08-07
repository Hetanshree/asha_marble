import { Schema, model, models, Types, type InferSchemaType, type Model } from "mongoose";

const HeroSlideSchema = new Schema(
  {
    eyebrow: { type: String, default: "", trim: true },
    headline: { type: String, required: true, trim: true },
    sub: { type: String, default: "", trim: true },
    image: { type: String, required: true, trim: true },
    imagePublicId: { type: String, default: "" },
    ctaLabel: { type: String, default: "", trim: true },
    ctaHref: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const HomepageSchema = new Schema(
  {
    heroSlides: { type: [HeroSlideSchema], default: [] },
    featuredProducts: { type: [Types.ObjectId], ref: "Product", default: [] },
  },
  { timestamps: true }
);

export type HomepageDoc = InferSchemaType<typeof HomepageSchema>;

export const HomepageModel: Model<HomepageDoc> =
  (models.Homepage as Model<HomepageDoc>) || model<HomepageDoc>("Homepage", HomepageSchema);
