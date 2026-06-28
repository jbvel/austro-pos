import type {
  InventoryMovementType,
  InventoryStatus,
} from "@/modules/inventory/types/inventory";

export function calculateInventoryTotalCost(
  currentStock: number,
  unitCost: number,
): number {
  const safeCurrentStock = Math.max(0, currentStock);
  const safeUnitCost = Math.max(0, unitCost);

  return safeCurrentStock * safeUnitCost;
}

export function calculateNewStock(
  previousStock: number,
  movementType: InventoryMovementType,
  quantity: number,
): number {
  const safePreviousStock = Math.max(0, previousStock);
  const safeQuantity = Math.max(0, quantity);

  if (movementType === "purchase_entry" || movementType === "return_entry") {
    return safePreviousStock + safeQuantity;
  }

  if (movementType === "sale_exit" || movementType === "waste") {
    return Math.max(0, safePreviousStock - safeQuantity);
  }

  if (movementType === "manual_adjustment" || movementType === "other") {
    return safePreviousStock;
  }

  return safePreviousStock;
}

export function getInventoryStatus(
  currentStock: number,
  minStock: number,
  isActive: boolean,
): InventoryStatus {
  if (!isActive) {
    return "inactive";
  }

  if (currentStock <= 0) {
    return "out_of_stock";
  }

  if (currentStock <= minStock) {
    return "low_stock";
  }

  return "normal";
}
