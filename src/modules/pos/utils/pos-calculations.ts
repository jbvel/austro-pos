import type { CartItem } from "@/modules/pos/types/pos";

export function calculateCartSubtotal(items: CartItem[]): number {
  if (items.length === 0) {
    return 0;
  }

  return items.reduce((subtotal, item) => {
    return subtotal + item.product.price * item.quantity;
  }, 0);
}

export function calculateSaleTotal(
  subtotal: number,
  discount: number = 0,
): number {
  return Math.max(subtotal - discount, 0);
}

export function calculateChange(total: number, cashReceived: number): number {
  if (cashReceived <= total) {
    return 0;
  }

  return cashReceived - total;
}

export function parseCLPInput(value: string): number {
  const numericValue = value.replace(/[^\d]/g, "");

  if (!numericValue) {
    return 0;
  }

  return Number(numericValue);
}

export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
