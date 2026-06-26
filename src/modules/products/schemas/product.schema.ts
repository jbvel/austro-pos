import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre es obligatorio."),
  sku: z
    .string()
    .trim()
    .min(2, "El SKU es obligatorio."),
  barcode: z.string().trim().optional(),
  category: z
    .string()
    .trim()
    .min(1, "La categoría es obligatoria."),
  price: z
    .number()
    .min(0, "El precio no puede ser negativo."),
  cost: z
    .number()
    .min(0, "El costo no puede ser negativo."),
  stock: z
    .number()
    .min(0, "El stock no puede ser negativo."),
  min_stock: z
    .number()
    .min(0, "El stock mínimo no puede ser negativo."),
  is_active: z.boolean(),
});

export type ProductSchemaValues = z.infer<typeof productSchema>;
