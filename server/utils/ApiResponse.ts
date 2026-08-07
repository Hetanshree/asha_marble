import { NextResponse } from "next/server";
import type { ApiSuccess } from "../types/api.types";

export function apiSuccess<T>(data: T, message = "Success", status = 200, meta?: Record<string, unknown>) {
  const body: ApiSuccess<T> = { success: true, message, data, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status });
}

export function apiCreated<T>(data: T, message = "Created") {
  return apiSuccess(data, message, 201);
}
