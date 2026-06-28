"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { InventoryMovementFormDialog } from "@/modules/inventory/components/InventoryMovementFormDialog";
import { InventoryMovementsTable } from "@/modules/inventory/components/InventoryMovementsTable";
import { InventoryTable } from "@/modules/inventory/components/InventoryTable";
import { useInventory } from "@/modules/inventory/hooks/useInventory";
import { formatInventoryCLP } from "@/modules/inventory/utils/inventory-formatters";

export function InventoryPage() {
  const {
    inventoryItems,
    filteredInventoryItems,
    filteredMovements,
    selectedItem,
    isMovementFormOpen,
    error,
    successMessage,
    clearMessages,
    openMovementForm,
    closeMovementForm,
    registerMovement,
  } = useInventory();

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

  const totalInventoryValue = inventoryItems.reduce(
    (total, item) => total + item.total_cost,
    0,
  );

  return (
    <div className="space-y-6">
      <Header
        badge="Operación"
        title="Inventario"
        description="Control de stock, movimientos, ajustes y mermas."
        action={
          <Button
            type="button"
            className="h-11 rounded-2xl px-4"
            onClick={() => openMovementForm()}
          >
            <Plus className="size-4" />
            Registrar movimiento
          </Button>
        }
      />

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardContent className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Resumen de stock
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Revisa el estado actual del inventario y su valorización referencial.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Total productos
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {inventoryItems.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Stock normal
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {inventoryItems.filter((item) => item.status === "normal").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Bajo stock
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {inventoryItems.filter((item) => item.status === "low_stock").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Sin stock
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {inventoryItems.filter((item) => item.status === "out_of_stock").length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Valor total inventario
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                {formatInventoryCLP(totalInventoryValue)}
              </p>
            </div>
          </div>

          <InventoryTable items={filteredInventoryItems} />
        </CardContent>
      </Card>

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardContent className="space-y-5 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Historial de movimientos
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Consulta entradas, salidas, ajustes y mermas registradas en modo mock.
            </p>
          </div>

          <InventoryMovementsTable movements={filteredMovements} />
        </CardContent>
      </Card>

      <InventoryMovementFormDialog
        open={isMovementFormOpen}
        item={selectedItem}
        items={inventoryItems}
        onClose={closeMovementForm}
        onSubmit={registerMovement}
      />
    </div>
  );
}
