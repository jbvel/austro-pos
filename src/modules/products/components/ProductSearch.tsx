"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nombre, SKU, código de barras o categoría..."
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
        className="h-12 rounded-2xl border-slate-200/80 bg-white pl-10 text-slate-900 shadow-sm shadow-slate-200/40 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
