"use client";

import type {
  Supplier,
  SupplierStatus,
} from "@/modules/suppliers/types/supplier";
import {
  getSupplierStatus,
  getSupplierStatusLabel,
} from "@/modules/suppliers/utils/supplier-formatters";

type SupplierStatusBadgeProps =
  | {
      supplier: Supplier;
      status?: never;
    }
  | {
      supplier?: never;
      status: SupplierStatus;
    };

export function SupplierStatusBadge({
  supplier,
  status,
}: SupplierStatusBadgeProps) {
  const resolvedStatus = status ?? getSupplierStatus(supplier);
  const label = getSupplierStatusLabel(resolvedStatus);

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        resolvedStatus === "active"
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300"
      }`}
    >
      {label}
    </span>
  );
}
