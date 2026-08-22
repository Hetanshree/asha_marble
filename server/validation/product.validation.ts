import { z } from "zod";
import { imageUrlSchema } from "./common";

const imagesSchema = z.array(imageUrlSchema).default([]);
const publicIdsSchema = z.array(z.string().min(1)).default([]);
const availabilitySchema = z.enum(["available", "limited", "on-request"]);

export const createProductSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    slug: z.string().trim().min(2).optional(),
    category: z.string().trim().min(1, "Category is required"),
    price: z.string().trim().min(1, "Price is required"),
    unit: z.string().trim().min(1, "Unit is required"),
    shortDescription: z.string().trim().min(1, "Short description is required"),
    description: z.string().trim().min(1, "Description is required"),
    images: imagesSchema,
    cloudinaryPublicIds: publicIdsSchema,
    availability: availabilitySchema.default("available"),
    featured: z.boolean().default(false),
    active: z.boolean().default(true),
    order: z.number().int().optional(),
    seoTitle: z.string().trim().optional().default(""),
    seoDescription: z.string().trim().optional().default(""),
  })
  .refine((data) => data.images.length === data.cloudinaryPublicIds.length, {
    message: "images and cloudinaryPublicIds must be the same length",
    path: ["cloudinaryPublicIds"],
  });

export const updateProductSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    slug: z.string().trim().min(2).optional(),
    category: z.string().trim().min(1).optional(),
    price: z.string().trim().min(1).optional(),
    unit: z.string().trim().min(1).optional(),
    shortDescription: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    images: z.array(imageUrlSchema).optional(),
    cloudinaryPublicIds: z.array(z.string().min(1)).optional(),
    availability: availabilitySchema.optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional(),
    order: z.number().int().optional(),
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

export const productListQuerySchema = z.object({
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

export const deleteImageSchema = z.object({
  publicId: z.string().min(1, "publicId is required"),
});

export const reorderProductsSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "At least one product id is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
export type ReorderProductsInput = z.infer<typeof reorderProductsSchema>;
