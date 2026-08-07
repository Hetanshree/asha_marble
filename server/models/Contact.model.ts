import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const BusinessHourSchema = new Schema(
  {
    days: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    label: { type: String, default: "" },
    address: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    addresses: { type: [AddressSchema], default: [] },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    mapUrl: { type: String, default: "" },
    businessHours: { type: [BusinessHourSchema], default: [] },
  },
  { timestamps: true }
);

export type ContactDoc = InferSchemaType<typeof ContactSchema>;

export const ContactModel: Model<ContactDoc> =
  (models.Contact as Model<ContactDoc>) || model<ContactDoc>("Contact", ContactSchema);
