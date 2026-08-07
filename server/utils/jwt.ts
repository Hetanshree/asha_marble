import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload } from "../types/admin.types";

export function signAdminToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
}

export function verifyAdminToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
