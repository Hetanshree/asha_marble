import type { NextRequest } from "next/server";
import { ApiError } from "./ApiError";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function enforceRateLimit(request: NextRequest, key: string, limit: number, windowMs: number): void {
  const bucketKey = `${key}:${getClientIp(request)}`;
  const now = Date.now();
  const bucket = buckets.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw ApiError.tooManyRequests("Too many attempts. Please try again later.");
  }

  bucket.count += 1;
}
