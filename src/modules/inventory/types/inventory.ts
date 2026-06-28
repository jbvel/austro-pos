export type InventoryMovementType =
  | "purchase_entry"
  | "sale_exit"
  | "manual_adjustment"
  | "waste"
  | "return_entry"
  | "other";

export type InventoryStatus =
  | "normal"
  | "low_stock"
  | "out_of_stock"
  | "inactive";

export type InventoryItem = {
  id: number;
  product_id: number;
  product_name: string;
  sku: string;
  category: string;
  current_stock: number;
  min_stock: number;
  unit_cost: number;
  total_cost: number;
  status: InventoryStatus;
  is_active: boolean;
  updated_at: string;
};

export type InventoryMovement = {
  id: number;
  product_id: number;
  product_name: string;
  sku: string;
  movement_type: InventoryMovementType;
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reason: string;
  reference?: string;
  created_at: string;
};

export type InventoryMovementTypeOption = {
  id: InventoryMovementType;
  label: string;
};

export type InventoryStatusOption = {
  id: InventoryStatus;
  label: string;
};
