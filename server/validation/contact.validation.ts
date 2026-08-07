import { z } from "zod";

const businessHourSchema = z.object({
  days: z.string().trim().min(1),
  time: z.string().trim().min(1),
});

const addressSchema = z.object({
  label: z.string().trim().optional(),
  address: z.string().trim().min(1),
});

export const updateContactSchema = z.object({
  addresses: z.array(addressSchema).optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  whatsapp: z.string().trim().optional(),
  mapUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  businessHours: z.array(businessHourSchema).optional(),
});

export type UpdateContactInput = z.infer<typeof updateContactSchema>;
