import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "./ApiError";
import { isProduction } from "../config/env";
import type { ApiFailure } from "../types/api.types";

type RouteHandler<Ctx> = (request: NextRequest, context: Ctx) => Promise<NextResponse>;

function isMongoDuplicateKeyError(err: unknown): err is { code: number; keyValue?: Record<string, unknown> } {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000;
}

function isMongooseValidationError(err: unknown): err is { name: string; errors: Record<string, { message: string }> } {
  return typeof err === "object" && err !== null && (err as { name?: string }).name === "ValidationError";
}

export function withErrorHandling<Ctx = unknown>(handler: RouteHandler<Ctx>): RouteHandler<Ctx> {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      if (err instanceof ApiError) {
        const body: ApiFailure = { success: false, message: err.message, ...(err.errors ? { errors: err.errors } : {}) };
        return NextResponse.json(body, { status: err.statusCode });
      }

      if (err instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        for (const issue of err.issues) {
          const key = issue.path.join(".") || "_";
          errors[key] = errors[key] ?? [];
          errors[key].push(issue.message);
        }
        const body: ApiFailure = { success: false, message: "Validation failed", errors };
        return NextResponse.json(body, { status: 400 });
      }

      if (isMongooseValidationError(err)) {
        const errors: Record<string, string[]> = {};
        for (const [key, value] of Object.entries(err.errors)) {
          errors[key] = [value.message];
        }
        const body: ApiFailure = { success: false, message: "Validation failed", errors };
        return NextResponse.json(body, { status: 400 });
      }

      if (isMongoDuplicateKeyError(err)) {
        const field = Object.keys(err.keyValue ?? {})[0] ?? "field";
        const body: ApiFailure = { success: false, message: `${field} already exists` };
        return NextResponse.json(body, { status: 409 });
      }

      console.error("[API Error]", err);
      const body: ApiFailure = {
        success: false,
        message: isProduction ? "Internal server error" : err instanceof Error ? err.message : "Internal server error",
      };
      return NextResponse.json(body, { status: 500 });
    }
  };
}
