"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useCategories } from "@/modules/categories/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  productSchema,
  type ProductSchemaValues,
} from "@/modules/products/schemas/product.schema";
import type {
  Product,
  ProductFormValues,
} from "@/modules/products/types/product";

type ProductFormProps = {
  product?: Product | null;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
};

const defaultValues: ProductSchemaValues = {
  name: "",
  sku: "",
  barcode: "",
  category: "",
  price: 0,
  cost: 0,
  stock: 0,
  min_stock: 0,
  is_active: true,
};

export function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const isEditing = Boolean(product);
  const { activeCategories } = useCategories();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!product) {
      reset(defaultValues);
      return;
    }

    reset({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode ?? "",
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      min_stock: product.min_stock,
      is_active: product.is_active,
    });
  }, [product, reset]);

  const currentCategory = product?.category?.trim() ?? "";
  const hasCurrentActiveCategory = activeCategories.some(
    (category) => category.name === currentCategory,
  );
  const hasUnavailableCurrentCategory =
    isEditing && Boolean(currentCategory) && !hasCurrentActiveCategory;
  const categoryOptions = hasUnavailableCurrentCategory
    ? [
        {
          name: currentCategory,
          description: "Categoría actual no disponible",
          isUnavailable: true,
        },
        ...activeCategories.map((category) => ({
          name: category.name,
          description: category.description,
          isUnavailable: false,
        })),
      ]
    : activeCategories.map((category) => ({
        name: category.name,
        description: category.description,
        isUnavailable: false,
      }));
  const hasActiveCategories = activeCategories.length > 0;

  return (
    <form className="space-y-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="product-name">Nombre</Label>
          <Input
            id="product-name"
            className="h-11 rounded-2xl"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-sku">SKU</Label>
          <Input
            id="product-sku"
            className="h-11 rounded-2xl"
            {...register("sku")}
          />
          {errors.sku ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.sku.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-barcode">Código de barras</Label>
          <Input
            id="product-barcode"
            className="h-11 rounded-2xl"
            {...register("barcode")}
          />
          {errors.barcode ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.barcode.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="product-category">Categoría</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!hasActiveCategories && !hasUnavailableCurrentCategory}
              >
                <SelectTrigger
                  id="product-category"
                  className="h-11 w-full rounded-2xl border-slate-200/80 bg-white px-3 text-sm text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  aria-invalid={Boolean(errors.category)}
                >
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((categoryOption) => (
                    <SelectItem
                      key={categoryOption.name}
                      value={categoryOption.name}
                    >
                      {categoryOption.isUnavailable
                        ? `${categoryOption.name} (no activa o no existe)`
                        : categoryOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {!hasActiveCategories ? (
            <p className="text-sm text-amber-600 dark:text-amber-300">
              No hay categorías activas disponibles.
            </p>
          ) : null}
          {hasUnavailableCurrentCategory ? (
            <p className="text-sm text-amber-600 dark:text-amber-300">
              La categoría actual no está activa o no existe.
            </p>
          ) : null}
          {errors.category ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.category.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-price">Precio venta</Label>
          <Input
            id="product-price"
            type="number"
            min={0}
            className="h-11 rounded-2xl"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.price.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-cost">Costo</Label>
          <Input
            id="product-cost"
            type="number"
            min={0}
            className="h-11 rounded-2xl"
            {...register("cost", { valueAsNumber: true })}
          />
          {errors.cost ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.cost.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-stock">Stock</Label>
          <Input
            id="product-stock"
            type="number"
            min={0}
            className="h-11 rounded-2xl"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.stock.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-min-stock">Stock mínimo</Label>
          <Input
            id="product-min-stock"
            type="number"
            min={0}
            className="h-11 rounded-2xl"
            {...register("min_stock", { valueAsNumber: true })}
          />
          {errors.min_stock ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.min_stock.message}
            </p>
          ) : null}
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
        <input
          type="checkbox"
          className="size-4 rounded border-slate-300 text-primary focus:ring-ring"
          {...register("is_active")}
        />
        <span>Activo</span>
      </label>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Actualizar producto" : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}
