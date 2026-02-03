import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required").max(20),
  attendance: z.enum(["yes", "no", "maybe"]),
  guestCount: z.number().int().min(1).max(10).default(1),
  dietaryRestrictions: z.string().max(500).optional(),
  message: z.string().max(1000).optional(),
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;

export const rsvpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type RSVPResponse = z.infer<typeof rsvpResponseSchema>;
