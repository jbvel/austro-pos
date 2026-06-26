export type Product = {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
  is_active: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type PaymentMethod =
  | "cash"
  | "debit"
  | "credit"
  | "transfer"
  | "mercado_pago"
  | "other";

export type PaymentMethodOption = {
  id: PaymentMethod;
  label: string;
};

export type SaleSummary = {
  subtotal: number;
  discount: number;
  total: number;
  payment_method: PaymentMethod | null;
};
