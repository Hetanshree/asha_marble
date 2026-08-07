import { dbConnect } from "../db/connect";
import { ContactModel } from "../models/Contact.model";
import type { UpdateContactInput } from "../validation/contact.validation";

export async function getContact() {
  await dbConnect();
  const contact = await ContactModel.findOneAndUpdate({}, {}, { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }).lean();
  return contact;
}

export async function updateContact(input: UpdateContactInput) {
  await dbConnect();
  const contact = await ContactModel.findOneAndUpdate({}, { $set: input }, { returnDocument: "after", upsert: true, runValidators: true }).lean();
  return contact;
}
