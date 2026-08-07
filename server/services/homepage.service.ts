import { dbConnect } from "../db/connect";
import { HomepageModel } from "../models/Homepage.model";
import "../models/Product.model";
import type { UpdateHomepageInput } from "../validation/homepage.validation";

export async function getHomepage() {
  await dbConnect();
  const homepage = await HomepageModel.findOneAndUpdate({}, {}, { returnDocument: "after", upsert: true, setDefaultsOnInsert: true })
    .populate("featuredProducts")
    .lean();
  return homepage;
}

export async function updateHomepage(input: UpdateHomepageInput) {
  await dbConnect();
  const homepage = await HomepageModel.findOneAndUpdate({}, { $set: input }, { returnDocument: "after", upsert: true, runValidators: true })
    .populate("featuredProducts")
    .lean();
  return homepage;
}
