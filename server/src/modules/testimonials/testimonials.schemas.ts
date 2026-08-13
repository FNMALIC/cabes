import { z } from "zod";

const optionalTrimmed = (maxLength: number) =>
  z
    .string()
    .max(maxLength)
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      return trimmed ? trimmed : undefined;
    });

export const createTestimonialSchema = z.object({
  authorName: z.string().trim().min(1, "Author name is required").max(200),
  authorRole: optionalTrimmed(200),
  authorCompany: optionalTrimmed(200),
  quote: z.string().trim().min(1, "Quote is required").max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  published: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
