import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const HandCarvingCustomSchema = new Schema(
  {
    heading: { type: String, default: "Have a Custom Design in Mind?", trim: true },
    description: {
      type: String,
      default:
        "Bring your ideas to life with our skilled craftsmen. From traditional patterns to custom designs, we create unique hand-carved marble and stone products based on your requirements.",
      trim: true,
    },
    ctaLabel: { type: String, default: "Request a Custom Design", trim: true },
  },
  { timestamps: true }
);

export type HandCarvingCustomDoc = InferSchemaType<typeof HandCarvingCustomSchema>;

export const HandCarvingCustomModel: Model<HandCarvingCustomDoc> =
  (models.HandCarvingCustom as Model<HandCarvingCustomDoc>) ||
  model<HandCarvingCustomDoc>("HandCarvingCustom", HandCarvingCustomSchema);
