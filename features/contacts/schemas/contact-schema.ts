import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.email("Enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  company: z.string().min(2, "Company is required"),

  status: z.enum(["Active", "Inactive"]),
});

export type ContactFormData = z.infer<typeof contactSchema>;