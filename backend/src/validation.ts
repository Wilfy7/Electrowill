import { z } from "zod";

// User data validation schema
export const userDataSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});




export const userQuerySchema = z.object({
    page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, { message: "Page must be a positive integer" }),


    limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .refine((val) => val > 0, { message: "Limit must be a positive integer" }),

    sort: z.string().optional(), 
});