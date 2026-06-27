"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { PurchaseFormDialog } from "@/modules/purchases/components/PurchaseFormDialog";
import { PurchaseTable } from "@/modules/purchases/components/PurchaseTable";
import { usePurchases } from "@/modules/purchases/hooks/usePurchases";
import { formatPurchaseCLP } from "@/modules/purchases/utils/purchase-formatters";

export function PurchasesPage() {
  const {
    purchases,
    selectedPurchase,
    isFormOpen,
    error,
    successMessage,
    clearMessages,
    openCreateForm,
    openEditForm,
    closeForm,
    createPurchase,
    updatePurchase,
    cancelPurchase,
    deletePurchase,
  } = usePurchases();

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

  const totalPurchased = purchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <div className="space-y-6">
      <Header
        badge="Operación"
        title="Compras"
        description="Registra compras a proveedores y prepara el abastecimiento de stock."
        action={
          <Button
            type="button"
            className="h-11 rounded-2xl px-4"
            onClick={openCreateForm}
          >
            <Plus className="size-4" />
            Nueva compra
          </Button>
        }
      />

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardContent className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Registro de compras
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Controla documentos, estados y montos de compras a proveedores.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Total compras
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {purchases.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Completadas
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {purchases.filter((purchase) => purchase.status === "completed").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Borradores
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {purchases.filter((purchase) => purchase.status === "draft").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Anuladas
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {purchases.filter((purchase) => purchase.status === "cancelled").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Total comprado
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {formatPurchaseCLP(totalPurchased)}
              </p>
            </div>
          </div>

          <PurchaseTable
            purchases={purchases}
            onEditPurchase={openEditForm}
            onCancelPurchase={cancelPurchase}
            onDeletePurchase={deletePurchase}
          />
        </CardContent>
      </Card>

      <PurchaseFormDialog
        open={isFormOpen}
        purchase={selectedPurchase}
        onClose={closeForm}
        onCreate={createPurchase}
        onUpdate={updatePurchase}
      />
    </div>
  );
}
