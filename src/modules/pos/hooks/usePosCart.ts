"use client";

import { useMemo, useState } from "react";

import type {
  CartItem,
  PaymentMethod,
  Product,
} from "@/modules/pos/types/pos";
import {
  calculateCartSubtotal,
  calculateChange,
  calculateSaleTotal,
} from "@/modules/pos/utils/pos-calculations";

const MOCK_SALE_DELAY_MS = 700;

function wait(delay: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}

export function usePosCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscountState] = useState(0);
  const [paymentMethod, setPaymentMethodState] =
    useState<PaymentMethod | null>(null);
  const [cashReceived, setCashReceivedState] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const subtotal = useMemo(() => calculateCartSubtotal(items), [items]);
  const normalizedDiscount = Math.min(discount, subtotal);
  const total = useMemo(
    () => calculateSaleTotal(subtotal, normalizedDiscount),
    [subtotal, normalizedDiscount],
  );
  const change = useMemo(
    () => calculateChange(total, cashReceived),
    [total, cashReceived],
  );

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function addProduct(product: Product) {
    clearMessages();

    if (!product.is_active) {
      setError("No puedes agregar un producto inactivo.");
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (!existingItem) {
        if (product.stock < 1) {
          setError("No hay stock suficiente.");
          return currentItems;
        }

        return [...currentItems, { product, quantity: 1 }];
      }

      if (existingItem.quantity >= product.stock) {
        setError("No hay stock suficiente.");
        return currentItems;
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function removeProduct(productId: number) {
    clearMessages();
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }

  function increaseQuantity(productId: number) {
    clearMessages();

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        if (item.quantity >= item.product.stock) {
          setError("No hay stock suficiente.");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  }

  function decreaseQuantity(productId: number) {
    clearMessages();

    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [
          {
            ...item,
            quantity: item.quantity - 1,
          },
        ];
      }),
    );
  }

  function updateQuantity(productId: number, quantity: number) {
    clearMessages();

    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item];
        }

        if (quantity <= 0) {
          return [];
        }

        const normalizedQuantity = Math.min(quantity, item.product.stock);

        if (quantity > item.product.stock) {
          setError("No hay stock suficiente.");
        }

        return [
          {
            ...item,
            quantity: normalizedQuantity,
          },
        ];
      }),
    );
  }

  function clearCart() {
    clearMessages();
    setItems([]);
    setDiscountState(0);
    setPaymentMethodState(null);
    setCashReceivedState(0);
  }

  function setPaymentMethod(method: PaymentMethod) {
    clearMessages();
    setPaymentMethodState(method);

    if (method !== "cash") {
      setCashReceivedState(0);
    }
  }

  function setDiscount(discountValue: number) {
    clearMessages();

    const normalizedDiscount = Math.max(0, Math.min(discountValue, subtotal));
    setDiscountState(normalizedDiscount);
  }

  function setCashReceived(amount: number) {
    clearMessages();
    setCashReceivedState(Math.max(amount, 0));
  }

  async function finalizeMockSale() {
    clearMessages();

    if (items.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    if (!paymentMethod) {
      setError("Selecciona un método de pago.");
      return;
    }

    if (paymentMethod === "cash") {
      if (cashReceived <= 0) {
        setError("Ingresa el monto recibido.");
        return;
      }

      if (cashReceived < total) {
        setError("El monto recibido es menor al total.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await wait(MOCK_SALE_DELAY_MS);
      setItems([]);
      setDiscountState(0);
      setPaymentMethodState(null);
      setCashReceivedState(0);
      setSuccessMessage("Venta registrada correctamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    items,
    subtotal,
    discount: normalizedDiscount,
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
    updateQuantity,
    clearCart,
    setPaymentMethod,
    setDiscount,
    setCashReceived,
    finalizeMockSale,
  };
}
