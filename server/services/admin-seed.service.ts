import { dbConnect } from "../db/connect";
import { AdminModel } from "../models/Admin.model";
import { hashPassword } from "../utils/password";
import { env } from "../config/env";

export async function ensureDefaultAdmin(): Promise<void> {
  await dbConnect();

  const existing = await AdminModel.findOne({ email: env.DEFAULT_ADMIN_EMAIL.toLowerCase() });
  if (existing) return;

  const passwordHash = await hashPassword(env.DEFAULT_ADMIN_PASSWORD);
  await AdminModel.create({
    name: env.DEFAULT_ADMIN_NAME,
    email: env.DEFAULT_ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: "superadmin",
    active: true,
  });

  console.log(`[seed] Default admin account created for ${env.DEFAULT_ADMIN_EMAIL}`);
}
