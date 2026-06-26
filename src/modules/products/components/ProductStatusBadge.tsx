"use client";

import type {
  Product,
  ProductStatus,
} from "@/modules/products/types/product";
import {
  getProductStatus,
  getProductStatusLabel,
} from "@/modules/products/utils/product-formatters";

type ProductStatusBadgeProps =
  | {
      product: Product;
      status?: never;
    }
  | {
      product?: never;
      status: ProductStatus;
    };

export function ProductStatusBadge({
  product,
  status,
}: ProductStatusBadgeProps) {
  const resolvedStatus = status ?? getProductStatus(product);
  const label = getProductStatusLabel(resolvedStatus);

  const badgeClassName =
    resolvedStatus === "active"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : resolvedStatus === "low_stock"
        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
        : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClassName}`}
    >
      {label}
    </span>
  );
}
