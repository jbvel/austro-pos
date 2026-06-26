"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "@/modules/categories/components/CategoryForm";
import type {
  Category,
  CategoryFormValues,
} from "@/modules/categories/types/category";

type CategoryFormDialogProps = {
  open: boolean;
  category: Category | null;
  onClose: () => void;
  onCreate: (values: CategoryFormValues) => void;
  onUpdate: (categoryId: number, values: CategoryFormValues) => void;
};

export function CategoryFormDialog({
  open,
  category,
  onClose,
  onCreate,
  onUpdate,
}: CategoryFormDialogProps) {
  const isEditing = Boolean(category);

  function handleSubmit(values: CategoryFormValues) {
    if (category) {
      onUpdate(category.id, values);
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
      <DialogContent className="max-h-[85vh] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-[28px] border border-slate-200/80 bg-white p-0 shadow-xl shadow-slate-200/50 sm:max-w-2xl dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <div className="space-y-5 p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {isEditing ? "Editar categoría" : "Nueva categoría"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing
                ? "Actualiza la información de la categoría seleccionada."
                : "Completa los datos básicos para agregar una categoría al sistema."}
            </DialogDescription>
          </DialogHeader>

          <CategoryForm
            category={category}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
