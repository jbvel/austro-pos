import { z } from "zod";

function optionalTrimmedString() {
  return z.string().trim().optional().transform((value) => value || undefined);
}

export const supplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre del proveedor es obligatorio."),
  rut: optionalTrimmedString(),
  business_name: optionalTrimmedString(),
  giro: optionalTrimmedString(),
  contact_name: optionalTrimmedString(),
  phone: optionalTrimmedString(),
  email: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || z.string().email().safeParse(value).success,
      "El correo no tiene un formato válido.",
    )
    .transform((value) => value || undefined),
  address: optionalTrimmedString(),
  commune: optionalTrimmedString(),
  city: optionalTrimmedString(),
  is_active: z.boolean(),
});

export type SupplierSchemaValues = z.infer<typeof supplierSchema>;
