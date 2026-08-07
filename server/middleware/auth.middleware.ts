import { cookies } from "next/headers";
import { ApiError } from "../utils/ApiError";
import { verifyAdminToken } from "../utils/jwt";
import type { JwtPayload } from "../types/admin.types";

export const ADMIN_COOKIE_NAME = "admin_token";

export async function requireAdmin(): Promise<JwtPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    throw ApiError.unauthorized("Authentication required");
  }

  try {
    return verifyAdminToken(token);
  } catch {
    throw ApiError.unauthorized("Session expired or invalid. Please log in again.");
  }
}

export async function optionalAdmin(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
