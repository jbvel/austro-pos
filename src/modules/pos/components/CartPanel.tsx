"use client";

import { CircleAlert, CircleCheckBig, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/modules/pos/components/CartItem";
import { PaymentSelector } from "@/modules/pos/components/PaymentSelector";
import type {
  CartItem as CartItemType,
  PaymentMethod,
  PaymentMethodOption,
} from "@/modules/pos/types/pos";
import {
  formatCLP,
  parseCLPInput,
} from "@/modules/pos/utils/pos-calculations";

type CartPanelProps = {
  items: CartItemType[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod | null;
  cashReceived: number;
  change: number;
  paymentOptions: PaymentMethodOption[];
  isSubmitting: boolean;
  error: string | null;
  successMessage: string | null;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  onRemoveProduct: (productId: number) => void;
  onSetPaymentMethod: (method: PaymentMethod) => void;
  onSetDiscount: (discount: number) => void;
  onSetCashReceived: (amount: number) => void;
  onFinalizeSale: () => Promise<void>;
};

export function CartPanel({
  items,
  subtotal,
  discount,
  total,
  paymentMethod,
  cashReceived,
  change,
  paymentOptions,
  isSubmitting,
  error,
  successMessage,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
  onSetPaymentMethod,
  onSetDiscount,
  onSetCashReceived,
  onFinalizeSale,
}: CartPanelProps) {
  return (
    <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
      <CardHeader className="border-b border-slate-200/70 px-5 py-5 dark:border-white/8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
            <ReceiptText className="size-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-slate-950 dark:text-white">
              Carrito
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Revisa productos, descuentos y forma de pago.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-5 py-5">
        {error ? (
          <div className="flex items-start gap-2 rounded-2xl border border-rose-200/70 bg-rose-50/80 px-3 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {successMessage ? (
          <div className="flex items-start gap-2 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-3 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
            <CircleCheckBig className="mt-0.5 size-4 shrink-0" />
            <p>{successMessage}</p>
          </div>
        ) : null}

        <div className="space-y-3 xl:max-h-[46vh] xl:overflow-y-auto xl:pr-1">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500 dark:border-white/12 dark:bg-white/[0.03] dark:text-slate-400">
              El carrito está vacío.
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrease={onIncreaseQuantity}
                onDecrease={onDecreaseQuantity}
                onRemove={onRemoveProduct}
              />
            ))
          )}
        </div>

        <div className="space-y-3 rounded-2xl bg-slate-50/90 p-4 dark:bg-white/[0.04]">
          <div className="space-y-2">
            <Label htmlFor="pos-discount" className="text-slate-700 dark:text-slate-200">
              Descuento
            </Label>
            <Input
              id="pos-discount"
              type="text"
              inputMode="numeric"
              value={discount > 0 ? formatCLP(discount) : ""}
              onChange={(event) =>
                onSetDiscount(parseCLPInput(event.target.value))
              }
              placeholder="Ej: $2.000"
              className="h-11 rounded-2xl border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.03]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-200">
              Método de pago
            </Label>
            <PaymentSelector
              options={paymentOptions}
              value={paymentMethod}
              onChange={onSetPaymentMethod}
            />
          </div>

          {paymentMethod === "cash" ? (
            <div className="space-y-3 rounded-2xl border border-sky-100/80 bg-white/80 p-3 dark:border-sky-400/12 dark:bg-sky-500/[0.05]">
              <div className="space-y-2">
                <Label
                  htmlFor="pos-cash-received"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Monto recibido
                </Label>
                <Input
                  id="pos-cash-received"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: $20.000"
                  value={cashReceived > 0 ? formatCLP(cashReceived) : ""}
                  onChange={(event) =>
                    onSetCashReceived(parseCLPInput(event.target.value))
                  }
                  className="h-11 rounded-2xl border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Total</span>
                  <span className="font-medium text-slate-950 dark:text-white">
                    {formatCLP(total)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Monto recibido</span>
                  <span className="font-medium text-slate-950 dark:text-white">
                    {formatCLP(cashReceived)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-3 py-3 text-base font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <span>Vuelto</span>
                  <span>{formatCLP(change)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/8 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Subtotal</span>
            <span className="font-medium text-slate-950 dark:text-white">
              {formatCLP(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Descuento</span>
            <span className="font-medium text-slate-950 dark:text-white">
              {formatCLP(discount)}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-sky-100/70 bg-sky-50/70 px-3 py-3 text-base font-semibold text-slate-950 dark:border-sky-400/12 dark:bg-sky-500/[0.08] dark:text-white">
            <span>Total</span>
            <span>{formatCLP(total)}</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={onFinalizeSale}
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl text-sm font-semibold"
        >
          {isSubmitting ? "Registrando venta..." : "Finalizar venta"}
        </Button>

        {!isSubmitting && items.length === 0 ? (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Agrega productos para habilitar la venta.
          </p>
        ) : null}

        {!isSubmitting && items.length > 0 && paymentMethod === null ? (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Selecciona un método de pago para continuar.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
