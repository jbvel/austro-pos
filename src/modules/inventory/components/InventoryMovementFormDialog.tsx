"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryMovementForm } from "@/modules/inventory/components/InventoryMovementForm";
import type { InventoryItem } from "@/modules/inventory/types/inventory";
import type { InventoryMovementSchemaValues } from "@/modules/inventory/schemas/inventory.schema";

type InventoryMovementFormDialogProps = {
  open: boolean;
  item?: InventoryItem | null;
  items: InventoryItem[];
  onClose: () => void;
  onSubmit: (values: InventoryMovementSchemaValues) => void;
};

export function InventoryMovementFormDialog({
  open,
  item,
  items,
  onClose,
  onSubmit,
}: InventoryMovementFormDialogProps) {
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
              Registrar movimiento
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Registra entradas, salidas, ajustes, mermas o devoluciones sobre el
              inventario en modo mock/local.
            </DialogDescription>
          </DialogHeader>

          <InventoryMovementForm
            item={item}
            items={items}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
