"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";

import { mockPurchaseDocumentTypes, mockPurchaseStatuses } from "@/modules/purchases/data/mock-purchases";
import { mockProducts } from "@/modules/products/data/mock-products";
import { mockSuppliers } from "@/modules/suppliers/data/mock-suppliers";
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
import { purchaseSchema } from "@/modules/purchases/schemas/purchase.schema";
import type {
  Purchase,
  PurchaseFormValues,
} from "@/modules/purchases/types/purchase";
import {
  calculatePurchaseItemSubtotal,
  calculatePurchaseSubtotal,
  calculatePurchaseTotal,
} from "@/modules/purchases/utils/purchase-calculations";
import { formatPurchaseCLP } from "@/modules/purchases/utils/purchase-formatters";

type PurchaseFormProps = {
  purchase?: Purchase | null;
  onSubmit: (values: PurchaseFormValues) => void;
  onCancel: () => void;
};

type PurchaseFormInput = z.input<typeof purchaseSchema>;
type PurchaseFormOutput = z.output<typeof purchaseSchema>;

const defaultItem = {
  product_id: 0,
  product_name: "",
  sku: "",
  quantity: 1,
  unit_cost: 0,
  subtotal: 0,
};

const defaultValues: PurchaseFormInput = {
  supplier_id: null,
  document_type: "invoice",
  document_number: "",
  purchase_date: "",
  status: "draft",
  notes: "",
  items: [defaultItem],
};

const activeSuppliers = mockSuppliers.filter((supplier) => supplier.is_active);
const activeProducts = mockProducts.filter((product) => product.is_active);

