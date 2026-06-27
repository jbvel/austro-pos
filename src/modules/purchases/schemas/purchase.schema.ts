import { z } from "zod";

export const purchaseItemSchema = z.object({
  product_id: z
    .number("Debes seleccionar un producto.")
    .gt(0, "Debes seleccionar un producto."),
  product_name: z.string().min(1, "Debes seleccionar un producto."),
  sku: z.string().min(1, "Debes seleccionar un producto."),
  quantity: z
    .number("La cantidad debe ser mayor a 0.")
    .gt(0, "La cantidad debe ser mayor a 0."),
  unit_cost: z
    .number("El costo unitario no puede ser negativo.")
    .min(0, "El costo unitario no puede ser negativo."),
  subtotal: z.number().min(0, "El subtotal no puede ser negativo."),
});

export const purchaseSchema = z.object({
  supplier_id: z
    .number("Debes seleccionar un proveedor.")
    .nullable()
    .refine((value) => value !== null, {
      message: "Debes seleccionar un proveedor.",
    }),
  document_type: z.enum(["invoice", "receipt", "dispatch_guide", "sale_note", "other"], {
    message: "Debes seleccionar un tipo de documento.",
  }),
  document_number: z.string().optional(),
  purchase_date: z.string().min(1, "La fecha de compra es obligatoria."),
  status: z.enum(["draft", "completed", "cancelled"]),
  notes: z.string().optional(),
  items: z
    .array(purchaseItemSchema)
    .min(1, "Debes agregar al menos un producto a la compra."),
});

export type PurchaseSchemaValues = z.infer<typeof purchaseSchema>;
