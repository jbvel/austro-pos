"use client";

import type { InventoryMovementType } from "@/modules/inventory/types/inventory";
import { getInventoryMovementTypeLabel } from "@/modules/inventory/utils/inventory-formatters";

type InventoryMovementTypeBadgeProps = {
  type: InventoryMovementType;
};

export function InventoryMovementTypeBadge({
  type,
}: InventoryMovementTypeBadgeProps) {
  const badgeClassName =
    type === "purchase_entry" || type === "return_entry"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : type === "waste"
        ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
        : type === "sale_exit"
          ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
          : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClassName}`}
    >
      {getInventoryMovementTypeLabel(type)}
    </span>
  );
}
