import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre es obligatorio."),
  description: z.string().trim().optional(),
  is_active: z.boolean(),
});

export type CategorySchemaValues = z.infer<typeof categorySchema>;
