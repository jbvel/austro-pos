"use client";

import { useMemo, useState } from "react";

import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { mockPaymentMethods } from "@/modules/pos/data/mock-payment-methods";
import { mockProducts } from "@/modules/pos/data/mock-products";
import { CartPanel } from "@/modules/pos/components/CartPanel";
import { ProductGrid } from "@/modules/pos/components/ProductGrid";
import { ProductSearch } from "@/modules/pos/components/ProductSearch";
import { usePosCart } from "@/modules/pos/hooks/usePosCart";

export function PosPage() {
  const [search, setSearch] = useState("");
  const {
    items,
    subtotal,
    discount,
    total,
    paymentMethod,
    cashReceived,
    change,
    isSubmitting,
    error,
    successMessage,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    setPaymentMethod,
    setDiscount,
    setCashReceived,
    finalizeMockSale,
  } = usePosCart();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return mockProducts;
    }

    return mockProducts.filter((product) => {
      const searchableValues = [
        product.name,
        product.sku,
        product.barcode,
        product.category,
      ];

      return searchableValues.some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">
      <Header
        badge="Operación"
        title="POS"
        description="Punto de venta para registrar ventas de forma rápida."
      />

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.75fr)_440px] xl:grid-cols-[minmax(0,1.6fr)_400px]">
        <div className="space-y-5">
          <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
            <CardContent className="space-y-5 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                    Catálogo disponible
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Busca por nombre, SKU, código de barras o categoría.
                  </p>
                </div>

                <div className="lg:w-[420px]">
                  <ProductSearch value={search} onChange={setSearch} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Resultados
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {filteredProducts.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Productos activos
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {mockProducts.filter((product) => product.is_active).length}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Ítems en carrito
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {items.reduce((count, item) => count + item.quantity, 0)}
                  </p>
                </div>
              </div>

              <ProductGrid products={filteredProducts} onAddProduct={addProduct} />
            </CardContent>
          </Card>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <CartPanel
            items={items}
            subtotal={subtotal}
            discount={discount}
            total={total}
            paymentMethod={paymentMethod}
            cashReceived={cashReceived}
            change={change}
            paymentOptions={mockPaymentMethods}
            isSubmitting={isSubmitting}
            error={error}
            successMessage={successMessage}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onRemoveProduct={removeProduct}
            onSetPaymentMethod={setPaymentMethod}
            onSetDiscount={setDiscount}
            onSetCashReceived={setCashReceived}
            onFinalizeSale={finalizeMockSale}
          />
        </div>
      </section>
    </div>
  );
}
