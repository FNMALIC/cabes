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

export const createContactSubmissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: optionalTrimmed(200),
  email: z.string().trim().email("Invalid email"),
  phone: optionalTrimmed(50),
  subject: optionalTrimmed(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const submissionStatusSchema = z.enum(["NEW", "READ", "ARCHIVED"]);

export const updateSubmissionStatusSchema = z.object({
  status: submissionStatusSchema,
});

export const listSubmissionsQuerySchema = z.object({
  status: submissionStatusSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
