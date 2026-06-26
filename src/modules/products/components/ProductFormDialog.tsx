"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/modules/products/components/ProductForm";
import type {
  Product,
  ProductFormValues,
} from "@/modules/products/types/product";

type ProductFormDialogProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onCreate: (values: ProductFormValues) => void;
  onUpdate: (productId: number, values: ProductFormValues) => void;
};

export function ProductFormDialog({
  open,
  product,
  onClose,
  onCreate,
  onUpdate,
}: ProductFormDialogProps) {
  const isEditing = Boolean(product);

  function handleSubmit(values: ProductFormValues) {
    if (product) {
      onUpdate(product.id, values);
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
              {isEditing ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing
                ? "Actualiza la información comercial y operativa del producto."
                : "Completa los datos básicos para agregar un producto al catálogo."}
            </DialogDescription>
          </DialogHeader>

          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
