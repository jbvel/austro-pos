"use client";

import { Button } from "@/components/ui/button";
import type {
  PaymentMethod,
  PaymentMethodOption,
} from "@/modules/pos/types/pos";

type PaymentSelectorProps = {
  options: PaymentMethodOption[];
  value: PaymentMethod | null;
  onChange: (method: PaymentMethod) => void;
};

export function PaymentSelector({
  options,
  value,
  onChange,
}: PaymentSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
      {options.map((option) => {
        const isActive = value === option.id;

        return (
          <Button
            key={option.id}
            type="button"
            variant={isActive ? "default" : "outline"}
            onClick={() => onChange(option.id)}
            className={`h-11 rounded-2xl justify-start px-3 text-left ${
              isActive
                ? "shadow-[0_12px_26px_-18px_rgba(73,190,255,0.55)]"
                : "border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:bg-white/[0.06]"
            }`}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
