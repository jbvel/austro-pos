export type PurchaseDocumentType =
  | "invoice"
  | "receipt"
  | "dispatch_guide"
  | "sale_note"
  | "other";

export type PurchaseStatus = "draft" | "completed" | "cancelled";

export type PurchaseItem = {
  id: number;
  product_id: number;
  product_name: string;
  sku: string;
  quantity: number;
  unit_cost: number;
  subtotal: number;
};

export type Purchase = {
  id: number;
  supplier_id: number;
  supplier_name: string;
  document_type: PurchaseDocumentType;
  document_number?: string;
  purchase_date: string;
  status: PurchaseStatus;
  items: PurchaseItem[];
  subtotal: number;
  total: number;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type PurchaseFormValues = {
  supplier_id: number | null;
  document_type: PurchaseDocumentType;
  document_number?: string;
  purchase_date: string;
  status: PurchaseStatus;
  notes?: string;
  items: PurchaseItem[];
};

export type PurchaseDocumentTypeOption = {
  id: PurchaseDocumentType;
  label: string;
};

export type PurchaseStatusOption = {
  id: PurchaseStatus;
  label: string;
};
