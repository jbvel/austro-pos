"use client";

import { useMemo, useState } from "react";

import { mockPurchases } from "@/modules/purchases/data/mock-purchases";
import { mockSuppliers } from "@/modules/suppliers/data/mock-suppliers";
import type {
  Purchase,
  PurchaseFormValues,
  PurchaseItem,
} from "@/modules/purchases/types/purchase";
import {
  calculatePurchaseItemSubtotal,
  calculatePurchaseSubtotal,
  calculatePurchaseTotal,
} from "@/modules/purchases/utils/purchase-calculations";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function rebuildPurchaseItems(items: PurchaseItem[]) {
  return items.map((item, index) => ({
    ...item,
    id: item.id > 0 ? item.id : index + 1,
    subtotal: calculatePurchaseItemSubtotal(item.quantity, item.unit_cost),
  }));
}

function resolveSupplierName(
  currentPurchase: Purchase | undefined,
  values: PurchaseFormValues,
) {
  const supplier = mockSuppliers.find(
    (supplierItem) => supplierItem.id === values.supplier_id,
  );

  if (supplier) {
    return supplier.name;
  }

  if (currentPurchase && currentPurchase.supplier_id === values.supplier_id) {
    return currentPurchase.supplier_name;
  }

  return currentPurchase?.supplier_name ?? "Proveedor sin nombre";
}

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [search, setSearch] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredPurchases = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) {
      return purchases;
    }

    return purchases.filter((purchase) => {
      const searchableValues = [
        purchase.supplier_name,
        purchase.document_number ?? "",
        purchase.document_type,
        purchase.status,
        purchase.purchase_date,
        ...purchase.items.flatMap((item) => [item.product_name, item.sku]),
      ];

      return searchableValues.some((value) =>
        normalizeText(value).includes(normalizedSearch),
      );
    });
  }, [purchases, search]);

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function openCreateForm() {
    clearMessages();
    setSelectedPurchase(null);
    setIsFormOpen(true);
  }

  function openEditForm(purchase: Purchase) {
    clearMessages();
    setSelectedPurchase(purchase);
    setIsFormOpen(true);
  }

  function closeForm() {
    clearMessages();
    setSelectedPurchase(null);
    setIsFormOpen(false);
  }

  function createPurchase(values: PurchaseFormValues) {
    clearMessages();

    if (values.supplier_id === null) {
      setError("Debes seleccionar un proveedor.");
      return;
    }

    if (!values.purchase_date.trim()) {
      setError("La fecha de compra es obligatoria.");
      return;
    }

    if (values.items.length === 0) {
      setError("Debes agregar al menos un producto a la compra.");
      return;
    }

    const items = rebuildPurchaseItems(values.items);
    const subtotal = calculatePurchaseSubtotal(items);
    const total = calculatePurchaseTotal(subtotal);
    const timestamp = new Date().toISOString();

    const newPurchase: Purchase = {
      id: purchases.length > 0 ? Math.max(...purchases.map((item) => item.id)) + 1 : 1,
      supplier_id: values.supplier_id,
      supplier_name: resolveSupplierName(undefined, values),
      document_type: values.document_type,
      document_number: values.document_number?.trim() || undefined,
      purchase_date: values.purchase_date.trim(),
      status: values.status,
      notes: values.notes?.trim() || undefined,
      items,
      subtotal,
      total,
      created_at: timestamp,
      updated_at: timestamp,
    };

    setPurchases((currentPurchases) => [...currentPurchases, newPurchase]);
    setSelectedPurchase(newPurchase);
    setIsFormOpen(false);
    setSuccessMessage("Compra creada correctamente.");
  }

  function updatePurchase(purchaseId: number, values: PurchaseFormValues) {
    clearMessages();

    const existingPurchase = purchases.find((purchase) => purchase.id === purchaseId);

    if (!existingPurchase) {
      setError("Compra no encontrada.");
      return;
    }

    if (existingPurchase.status === "cancelled") {
      setError("No puedes editar una compra anulada.");
      return;
    }

    if (values.supplier_id === null) {
      setError("Debes seleccionar un proveedor.");
      return;
    }

    if (!values.purchase_date.trim()) {
      setError("La fecha de compra es obligatoria.");
      return;
    }

    if (values.items.length === 0) {
      setError("Debes agregar al menos un producto a la compra.");
      return;
    }

    const items = rebuildPurchaseItems(values.items);
    const subtotal = calculatePurchaseSubtotal(items);
    const total = calculatePurchaseTotal(subtotal);

    const updatedPurchase: Purchase = {
      ...existingPurchase,
      supplier_id: values.supplier_id,
      supplier_name: resolveSupplierName(existingPurchase, values),
      document_type: values.document_type,
      document_number: values.document_number?.trim() || undefined,
      purchase_date: values.purchase_date.trim(),
      status: values.status,
      notes: values.notes?.trim() || undefined,
      items,
      subtotal,
      total,
      updated_at: new Date().toISOString(),
    };

    setPurchases((currentPurchases) =>
      currentPurchases.map((purchase) =>
        purchase.id === purchaseId ? updatedPurchase : purchase,
      ),
    );
    setSelectedPurchase(updatedPurchase);
    setIsFormOpen(false);
    setSuccessMessage("Compra actualizada correctamente.");
  }

  function cancelPurchase(purchaseId: number) {
    clearMessages();

    const existingPurchase = purchases.find((purchase) => purchase.id === purchaseId);

    if (!existingPurchase) {
      setError("Compra no encontrada.");
      return;
    }

    const updatedPurchase: Purchase = {
      ...existingPurchase,
      status: "cancelled",
      updated_at: new Date().toISOString(),
    };

    setPurchases((currentPurchases) =>
      currentPurchases.map((purchase) =>
        purchase.id === purchaseId ? updatedPurchase : purchase,
      ),
    );
    setSelectedPurchase((currentPurchase) =>
      currentPurchase?.id === purchaseId ? updatedPurchase : currentPurchase,
    );
    setSuccessMessage("Compra anulada correctamente.");
  }

  function deletePurchase(purchaseId: number) {
    clearMessages();

    const existingPurchase = purchases.find((purchase) => purchase.id === purchaseId);

    if (!existingPurchase) {
      setError("Compra no encontrada.");
      return;
    }

    if (existingPurchase.status !== "draft") {
      setError("Solo puedes eliminar compras en borrador.");
      return;
    }

    setPurchases((currentPurchases) =>
      currentPurchases.filter((purchase) => purchase.id !== purchaseId),
    );
    setSelectedPurchase((currentPurchase) =>
      currentPurchase?.id === purchaseId ? null : currentPurchase,
    );
    if (selectedPurchase?.id === purchaseId) {
      setIsFormOpen(false);
    }
    setSuccessMessage("Compra eliminada correctamente.");
  }

  return {
    purchases,
    search,
    setSearch,
    filteredPurchases,
    selectedPurchase,
    setSelectedPurchase,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
    error,
    successMessage,
    clearMessages,
    createPurchase,
    updatePurchase,
    cancelPurchase,
    deletePurchase,
  };
}
