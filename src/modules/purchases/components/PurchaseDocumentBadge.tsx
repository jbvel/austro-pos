"use client";

import type { PurchaseDocumentType } from "@/modules/purchases/types/purchase";
import { getPurchaseDocumentTypeLabel } from "@/modules/purchases/utils/purchase-formatters";

type PurchaseDocumentBadgeProps = {
  type: PurchaseDocumentType;
};

export function PurchaseDocumentBadge({ type }: PurchaseDocumentBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
      {getPurchaseDocumentTypeLabel(type)}
    </span>
  );
}
