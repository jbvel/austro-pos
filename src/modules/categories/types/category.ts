export type Category = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CategoryFormValues = {
  name: string;
  description?: string;
  is_active: boolean;
};

export type CategoryStatus = "active" | "inactive";
