"use client";

import { useMemo, useState } from "react";

import {
  mockInventoryItems,
  mockInventoryMovements,
} from "@/modules/inventory/data/mock-inventory";
import type { InventoryMovementSchemaValues } from "@/modules/inventory/schemas/inventory.schema";
import type {
  InventoryItem,
  InventoryMovement,
  InventoryMovementType,
} from "@/modules/inventory/types/inventory";
import {
  calculateInventoryTotalCost,
  calculateNewStock,
  getInventoryStatus,
} from "@/modules/inventory/utils/inventory-calculations";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function isNegativeManualAdjustment(reason: string) {
  const normalizedReason = normalizeText(reason);

  return [
    "salida",
    "baja",
    "descuento",
    "resta",
    "negativo",
    "ajuste negativo",
  ].some((keyword) => normalizedReason.includes(keyword));
}

function resolveMovementStock(
  item: InventoryItem,
  movementType: InventoryMovementType,
  quantity: number,
  reason: string,
) {
  const previousStock = item.current_stock;

  if (movementType === "manual_adjustment") {
    const nextStock = isNegativeManualAdjustment(reason)
      ? Math.max(0, previousStock - quantity)
      : previousStock + quantity;

    return {
      previousStock,
      newStock: nextStock,
    };
  }

  return {
    previousStock,
    newStock: calculateNewStock(previousStock, movementType, quantity),
  };
}

export function useInventory() {
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(mockInventoryItems);
  const [movements, setMovements] =
    useState<InventoryMovement[]>(mockInventoryMovements);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isMovementFormOpen, setIsMovementFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredInventoryItems = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) {
      return inventoryItems;
    }

    return inventoryItems.filter((item) => {
      const searchableValues = [
        item.product_name,
        item.sku,
        item.category,
        item.status,
      ];

      return searchableValues.some((value) =>
        normalizeText(value).includes(normalizedSearch),
      );
    });
  }, [inventoryItems, search]);

  const filteredMovements = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) {
      return movements;
    }

    return movements.filter((movement) => {
      const searchableValues = [
        movement.product_name,
        movement.sku,
        movement.movement_type,
        movement.reason,
        movement.reference ?? "",
        movement.created_at,
      ];

      return searchableValues.some((value) =>
        normalizeText(value).includes(normalizedSearch),
      );
    });
  }, [movements, search]);

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function getItemByProductId(productId: number) {
    return inventoryItems.find((item) => item.product_id === productId);
  }

  function openMovementForm(item?: InventoryItem) {
    clearMessages();
    setSelectedItem(item ?? null);
    setIsMovementFormOpen(true);
  }

  function closeMovementForm() {
    clearMessages();
    setSelectedItem(null);
    setIsMovementFormOpen(false);
  }

  function registerMovement(values: InventoryMovementSchemaValues) {
    clearMessages();

    const quantity = Math.max(0, values.quantity);
    const reason = values.reason.trim();
    const reference = values.reference?.trim() || undefined;
    const existingItem = getItemByProductId(values.product_id);

    if (!existingItem) {
      setError("Producto no encontrado en inventario.");
      return;
    }

    if (quantity <= 0) {
      setError("La cantidad debe ser mayor a 0.");
      return;
    }

    if (reason.length < 3) {
      setError("Debes ingresar un motivo.");
      return;
    }

    if (
      (values.movement_type === "sale_exit" ||
        values.movement_type === "waste") &&
      quantity > existingItem.current_stock
    ) {
      setError("No hay stock suficiente para realizar este movimiento.");
      return;
    }

    if (
      values.movement_type === "manual_adjustment" &&
      isNegativeManualAdjustment(reason) &&
      quantity > existingItem.current_stock
    ) {
      setError("No hay stock suficiente para realizar este movimiento.");
      return;
    }

    const { previousStock, newStock } = resolveMovementStock(
      existingItem,
      values.movement_type,
      quantity,
      reason,
    );
    const timestamp = new Date().toISOString();

    const updatedItem: InventoryItem = {
      ...existingItem,
      current_stock: newStock,
      total_cost: calculateInventoryTotalCost(newStock, existingItem.unit_cost),
      status: getInventoryStatus(
        newStock,
        existingItem.min_stock,
        existingItem.is_active,
      ),
      updated_at: timestamp,
    };

    const newMovement: InventoryMovement = {
      id:
        movements.length > 0
          ? Math.max(...movements.map((movement) => movement.id)) + 1
          : 1,
      product_id: existingItem.product_id,
      product_name: existingItem.product_name,
      sku: existingItem.sku,
      movement_type: values.movement_type,
      quantity,
      previous_stock: previousStock,
      new_stock: newStock,
      reason,
      reference,
      created_at: timestamp,
    };

    setInventoryItems((currentItems) =>
      currentItems.map((item) =>
        item.product_id === existingItem.product_id ? updatedItem : item,
      ),
    );
    setMovements((currentMovements) => [newMovement, ...currentMovements]);
    setSelectedItem(updatedItem);
    setIsMovementFormOpen(false);
    setSuccessMessage("Movimiento registrado correctamente.");
  }

  return {
    inventoryItems,
    movements,
    search,
    setSearch,
    filteredInventoryItems,
    filteredMovements,
    selectedItem,
    setSelectedItem,
    isMovementFormOpen,
    openMovementForm,
    closeMovementForm,
    error,
    successMessage,
    clearMessages,
    getItemByProductId,
    registerMovement,
  };
}
