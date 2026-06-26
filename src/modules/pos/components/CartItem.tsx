"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/modules/pos/types/pos";
import { formatCLP } from "@/modules/pos/utils/pos-calculations";

type CartItemProps = {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
};

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const itemSubtotal = item.product.price * item.quantity;

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/8 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            {item.product.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatCLP(item.product.price)} c/u
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemove(item.product.id)}
          className="rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onDecrease(item.product.id)}
            className="size-8 rounded-xl"
          >
            <Minus className="size-4" />
          </Button>
          <span className="min-w-8 text-center text-sm font-semibold text-slate-900 dark:text-white">
            {item.quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onIncrease(item.product.id)}
            className="size-8 rounded-xl"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <p className="text-right text-sm font-semibold text-slate-950 dark:text-white">
          {formatCLP(itemSubtotal)}
        </p>
      </div>
    </article>
  );
}
