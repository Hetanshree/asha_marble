import { z } from "zod";
import { imageUrlSchema } from "./common";

export const updateAboutSchema = z
  .object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    mission: z.string().trim().optional(),
    vision: z.string().trim().optional(),
    experience: z.string().trim().optional(),
    images: z.array(imageUrlSchema).optional(),
    cloudinaryPublicIds: z.array(z.string().min(1)).optional(),
  })
  .refine(
    (data) =>
      data.images === undefined ||
      data.cloudinaryPublicIds === undefined ||
      data.images.length === data.cloudinaryPublicIds.length,
    { message: "images and cloudinaryPublicIds must be the same length", path: ["cloudinaryPublicIds"] }
  );

export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;
