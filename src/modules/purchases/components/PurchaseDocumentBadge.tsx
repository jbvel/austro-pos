"use client";

import type { PurchaseDocumentType } from "@/modules/purchases/types/purchase";
import { getPurchaseDocumentTypeLabel } from "@/modules/purchases/utils/purchase-formatters";

type PurchaseDocumentBadgeProps = {
  type: PurchaseDocumentType;
};

export function PurchaseDocumentBadge({ type }: PurchaseDocumentBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-primary/[0.1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary dark:bg-primary/[0.14] dark:text-primary">
      {getPurchaseDocumentTypeLabel(type)}
    </span>
  );
}
