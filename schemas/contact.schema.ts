import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Phone number must be a valid 10-digit Indian mobile number"
    ),

  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),

  tags: z
    .array(z.string())
    .min(1, "Please enter at least one tag"),

  status: z.enum(["Active", "Inactive"], {
    error: "Please select a status",
  }),
});

export const editContactSchema = contactSchema.extend({
  id: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type EditContactFormValues = z.infer<typeof editContactSchema>;