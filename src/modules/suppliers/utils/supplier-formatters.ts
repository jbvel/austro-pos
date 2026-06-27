import type {
  Supplier,
  SupplierStatus,
} from "@/modules/suppliers/types/supplier";

export function getSupplierStatus(supplier: Supplier): SupplierStatus {
  return supplier.is_active ? "active" : "inactive";
}

export function getSupplierStatusLabel(status: SupplierStatus): string {
  return status === "active" ? "Activo" : "Inactivo";
}

export function formatSupplierRut(rut?: string): string {
  return rut?.trim() ? rut : "Sin RUT";
}

export function formatSupplierContact(supplier: Supplier): string {
  if (supplier.contact_name?.trim()) {
    return supplier.contact_name;
  }

  if (supplier.email?.trim()) {
    return supplier.email;
  }

  if (supplier.phone?.trim()) {
    return supplier.phone;
  }

  return "Sin contacto";
}
