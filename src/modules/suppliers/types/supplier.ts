export type Supplier = {
  id: number;
  name: string;
  rut?: string;
  business_name?: string;
  giro?: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  commune?: string;
  city?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SupplierFormValues = {
  name: string;
  rut?: string;
  business_name?: string;
  giro?: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  commune?: string;
  city?: string;
  is_active: boolean;
};

export type SupplierStatus = "active" | "inactive";

export type SupplierSearchFilters = {
  search: string;
};