export function PurchaseForm({
  purchase,
  onSubmit,
  onCancel,
}: PurchaseFormProps) {
  const isEditing = Boolean(purchase);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PurchaseFormInput, undefined, PurchaseFormOutput>({
    resolver: zodResolver(purchaseSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const watchedItems = useWatch({
    control,
    name: "items",
  }) ?? [];

  useEffect(() => {
    if (!purchase) {
      reset(defaultValues);
      return;
    }

    reset({
      supplier_id: purchase.supplier_id,
      document_type: purchase.document_type,
      document_number: purchase.document_number ?? "",
      purchase_date: purchase.purchase_date,
      status: purchase.status,
      notes: purchase.notes ?? "",
      items:
        purchase.items.length > 0
          ? purchase.items.map((item) => ({
              product_id: item.product_id,
              product_name: item.product_name,
              sku: item.sku,
              quantity: item.quantity,
              unit_cost: item.unit_cost,
              subtotal: item.subtotal,
            }))
          : [defaultItem],
    });
  }, [purchase, reset]);

  function handleProductChange(itemIndex: number, productIdValue: string | null) {
    const productId = Number(productIdValue);
    const selectedProduct = activeProducts.find((product) => product.id === productId);

    if (!selectedProduct) {
      setValue(`items.${itemIndex}.product_id`, 0, { shouldValidate: true });
      setValue(`items.${itemIndex}.product_name`, "", { shouldValidate: true });
      setValue(`items.${itemIndex}.sku`, "", { shouldValidate: true });
      setValue(`items.${itemIndex}.unit_cost`, 0, { shouldValidate: true });
      setValue(`items.${itemIndex}.subtotal`, 0, { shouldValidate: true });
      return;
    }

    const currentQuantity = watchedItems[itemIndex]?.quantity ?? 1;
    const subtotal = calculatePurchaseItemSubtotal(currentQuantity, selectedProduct.cost);

    setValue(`items.${itemIndex}.product_id`, selectedProduct.id, { shouldValidate: true });
    setValue(`items.${itemIndex}.product_name`, selectedProduct.name, { shouldValidate: true });
    setValue(`items.${itemIndex}.sku`, selectedProduct.sku, { shouldValidate: true });
    setValue(`items.${itemIndex}.unit_cost`, selectedProduct.cost, { shouldValidate: true });
    setValue(`items.${itemIndex}.subtotal`, subtotal, { shouldValidate: true });
  }

  function handleQuantityChange(itemIndex: number, value: string) {
    const quantity = Number(value);
    const safeQuantity = Number.isFinite(quantity) ? quantity : 0;
    const unitCost = watchedItems[itemIndex]?.unit_cost ?? 0;

    setValue(`items.${itemIndex}.quantity`, safeQuantity, { shouldValidate: true });
    setValue(
      `items.${itemIndex}.subtotal`,
      calculatePurchaseItemSubtotal(safeQuantity, unitCost),
      { shouldValidate: true },
    );
  }

  function handleUnitCostChange(itemIndex: number, value: string) {
    const unitCost = Number(value);
    const safeUnitCost = Number.isFinite(unitCost) ? unitCost : 0;
    const quantity = watchedItems[itemIndex]?.quantity ?? 0;

    setValue(`items.${itemIndex}.unit_cost`, safeUnitCost, { shouldValidate: true });
    setValue(
      `items.${itemIndex}.subtotal`,
      calculatePurchaseItemSubtotal(quantity, safeUnitCost),
      { shouldValidate: true },
    );
  }

  function handleAddItem() {
    append(defaultItem);
  }

  function handleRemoveItem(itemIndex: number) {
    remove(itemIndex);
  }

  function handleFormSubmit(values: PurchaseFormOutput) {
    const items = values.items.map((item, index) => ({
      ...item,
      id: purchase?.items[index]?.id ?? index + 1,
      subtotal: calculatePurchaseItemSubtotal(item.quantity, item.unit_cost),
    }));

    onSubmit({
      ...values,
      document_number: values.document_number?.trim() || undefined,
      notes: values.notes?.trim() || undefined,
      items,
    });
  }

  const purchaseSubtotal = calculatePurchaseSubtotal(
    watchedItems.map((item, index) => ({
      id: index + 1,
      ...defaultItem,
      ...item,
      subtotal: calculatePurchaseItemSubtotal(item?.quantity ?? 0, item?.unit_cost ?? 0),
    })),
  );
  const purchaseTotal = calculatePurchaseTotal(purchaseSubtotal);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="purchase-supplier">Proveedor</Label>
          <Controller
            control={control}
            name="supplier_id"
            render={({ field }) => (
              <Select
                value={field.value === null ? "" : String(field.value)}
                onValueChange={(value) =>
                  field.onChange(value ? Number(value) : null)
                }
              >
                <SelectTrigger
                  id="purchase-supplier"
                  className="h-11 w-full rounded-2xl border-slate-200/80 bg-white px-3 text-sm text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  aria-invalid={Boolean(errors.supplier_id)}
                >
                  <SelectValue placeholder="Selecciona un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {activeSuppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={String(supplier.id)}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.supplier_id ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.supplier_id.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase-document-type">Tipo de documento</Label>
          <Controller
            control={control}
            name="document_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="purchase-document-type"
                  className="h-11 w-full rounded-2xl border-slate-200/80 bg-white px-3 text-sm text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  aria-invalid={Boolean(errors.document_type)}
                >
                  <SelectValue placeholder="Selecciona un tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  {mockPurchaseDocumentTypes.map((documentType) => (
                    <SelectItem key={documentType.id} value={documentType.id}>
                      {documentType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.document_type ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.document_type.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase-document-number">Número de documento</Label>
          <Input
            id="purchase-document-number"
            className="h-11 rounded-2xl"
            {...register("document_number")}
          />
          {errors.document_number ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.document_number.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase-date">Fecha de compra</Label>
          <Input
            id="purchase-date"
            type="date"
            className="h-11 rounded-2xl"
            {...register("purchase_date")}
          />
          {errors.purchase_date ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.purchase_date.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase-status">Estado</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="purchase-status"
                  className="h-11 w-full rounded-2xl border-slate-200/80 bg-white px-3 text-sm text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {mockPurchaseStatuses.map((statusOption) => (
                    <SelectItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="purchase-notes">Notas</Label>
          <textarea
            id="purchase-notes"
            rows={4}
            className="flex min-h-28 w-full rounded-2xl border border-slate-200/80 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
            {...register("notes")}
          />
          {errors.notes ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.notes.message as string}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
              Productos de la compra
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Agrega productos, cantidad y costo unitario para calcular el total.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleAddItem}>
            <Plus className="size-4" />
            Agregar producto
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, itemIndex) => {
            const itemErrors = errors.items?.[itemIndex];
            const currentItem = watchedItems[itemIndex];
            const itemSubtotal = calculatePurchaseItemSubtotal(
              currentItem?.quantity ?? 0,
              currentItem?.unit_cost ?? 0,
            );

            return (
              <div
                key={field.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="grid gap-4 xl:grid-cols-[1.6fr_0.8fr_0.8fr_auto]">
                  <div className="space-y-2">
                    <Label htmlFor={`purchase-item-product-${itemIndex}`}>Producto</Label>
                    <Controller
                      control={control}
                      name={`items.${itemIndex}.product_id`}
                      render={({ field: productField }) => (
                        <Select
                          value={productField.value > 0 ? String(productField.value) : ""}
                          onValueChange={(value) => handleProductChange(itemIndex, value)}
                        >
                          <SelectTrigger
                            id={`purchase-item-product-${itemIndex}`}
                            className="h-11 w-full rounded-2xl border-slate-200/80 bg-white px-3 text-sm text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                            aria-invalid={Boolean(itemErrors?.product_id)}
                          >
                            <SelectValue placeholder="Selecciona un producto" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeProducts.map((product) => (
                              <SelectItem key={product.id} value={String(product.id)}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {itemErrors?.product_id ? (
                      <p className="text-sm text-rose-600 dark:text-rose-300">
                        {itemErrors.product_id.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`purchase-item-quantity-${itemIndex}`}>Cantidad</Label>
                    <Input
                      id={`purchase-item-quantity-${itemIndex}`}
                      type="number"
                      min={0}
                      className="h-11 rounded-2xl"
                      value={currentItem?.quantity ?? 0}
                      onChange={(event) =>
                        handleQuantityChange(itemIndex, event.target.value)
                      }
                    />
                    {itemErrors?.quantity ? (
                      <p className="text-sm text-rose-600 dark:text-rose-300">
                        {itemErrors.quantity.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`purchase-item-unit-cost-${itemIndex}`}>
                      Costo unitario
                    </Label>
                    <Input
                      id={`purchase-item-unit-cost-${itemIndex}`}
                      type="number"
                      min={0}
                      className="h-11 rounded-2xl"
                      value={currentItem?.unit_cost ?? 0}
                      onChange={(event) =>
                        handleUnitCostChange(itemIndex, event.target.value)
                      }
                    />
                    {itemErrors?.unit_cost ? (
                      <p className="text-sm text-rose-600 dark:text-rose-300">
                        {itemErrors.unit_cost.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => handleRemoveItem(itemIndex)}
                      aria-label="Quitar producto"
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-slate-50/80 px-4 py-3 text-sm dark:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-950 dark:text-white">SKU:</span>{" "}
                    {currentItem?.sku || "Sin SKU"}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-950 dark:text-white">
                      Subtotal:
                    </span>{" "}
                    {formatPurchaseCLP(itemSubtotal)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {errors.items?.message ? (
          <p className="text-sm text-rose-600 dark:text-rose-300">
            {errors.items.message}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Subtotal
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
              {formatPurchaseCLP(purchaseSubtotal)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Total
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
              {formatPurchaseCLP(purchaseTotal)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Actualizar compra" : "Crear compra"}
        </Button>
      </div>
    </form>
  );
}
