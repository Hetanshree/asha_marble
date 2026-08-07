import { dbConnect } from "../db/connect";
import { AboutModel } from "../models/About.model";
import type { UpdateAboutInput } from "../validation/about.validation";

export async function getAbout() {
  await dbConnect();
  const about = await AboutModel.findOneAndUpdate({}, {}, { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }).lean();
  return about;
}

export async function updateAbout(input: UpdateAboutInput) {
  await dbConnect();
  const about = await AboutModel.findOneAndUpdate({}, { $set: input }, { returnDocument: "after", upsert: true, runValidators: true }).lean();
  return about;
}
