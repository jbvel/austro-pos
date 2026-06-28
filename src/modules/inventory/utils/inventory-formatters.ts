import type {
  InventoryMovementType,
  InventoryStatus,
} from "@/modules/inventory/types/inventory";

const inventoryClpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatInventoryCLP(value: number): string {
  return inventoryClpFormatter.format(value);
}

export function getInventoryStatusLabel(status: InventoryStatus): string {
  const labels: Record<InventoryStatus, string> = {
    normal: "Normal",
    low_stock: "Bajo stock",
    out_of_stock: "Sin stock",
    inactive: "Inactivo",
  };

  return labels[status];
}

export function getInventoryMovementTypeLabel(
  type: InventoryMovementType,
): string {
  const labels: Record<InventoryMovementType, string> = {
    purchase_entry: "Entrada por compra",
    sale_exit: "Salida por venta",
    manual_adjustment: "Ajuste manual",
    waste: "Merma",
    return_entry: "Devolución",
    other: "Otro",
  };

  return labels[type];
}

export function formatInventoryDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}
