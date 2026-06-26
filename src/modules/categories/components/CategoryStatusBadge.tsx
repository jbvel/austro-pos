"use client";

import type {
  Category,
  CategoryStatus,
} from "@/modules/categories/types/category";

type CategoryStatusBadgeProps =
  | {
      category: Category;
      status?: never;
    }
  | {
      category?: never;
      status: CategoryStatus;
    };

function getCategoryStatusLabel(status: CategoryStatus) {
  return status === "active" ? "Activa" : "Inactiva";
}

export function CategoryStatusBadge({
  category,
  status,
}: CategoryStatusBadgeProps) {
  const resolvedStatus = status ?? (category.is_active ? "active" : "inactive");
  const label = getCategoryStatusLabel(resolvedStatus);

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
