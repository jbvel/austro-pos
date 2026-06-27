import type {
  PurchaseDocumentType,
  PurchaseStatus,
} from "@/modules/purchases/types/purchase";

const purchaseClpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPurchaseCLP(value: number): string {
  return purchaseClpFormatter.format(value);
}

export function getPurchaseDocumentTypeLabel(
  type: PurchaseDocumentType,
): string {
  const labels: Record<PurchaseDocumentType, string> = {
    invoice: "Factura",
    receipt: "Boleta",
    dispatch_guide: "Guía de despacho",
    sale_note: "Nota de venta",
    other: "Otro",
  };

  return labels[type];
}

export function getPurchaseStatusLabel(status: PurchaseStatus): string {
  const labels: Record<PurchaseStatus, string> = {
    draft: "Borrador",
    completed: "Completada",
    cancelled: "Anulada",
  };

  return labels[status];
}

export function formatPurchaseDate(date: string): string {
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
