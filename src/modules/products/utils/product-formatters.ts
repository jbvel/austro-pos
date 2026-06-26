import type {
  Product,
  ProductStatus,
} from "@/modules/products/types/product";

export function formatProductPrice(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProductStatus(product: Product): ProductStatus {
  if (!product.is_active) {
    return "inactive";
  }

  if (product.stock <= product.min_stock) {
    return "low_stock";
  }

  return "active";
}

export function getProductStatusLabel(status: ProductStatus): string {
  switch (status) {
    case "inactive":
      return "Inactivo";
    case "low_stock":
      return "Bajo stock";
    case "active":
    default:
      return "Activo";
  }
}
