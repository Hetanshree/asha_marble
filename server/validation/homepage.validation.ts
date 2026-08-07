import { z } from "zod";
import { imageUrlSchema } from "./common";

const heroSlideSchema = z.object({
  eyebrow: z.string().trim().optional().default(""),
  headline: z.string().trim().min(1, "Headline is required"),
  sub: z.string().trim().optional().default(""),
  image: imageUrlSchema,
  imagePublicId: z.string().trim().optional().default(""),
  ctaLabel: z.string().trim().optional().default(""),
  ctaHref: z.string().trim().optional().default(""),
});

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id");

export const updateHomepageSchema = z.object({
  heroSlides: z.array(heroSlideSchema).optional(),
  featuredProducts: z.array(objectIdSchema).optional(),
});

export type UpdateHomepageInput = z.infer<typeof updateHomepageSchema>;
