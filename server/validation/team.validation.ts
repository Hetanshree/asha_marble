import { z } from "zod";
import { imageUrlSchema } from "./common";

const photoSchema = z.union([imageUrlSchema, z.literal("")]);

export const createTeamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  designation: z.string().trim().min(1, "Designation is required"),
  bio: z.string().trim().optional().default(""),
  photo: photoSchema.default(""),
  photoPublicId: z.string().trim().optional().default(""),
  order: z.number().int().optional(),
  active: z.boolean().default(true),
});

export const updateTeamMemberSchema = z.object({
  name: z.string().trim().min(2).optional(),
  designation: z.string().trim().min(1).optional(),
  bio: z.string().trim().optional(),
  photo: photoSchema.optional(),
  photoPublicId: z.string().trim().optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
});

export const teamListQuerySchema = z.object({
  active: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const reorderTeamSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "At least one team member id is required"),
});

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
export type TeamListQuery = z.infer<typeof teamListQuerySchema>;
export type ReorderTeamInput = z.infer<typeof reorderTeamSchema>;
