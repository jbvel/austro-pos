import { z } from "zod";

function optionalTrimmedString() {
  return z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmedValue = value.trim();
    return trimmedValue === "" ? undefined : trimmedValue;
  }, z.string().optional());
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
  email: z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmedValue = value.trim();
    return trimmedValue === "" ? undefined : trimmedValue;
  }, z.string().email("El correo no tiene un formato válido.").optional()),
  address: optionalTrimmedString(),
  commune: optionalTrimmedString(),
  city: optionalTrimmedString(),
  is_active: z.boolean(),
});

export type SupplierSchemaValues = z.infer<typeof supplierSchema>;
