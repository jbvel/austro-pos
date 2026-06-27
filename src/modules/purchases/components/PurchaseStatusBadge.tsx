"use client";

import type { PurchaseStatus } from "@/modules/purchases/types/purchase";
import { getPurchaseStatusLabel } from "@/modules/purchases/utils/purchase-formatters";

type PurchaseStatusBadgeProps = {
  status: PurchaseStatus;
};

export function PurchaseStatusBadge({ status }: PurchaseStatusBadgeProps) {
  const badgeClassName =
    status === "completed"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
      : status === "cancelled"
        ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
        : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClassName}`}
    >
      {getPurchaseStatusLabel(status)}
    </span>
  );
}
