"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SupplierForm } from "@/modules/suppliers/components/SupplierForm";
import type {
  Supplier,
  SupplierFormValues,
} from "@/modules/suppliers/types/supplier";

type SupplierFormDialogProps = {
  open: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onCreate: (values: SupplierFormValues) => void;
  onUpdate: (supplierId: number, values: SupplierFormValues) => void;
};

export function SupplierFormDialog({
  open,
  supplier,
  onClose,
  onCreate,
  onUpdate,
}: SupplierFormDialogProps) {
  const isEditing = Boolean(supplier);

  function handleSubmit(values: SupplierFormValues) {
    if (supplier) {
      onUpdate(supplier.id, values);
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
      <DialogContent className="max-h-[85vh] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-[28px] border border-slate-200/80 bg-white p-0 shadow-xl shadow-slate-200/50 sm:max-w-4xl dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <div className="space-y-5 p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {isEditing ? "Editar proveedor" : "Nuevo proveedor"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing
                ? "Actualiza los datos comerciales del proveedor seleccionado."
                : "Completa la información comercial básica para agregar un proveedor."}
            </DialogDescription>
          </DialogHeader>

          <SupplierForm
            supplier={supplier}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
