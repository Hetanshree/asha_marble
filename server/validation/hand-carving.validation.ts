import { z } from "zod";
import { imageUrlSchema } from "./common";

/* ── About ─────────────────────────────────────────── */
const highlightSchema = z.object({
  title: z.string().trim().min(1, "Highlight title is required"),
  description: z.string().trim().optional().default(""),
});

export const updateHandCarvingAboutSchema = z
  .object({
    sectionLabel: z.string().trim().optional(),
    heading: z.string().trim().optional(),
    description: z.string().trim().optional(),
    paragraphs: z.array(z.string().trim()).optional(),
    images: z.array(imageUrlSchema).optional(),
    cloudinaryPublicIds: z.array(z.string().min(1)).optional(),
    highlights: z.array(highlightSchema).optional(),
  })
  .refine(
    (data) =>
      data.images === undefined ||
      data.cloudinaryPublicIds === undefined ||
      data.images.length === data.cloudinaryPublicIds.length,
    { message: "images and cloudinaryPublicIds must be the same length", path: ["cloudinaryPublicIds"] }
  );

export type UpdateHandCarvingAboutInput = z.infer<typeof updateHandCarvingAboutSchema>;

/* ── Custom section ────────────────────────────────── */
export const updateHandCarvingCustomSchema = z.object({
  heading: z.string().trim().optional(),
  description: z.string().trim().optional(),
  ctaLabel: z.string().trim().optional(),
});

export type UpdateHandCarvingCustomInput = z.infer<typeof updateHandCarvingCustomSchema>;

/* ── Gallery ───────────────────────────────────────── */
export const createHandCarvingGalleryItemSchema = z.object({
  image: imageUrlSchema,
  imagePublicId: z.string().trim().optional().default(""),
  title: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  order: z.number().int().optional(),
  active: z.boolean().default(true),
});

export const updateHandCarvingGalleryItemSchema = z.object({
  image: imageUrlSchema.optional(),
  imagePublicId: z.string().trim().optional(),
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
});

export const handCarvingGalleryListQuerySchema = z.object({
  active: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const reorderHandCarvingGallerySchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "At least one gallery item id is required"),
});

export type CreateHandCarvingGalleryItemInput = z.infer<typeof createHandCarvingGalleryItemSchema>;
export type UpdateHandCarvingGalleryItemInput = z.infer<typeof updateHandCarvingGalleryItemSchema>;
export type HandCarvingGalleryListQuery = z.infer<typeof handCarvingGalleryListQuerySchema>;

/* ── Products ──────────────────────────────────────── */
const imagesSchema = z.array(imageUrlSchema).default([]);
const publicIdsSchema = z.array(z.string().min(1)).default([]);
const availabilitySchema = z.enum(["available", "limited", "on-request"]);

export const createHandCarvingProductSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    slug: z.string().trim().min(2).optional(),
    category: z.string().trim().min(1, "Category is required"),
    material: z.string().trim().optional().default(""),
    dimensions: z.string().trim().optional().default(""),
    price: z.string().trim().min(1, "Price is required"),
    unit: z.string().trim().min(1, "Unit is required"),
    shortDescription: z.string().trim().min(1, "Short description is required"),
    description: z.string().trim().min(1, "Description is required"),
    images: imagesSchema,
    cloudinaryPublicIds: publicIdsSchema,
    availability: availabilitySchema.default("available"),
    featured: z.boolean().default(false),
    active: z.boolean().default(true),
    seoTitle: z.string().trim().optional().default(""),
    seoDescription: z.string().trim().optional().default(""),
  })
  .refine((data) => data.images.length === data.cloudinaryPublicIds.length, {
    message: "images and cloudinaryPublicIds must be the same length",
    path: ["cloudinaryPublicIds"],
  });

export const updateHandCarvingProductSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    slug: z.string().trim().min(2).optional(),
    category: z.string().trim().min(1).optional(),
    material: z.string().trim().optional(),
    dimensions: z.string().trim().optional(),
    price: z.string().trim().min(1).optional(),
    unit: z.string().trim().min(1).optional(),
    shortDescription: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    images: z.array(imageUrlSchema).optional(),
    cloudinaryPublicIds: z.array(z.string().min(1)).optional(),
    availability: availabilitySchema.optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional(),
    seoTitle: z.string().trim().optional(),
    seoDescription: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      data.images === undefined ||
      data.cloudinaryPublicIds === undefined ||
      data.images.length === data.cloudinaryPublicIds.length,
    { message: "images and cloudinaryPublicIds must be the same length", path: ["cloudinaryPublicIds"] }
  );

export const handCarvingProductListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().trim().optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  active: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  search: z.string().trim().optional(),
});

export const deleteHandCarvingProductImageSchema = z.object({
  publicId: z.string().min(1, "publicId is required"),
});

export type CreateHandCarvingProductInput = z.infer<typeof createHandCarvingProductSchema>;
export type UpdateHandCarvingProductInput = z.infer<typeof updateHandCarvingProductSchema>;
export type HandCarvingProductListQuery = z.infer<typeof handCarvingProductListQuerySchema>;
