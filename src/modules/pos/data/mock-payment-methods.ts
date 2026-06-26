import type { PaymentMethodOption } from "@/modules/pos/types/pos";

export const mockPaymentMethods: PaymentMethodOption[] = [
  {
    id: "cash",
    label: "Efectivo",
  },
  {
    id: "debit",
    label: "Débito",
  },
  {
    id: "credit",
    label: "Crédito",
  },
  {
    id: "transfer",
    label: "Transferencia",
  },
  {
    id: "mercado_pago",
    label: "Mercado Pago",
  },
  {
    id: "other",
    label: "Otro",
  },
];
