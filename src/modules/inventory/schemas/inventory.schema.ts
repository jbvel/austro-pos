import { z } from "zod";

export const inventoryMovementSchema = z.object({
  product_id: z
    .number("Debes seleccionar un producto.")
    .gt(0, "Debes seleccionar un producto."),
  product_name: z.string().min(1, "Debes seleccionar un producto."),
  sku: z.string().min(1, "Debes seleccionar un producto."),
  movement_type: z.enum(
    [
      "purchase_entry",
      "sale_exit",
      "manual_adjustment",
      "waste",
      "return_entry",
      "other",
    ],
    {
      message: "Debes seleccionar un tipo de movimiento.",
    },
  ),
  quantity: z
    .number("La cantidad debe ser mayor a 0.")
    .gt(0, "La cantidad debe ser mayor a 0."),
  reason: z.string().min(3, "Debes ingresar un motivo."),
  reference: z.string().optional(),
});

export type InventoryMovementSchemaValues = z.infer<
  typeof inventoryMovementSchema
>;
