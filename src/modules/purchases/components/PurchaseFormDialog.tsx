"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PurchaseForm } from "@/modules/purchases/components/PurchaseForm";
import type {
  Purchase,
  PurchaseFormValues,
} from "@/modules/purchases/types/purchase";

type PurchaseFormDialogProps = {
  open: boolean;
  purchase: Purchase | null;
  onClose: () => void;
  onCreate: (values: PurchaseFormValues) => void;
  onUpdate: (purchaseId: number, values: PurchaseFormValues) => void;
};

export function PurchaseFormDialog({
  open,
  purchase,
  onClose,
  onCreate,
  onUpdate,
}: PurchaseFormDialogProps) {
  const isEditing = Boolean(purchase);

  function handleSubmit(values: PurchaseFormValues) {
    if (purchase) {
      onUpdate(purchase.id, values);
      return;
    }

    onCreate(values);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-[28px] border border-slate-200/80 bg-white p-0 shadow-xl shadow-slate-200/50 sm:max-w-3xl dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <div className="space-y-5 p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {isEditing ? "Editar compra" : "Nueva compra"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing
                ? "Actualiza la cabecera documental de la compra seleccionada."
                : "Completa los datos base de la compra antes de agregar productos."}
            </DialogDescription>
          </DialogHeader>

          <PurchaseForm
            purchase={purchase}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
