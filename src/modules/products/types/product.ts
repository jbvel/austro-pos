export type Product = {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  min_stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductFormValues = {
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  min_stock: number;
  is_active: boolean;
};

export type ProductStatus = "active" | "inactive" | "low_stock";

export type ProductSearchFilters = {
  search: string;
};
