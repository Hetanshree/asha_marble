import { z } from "zod";

export const imageUrlSchema = z
  .string()
  .trim()
  .min(1, "Image URL is required")
  .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), {
    message: "Must be an absolute URL or a path starting with /",
  });
