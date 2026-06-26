"use client";

import type { Product } from "@/modules/pos/types/pos";

import { ProductCard } from "@/modules/pos/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
};

export function ProductGrid({ products, onAddProduct }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300/80 bg-white/80 p-10 text-center text-sm text-slate-500 dark:border-white/12 dark:bg-white/[0.03] dark:text-slate-400">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddProduct={onAddProduct}
        />
      ))}
    </div>
  );
}
