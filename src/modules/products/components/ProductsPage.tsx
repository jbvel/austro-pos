"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { ProductFormDialog } from "@/modules/products/components/ProductFormDialog";
import { ProductTable } from "@/modules/products/components/ProductTable";
import { useProducts } from "@/modules/products/hooks/useProducts";

export function ProductsPage() {
  const {
    products,
    selectedProduct,
    isFormOpen,
    error,
    successMessage,
    clearMessages,
    openCreateForm,
    openEditForm,
    closeForm,
    createProduct,
    updateProduct,
    toggleProductStatus,
    deleteProduct,
  } = useProducts();

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
        badge="Catálogo"
        title="Productos"
        description="Gestión de productos, precios, códigos y categorías."
        action={
          <Button type="button" className="h-11 rounded-2xl px-4" onClick={openCreateForm}>
            <Plus className="size-4" />
            Nuevo producto
          </Button>
        }
      />

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardContent className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Catálogo de productos
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Administra el catálogo, precios, stock y estado comercial.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Productos
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {products.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Activos
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {products.filter((product) => product.is_active).length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Bajo stock
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {
                  products.filter(
                    (product) => product.is_active && product.stock <= product.min_stock,
                  ).length
                }
              </p>
            </div>
          </div>

          <ProductTable
            products={products}
            onEditProduct={openEditForm}
            onToggleProductStatus={toggleProductStatus}
            onDeleteProduct={deleteProduct}
          />
        </CardContent>
      </Card>

      <ProductFormDialog
        open={isFormOpen}
        product={selectedProduct}
        onClose={closeForm}
        onCreate={createProduct}
        onUpdate={updateProduct}
      />
    </div>
  );
}
