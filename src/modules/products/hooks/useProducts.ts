"use client";

import { useMemo, useState } from "react";

import { mockProducts } from "@/modules/products/data/mock-products";
import type {
  Product,
  ProductFormValues,
} from "@/modules/products/types/product";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function normalizeBarcode(value?: string) {
  return value?.trim() || undefined;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const searchableValues = [
        product.name,
        product.sku,
        product.barcode ?? "",
        product.category,
      ];

      return searchableValues.some((value) =>
        normalizeText(value).includes(normalizedSearch),
      );
    });
  }, [products, search]);

  function clearMessages() {
    setError(null);
    setSuccessMessage(null);
  }

  function openCreateForm() {
    clearMessages();
    setSelectedProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(product: Product) {
    clearMessages();
    setSelectedProduct(product);
    setIsFormOpen(true);
  }

  function closeForm() {
    clearMessages();
    setSelectedProduct(null);
    setIsFormOpen(false);
  }

  function hasDuplicatedSku(sku: string, currentProductId?: number) {
    const normalizedSku = normalizeText(sku);

    return products.some(
      (product) =>
        product.id !== currentProductId &&
        normalizeText(product.sku) === normalizedSku,
    );
  }

  function hasDuplicatedBarcode(barcode?: string, currentProductId?: number) {
    const normalizedBarcode = normalizeBarcode(barcode);

    if (!normalizedBarcode) {
      return false;
    }

    return products.some(
      (product) =>
        product.id !== currentProductId &&
        normalizeBarcode(product.barcode) === normalizedBarcode,
    );
  }

  function createProduct(values: ProductFormValues) {
    clearMessages();

    if (hasDuplicatedSku(values.sku)) {
      setError("Ya existe un producto con ese SKU.");
      return;
    }

    if (hasDuplicatedBarcode(values.barcode)) {
      setError("Ya existe un producto con ese código de barras.");
      return;
    }

    const timestamp = new Date().toISOString();
    const newProduct: Product = {
      id: products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1,
      name: values.name.trim(),
      sku: values.sku.trim(),
      barcode: normalizeBarcode(values.barcode),
      category: values.category.trim(),
      price: values.price,
      cost: values.cost,
      stock: values.stock,
      min_stock: values.min_stock,
      is_active: values.is_active,
      created_at: timestamp,
      updated_at: timestamp,
    };

    setProducts((currentProducts) => [...currentProducts, newProduct]);
    setSuccessMessage("Producto creado correctamente.");
    setSelectedProduct(newProduct);
    setIsFormOpen(false);
  }

  function updateProduct(productId: number, values: ProductFormValues) {
    clearMessages();

    const existingProduct = products.find((product) => product.id === productId);

    if (!existingProduct) {
      setError("Producto no encontrado.");
      return;
    }

    if (hasDuplicatedSku(values.sku, productId)) {
      setError("Ya existe un producto con ese SKU.");
      return;
    }

    if (hasDuplicatedBarcode(values.barcode, productId)) {
      setError("Ya existe un producto con ese código de barras.");
      return;
    }

    const updatedProduct: Product = {
      ...existingProduct,
      name: values.name.trim(),
      sku: values.sku.trim(),
      barcode: normalizeBarcode(values.barcode),
      category: values.category.trim(),
      price: values.price,
      cost: values.cost,
      stock: values.stock,
      min_stock: values.min_stock,
      is_active: values.is_active,
      updated_at: new Date().toISOString(),
    };

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    );
    setSelectedProduct(updatedProduct);
    setSuccessMessage("Producto actualizado correctamente.");
    setIsFormOpen(false);
  }

  function toggleProductStatus(productId: number) {
    clearMessages();

    const existingProduct = products.find((product) => product.id === productId);

    if (!existingProduct) {
      setError("Producto no encontrado.");
      return;
    }

    const updatedProduct: Product = {
      ...existingProduct,
      is_active: !existingProduct.is_active,
      updated_at: new Date().toISOString(),
    };

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    );
    setSelectedProduct((currentProduct) =>
      currentProduct?.id === productId ? updatedProduct : currentProduct,
    );
    setSuccessMessage(
      updatedProduct.is_active
        ? "Producto activado correctamente."
        : "Producto desactivado correctamente.",
    );
  }

  function deleteProduct(productId: number) {
    clearMessages();

    const existingProduct = products.find((product) => product.id === productId);

    if (!existingProduct) {
      setError("Producto no encontrado.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
    setSelectedProduct((currentProduct) =>
      currentProduct?.id === productId ? null : currentProduct,
    );
    if (selectedProduct?.id === productId) {
      setIsFormOpen(false);
    }
    setSuccessMessage("Producto eliminado correctamente.");
  }

  return {
    products,
    search,
    setSearch,
    filteredProducts,
    selectedProduct,
    setSelectedProduct,
    isFormOpen,
    openCreateForm,
    openEditForm,
    closeForm,
    error,
    successMessage,
    clearMessages,
    createProduct,
    updateProduct,
    toggleProductStatus,
    deleteProduct,
  };
}
