"use client";

import { useEffect, useMemo, useState } from "react";

import { mockCategories } from "@/modules/categories/data/mock-categories";
import type {
  Category,
  CategoryFormValues,
} from "@/modules/categories/types/category";

const CATEGORY_STORAGE_KEY = "austro_pos_categories";
const CATEGORY_STORAGE_EVENT = "austro-pos:categories-updated";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function readStoredCategories() {
  if (typeof window === "undefined") {
    return mockCategories;
  }

  const rawValue = window.localStorage.getItem(CATEGORY_STORAGE_KEY);

  if (!rawValue) {
    return mockCategories;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Category[];
    return Array.isArray(parsedValue) ? parsedValue : mockCategories;
  } catch {
    return mockCategories;
  }
}

function persistCategories(nextCategories: Category[]) {
  window.localStorage.setItem(
    CATEGORY_STORAGE_KEY,
    JSON.stringify(nextCategories),
  );
  window.dispatchEvent(new Event(CATEGORY_STORAGE_EVENT));
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() =>
    readStoredCategories(),
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    function syncCategories() {
      setCategories(readStoredCategories());
    }

    window.addEventListener("storage", syncCategories);
    window.addEventListener(CATEGORY_STORAGE_EVENT, syncCategories);

    return () => {
      window.removeEventListener("storage", syncCategories);
      window.removeEventListener(CATEGORY_STORAGE_EVENT, syncCategories);
    };
  }, []);

  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category.is_active)
        .sort((left, right) => left.name.localeCompare(right.name, "es")),
    [categories],
  );

  const inactiveCategoriesCount = categories.length - activeCategories.length;

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function openCreateForm() {
    clearMessages();
    setSelectedCategory(null);
    setIsFormOpen(true);
  }

  function openEditForm(category: Category) {
    clearMessages();
    setSelectedCategory(category);
    setIsFormOpen(true);
  }

  function closeForm() {
    clearMessages();
    setSelectedCategory(null);
    setIsFormOpen(false);
  }

  function hasDuplicatedName(name: string, currentCategoryId?: number) {
    const normalizedName = normalizeText(name);

    return categories.some(
      (category) =>
        category.id !== currentCategoryId &&
        normalizeText(category.name) === normalizedName,
    );
  }

  function createCategory(values: CategoryFormValues) {
    clearMessages();

    if (hasDuplicatedName(values.name)) {
      setError("Ya existe una categoría con ese nombre.");
      return;
    }

    const timestamp = new Date().toISOString();
    const newCategory: Category = {
      id:
        categories.length > 0
          ? Math.max(...categories.map((item) => item.id)) + 1
          : 1,
      name: values.name.trim(),
      description: values.description?.trim() || "",
      is_active: values.is_active,
      created_at: timestamp,
      updated_at: timestamp,
    };

    setCategories((currentCategories) => {
      const nextCategories = [...currentCategories, newCategory];
      persistCategories(nextCategories);
      return nextCategories;
    });
    setSelectedCategory(newCategory);
    setIsFormOpen(false);
    setSuccessMessage("Categoría creada correctamente.");
  }

  function updateCategory(categoryId: number, values: CategoryFormValues) {
    clearMessages();

    const existingCategory = categories.find(
      (category) => category.id === categoryId,
    );

    if (!existingCategory) {
      setError("Categoría no encontrada.");
      return;
    }

    if (hasDuplicatedName(values.name, categoryId)) {
      setError("Ya existe una categoría con ese nombre.");
      return;
    }

    const updatedCategory: Category = {
      ...existingCategory,
      name: values.name.trim(),
      description: values.description?.trim() || "",
      is_active: values.is_active,
      updated_at: new Date().toISOString(),
    };

    setCategories((currentCategories) => {
      const nextCategories = currentCategories.map((category) =>
        category.id === categoryId ? updatedCategory : category,
      );
      persistCategories(nextCategories);
      return nextCategories;
    });
    setSelectedCategory(updatedCategory);
    setIsFormOpen(false);
    setSuccessMessage("Categoría actualizada correctamente.");
  }

  function toggleCategoryStatus(categoryId: number) {
    clearMessages();

    const existingCategory = categories.find(
      (category) => category.id === categoryId,
    );

    if (!existingCategory) {
      setError("Categoría no encontrada.");
      return;
    }

    const updatedCategory: Category = {
      ...existingCategory,
      is_active: !existingCategory.is_active,
      updated_at: new Date().toISOString(),
    };

    setCategories((currentCategories) => {
      const nextCategories = currentCategories.map((category) =>
        category.id === categoryId ? updatedCategory : category,
      );
      persistCategories(nextCategories);
      return nextCategories;
    });
    setSelectedCategory((currentCategory) =>
      currentCategory?.id === categoryId ? updatedCategory : currentCategory,
    );
    setSuccessMessage(
      updatedCategory.is_active
        ? "Categoría activada correctamente."
        : "Categoría desactivada correctamente.",
    );
  }

  function deleteCategory(categoryId: number) {
    clearMessages();

    const existingCategory = categories.find(
      (category) => category.id === categoryId,
    );

    if (!existingCategory) {
      setError("Categoría no encontrada.");
      return;
    }

    setCategories((currentCategories) => {
      const nextCategories = currentCategories.filter(
        (category) => category.id !== categoryId,
      );
      persistCategories(nextCategories);
      return nextCategories;
    });
    setSelectedCategory((currentCategory) =>
      currentCategory?.id === categoryId ? null : currentCategory,
    );
    if (selectedCategory?.id === categoryId) {
      setIsFormOpen(false);
    }
    setSuccessMessage("Categoría eliminada correctamente.");
  }

  return {
    categories,
    activeCategories,
    inactiveCategoriesCount,
    selectedCategory,
    setSelectedCategory,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
    error,
    successMessage,
    clearMessages,
    createCategory,
    updateCategory,
    toggleCategoryStatus,
    deleteCategory,
  };
}
