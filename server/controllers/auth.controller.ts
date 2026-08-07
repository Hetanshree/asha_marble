import type { NextRequest } from "next/server";
import { loginSchema } from "../validation/auth.validation";
import { login, getProfileById } from "../services/auth.service";
import { requireAdmin, ADMIN_COOKIE_NAME } from "../middleware/auth.middleware";
import { apiSuccess } from "../utils/ApiResponse";
import { enforceRateLimit } from "../utils/rateLimit";
import { env, isProduction } from "../config/env";
import { durationToSeconds } from "../utils/duration";

export async function loginController(request: NextRequest) {
  enforceRateLimit(request, "admin-login", 10, 15 * 60 * 1000);

  const body = await request.json();
  const input = loginSchema.parse(body);

  const { token, profile } = await login(input);

  const response = apiSuccess(profile, "Logged in successfully");
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: durationToSeconds(env.JWT_EXPIRES_IN),
  });
  return response;
}

export async function logoutController() {
  await requireAdmin();
  const response = apiSuccess(null, "Logged out successfully");
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

export async function meController() {
  const payload = await requireAdmin();
  const profile = await getProfileById(payload.sub);
  return apiSuccess(profile, "Profile fetched successfully");
}
