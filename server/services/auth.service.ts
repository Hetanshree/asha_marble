import { dbConnect } from "../db/connect";
import { AdminModel } from "../models/Admin.model";
import { ApiError } from "../utils/ApiError";
import { comparePassword } from "../utils/password";
import { signAdminToken } from "../utils/jwt";
import type { AdminProfile, AdminRole } from "../types/admin.types";
import type { LoginInput } from "../validation/auth.validation";

function toProfile(admin: {
  _id: unknown;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt?: Date;
}): AdminProfile {
  return {
    id: String(admin._id),
    name: admin.name,
    email: admin.email,
    role: admin.role as AdminRole,
    active: admin.active,
    createdAt: (admin.createdAt ?? new Date()).toISOString(),
  };
}

export async function login(input: LoginInput): Promise<{ token: string; profile: AdminProfile }> {
  await dbConnect();

  const admin = await AdminModel.findOne({ email: input.email.toLowerCase() }).select("+passwordHash");
  if (!admin) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  if (!admin.active) {
    throw ApiError.forbidden("This admin account has been disabled");
  }

  const isValid = await comparePassword(input.password, admin.passwordHash);
  if (!isValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signAdminToken({ sub: String(admin._id), email: admin.email, role: admin.role as AdminRole });
  return { token, profile: toProfile(admin) };
}

export async function getProfileById(id: string): Promise<AdminProfile> {
  await dbConnect();
  const admin = await AdminModel.findById(id);
  if (!admin) {
    throw ApiError.unauthorized("Admin account no longer exists");
  }
  return toProfile(admin);
}
