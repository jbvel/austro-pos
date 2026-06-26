"use client";

import { Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/modules/pos/types/pos";
import { formatCLP } from "@/modules/pos/utils/pos-calculations";

type ProductCardProps = {
  product: Product;
  onAddProduct: (product: Product) => void;
};

export function ProductCard({ product, onAddProduct }: ProductCardProps) {
  const isUnavailable = !product.is_active || product.stock <= 0;
  const statusLabel = !product.is_active
    ? "Inactivo"
    : product.stock <= 0
      ? "Sin stock"
      : "Disponible";

  return (
    <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_88%,#0c1421)] dark:shadow-[0_16px_30px_-24px_rgba(0,0,0,0.7)]">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
              {product.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {product.category}
            </p>
          </div>

          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase ${
              !product.is_active
                ? "bg-slate-100 text-slate-500 dark:bg-white/8 dark:text-slate-400"
                : product.stock <= 0
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/[0.04]">
            <span>SKU</span>
            <span className="font-medium text-slate-950 dark:text-white">
              {product.sku}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/[0.04]">
            <span>Stock</span>
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                product.stock <= 0
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-slate-950 dark:text-white"
              }`}
            >
              <Package2 className="size-3.5 text-slate-400 dark:text-slate-500" />
              {product.stock}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Precio
            </p>
            <p className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {formatCLP(product.price)}
            </p>
          </div>

          <Button
            onClick={() => onAddProduct(product)}
            disabled={isUnavailable}
            className="h-11 min-w-24 rounded-2xl px-4"
          >
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
