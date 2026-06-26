"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { CategoryFormDialog } from "@/modules/categories/components/CategoryFormDialog";
import { CategoryTable } from "@/modules/categories/components/CategoryTable";
import { useCategories } from "@/modules/categories/hooks/useCategories";

export function CategoriesPage() {
  const {
    categories,
    activeCategories,
    inactiveCategoriesCount,
    selectedCategory,
    isFormOpen,
    error,
    successMessage,
    clearMessages,
    openCreateForm,
    openEditForm,
    closeForm,
    createCategory,
    updateCategory,
    toggleCategoryStatus,
    deleteCategory,
  } = useCategories();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    showSuccessToast(successMessage);
    clearMessages();
  }, [clearMessages, successMessage]);

  useEffect(() => {
    if (!error) {
      return;
    }

    showErrorToast(error);
    clearMessages();
  }, [clearMessages, error]);

  return (
    <div className="space-y-6">
      <Header
        badge="Mantenedor"
        title="Categorías"
        description="Administra las categorías utilizadas por los productos."
        action={
          <Button type="button" className="h-11 rounded-2xl px-4" onClick={openCreateForm}>
            <Plus className="size-4" />
            Nueva categoría
          </Button>
        }
      />

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardContent className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Catálogo de categorías
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mantén ordenadas las categorías para reutilizarlas en productos.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Total categorías
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {categories.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Activas
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {activeCategories.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Inactivas
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {inactiveCategoriesCount}
              </p>
            </div>
          </div>

          <CategoryTable
            categories={categories}
            onEditCategory={openEditForm}
            onToggleCategoryStatus={toggleCategoryStatus}
            onDeleteCategory={deleteCategory}
          />
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={isFormOpen}
        category={selectedCategory}
        onClose={closeForm}
        onCreate={createCategory}
        onUpdate={updateCategory}
      />
    </div>
  );
}
