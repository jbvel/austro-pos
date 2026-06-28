"use client";

import type { InventoryStatus } from "@/modules/inventory/types/inventory";
import { getInventoryStatusLabel } from "@/modules/inventory/utils/inventory-formatters";

type InventoryStatusBadgeProps = {
  status: InventoryStatus;
};

export function InventoryStatusBadge({
  status,
}: InventoryStatusBadgeProps) {
  const badgeClassName =
    status === "normal"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : status === "low_stock"
        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
        : status === "out_of_stock"
          ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
          : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClassName}`}
    >
      {getInventoryStatusLabel(status)}
    </span>
  );
}
