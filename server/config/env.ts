import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  IMAGE_STORAGE_PROVIDER: z.enum(["local", "cloudinary"]).default("local"),
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(""),
  CLOUDINARY_API_KEY: z.string().optional().default(""),
  CLOUDINARY_API_SECRET: z.string().optional().default(""),
  NEXT_PUBLIC_BASE_URL: z.string().optional().default("http://localhost:3000"),
  DEFAULT_ADMIN_NAME: z.string().optional().default("Admin"),
  DEFAULT_ADMIN_EMAIL: z.string().email().optional().default("ashamarble250@gmail.com"),
  DEFAULT_ADMIN_PASSWORD: z.string().min(6).optional().default("shree@1601"),
  NODE_ENV: z.string().optional().default("development"),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${issues}`);
  }
  return parsed.data;
}

export const env = loadEnv();

export const isProduction = env.NODE_ENV === "production";
