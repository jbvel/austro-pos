"use client";

import { useMemo, useState } from "react";

import { mockSuppliers } from "@/modules/suppliers/data/mock-suppliers";
import type {
  Supplier,
  SupplierFormValues,
} from "@/modules/suppliers/types/supplier";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function normalizeOptionalValue(value?: string) {
  return value?.trim() || undefined;
}

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) {
      return suppliers;
    }

    return suppliers.filter((supplier) => {
      const searchableValues = [
        supplier.name,
        supplier.rut ?? "",
        supplier.business_name ?? "",
        supplier.giro ?? "",
        supplier.contact_name ?? "",
        supplier.phone ?? "",
        supplier.email ?? "",
        supplier.commune ?? "",
        supplier.city ?? "",
      ];

      return searchableValues.some((value) =>
        normalizeText(value).includes(normalizedSearch),
      );
    });
  }, [search, suppliers]);

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function openCreateForm() {
    clearMessages();
    setSelectedSupplier(null);
    setIsFormOpen(true);
  }

  function openEditForm(supplier: Supplier) {
    clearMessages();
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  }

  function closeForm() {
    clearMessages();
    setSelectedSupplier(null);
    setIsFormOpen(false);
  }

  function hasDuplicatedRut(rut?: string, currentSupplierId?: number) {
    const normalizedRut = normalizeOptionalValue(rut);

    if (!normalizedRut) {
      return false;
    }

    return suppliers.some(
      (supplier) =>
        supplier.id !== currentSupplierId &&
        normalizeOptionalValue(supplier.rut) === normalizedRut,
    );
  }

  function hasDuplicatedEmail(email?: string, currentSupplierId?: number) {
    const normalizedEmail = normalizeOptionalValue(email)?.toLowerCase();

    if (!normalizedEmail) {
      return false;
    }

    return suppliers.some(
      (supplier) =>
        supplier.id !== currentSupplierId &&
        normalizeOptionalValue(supplier.email)?.toLowerCase() === normalizedEmail,
    );
  }

  function createSupplier(values: SupplierFormValues) {
    clearMessages();

    if (hasDuplicatedRut(values.rut)) {
      setError("Ya existe un proveedor con ese RUT.");
      return;
    }

    if (hasDuplicatedEmail(values.email)) {
      setError("Ya existe un proveedor con ese correo.");
      return;
    }

    const timestamp = new Date().toISOString();
    const newSupplier: Supplier = {
      id: suppliers.length > 0 ? Math.max(...suppliers.map((item) => item.id)) + 1 : 1,
      name: values.name.trim(),
      rut: normalizeOptionalValue(values.rut),
      business_name: normalizeOptionalValue(values.business_name),
      giro: normalizeOptionalValue(values.giro),
      contact_name: normalizeOptionalValue(values.contact_name),
      phone: normalizeOptionalValue(values.phone),
      email: normalizeOptionalValue(values.email),
      address: normalizeOptionalValue(values.address),
      commune: normalizeOptionalValue(values.commune),
      city: normalizeOptionalValue(values.city),
      is_active: values.is_active,
      created_at: timestamp,
      updated_at: timestamp,
    };

    setSuppliers((currentSuppliers) => [...currentSuppliers, newSupplier]);
    setSelectedSupplier(newSupplier);
    setIsFormOpen(false);
    setSuccessMessage("Proveedor creado correctamente.");
  }

  function updateSupplier(supplierId: number, values: SupplierFormValues) {
    clearMessages();

    const existingSupplier = suppliers.find((supplier) => supplier.id === supplierId);

    if (!existingSupplier) {
      setError("Proveedor no encontrado.");
      return;
    }

    if (hasDuplicatedRut(values.rut, supplierId)) {
      setError("Ya existe un proveedor con ese RUT.");
      return;
    }

    if (hasDuplicatedEmail(values.email, supplierId)) {
      setError("Ya existe un proveedor con ese correo.");
      return;
    }

    const updatedSupplier: Supplier = {
      ...existingSupplier,
      name: values.name.trim(),
      rut: normalizeOptionalValue(values.rut),
      business_name: normalizeOptionalValue(values.business_name),
      giro: normalizeOptionalValue(values.giro),
      contact_name: normalizeOptionalValue(values.contact_name),
      phone: normalizeOptionalValue(values.phone),
      email: normalizeOptionalValue(values.email),
      address: normalizeOptionalValue(values.address),
      commune: normalizeOptionalValue(values.commune),
      city: normalizeOptionalValue(values.city),
      is_active: values.is_active,
      updated_at: new Date().toISOString(),
    };

    setSuppliers((currentSuppliers) =>
      currentSuppliers.map((supplier) =>
        supplier.id === supplierId ? updatedSupplier : supplier,
      ),
    );
    setSelectedSupplier(updatedSupplier);
    setIsFormOpen(false);
    setSuccessMessage("Proveedor actualizado correctamente.");
  }

  function toggleSupplierStatus(supplierId: number) {
    clearMessages();

    const existingSupplier = suppliers.find((supplier) => supplier.id === supplierId);

    if (!existingSupplier) {
      setError("Proveedor no encontrado.");
      return;
    }

    const updatedSupplier: Supplier = {
      ...existingSupplier,
      is_active: !existingSupplier.is_active,
      updated_at: new Date().toISOString(),
    };

    setSuppliers((currentSuppliers) =>
      currentSuppliers.map((supplier) =>
        supplier.id === supplierId ? updatedSupplier : supplier,
      ),
    );
    setSelectedSupplier((currentSupplier) =>
      currentSupplier?.id === supplierId ? updatedSupplier : currentSupplier,
    );
    setSuccessMessage(
      updatedSupplier.is_active
        ? "Proveedor activado correctamente."
        : "Proveedor desactivado correctamente.",
    );
  }

  function deleteSupplier(supplierId: number) {
    clearMessages();

    const existingSupplier = suppliers.find((supplier) => supplier.id === supplierId);

    if (!existingSupplier) {
      setError("Proveedor no encontrado.");
      return;
    }

    setSuppliers((currentSuppliers) =>
      currentSuppliers.filter((supplier) => supplier.id !== supplierId),
    );
    setSelectedSupplier((currentSupplier) =>
      currentSupplier?.id === supplierId ? null : currentSupplier,
    );
    if (selectedSupplier?.id === supplierId) {
      setIsFormOpen(false);
    }
    setSuccessMessage("Proveedor eliminado correctamente.");
  }

  return {
    suppliers,
    search,
    setSearch,
    filteredSuppliers,
    selectedSupplier,
    setSelectedSupplier,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
    error,
    successMessage,
    clearMessages,
    createSupplier,
    updateSupplier,
    toggleSupplierStatus,
    deleteSupplier,
  };
}
