import type { PurchaseItem } from "@/modules/purchases/types/purchase";

export function calculatePurchaseItemSubtotal(
  quantity: number,
  unitCost: number,
): number {
  const safeQuantity = Math.max(0, quantity);
  const safeUnitCost = Math.max(0, unitCost);

  return safeQuantity * safeUnitCost;
}

export function calculatePurchaseSubtotal(items: PurchaseItem[]): number {
  if (items.length === 0) {
    return 0;
  }

  return items.reduce((total, item) => total + item.subtotal, 0);
}

export function calculatePurchaseTotal(subtotal: number): number {
  return Math.max(0, subtotal);
}
