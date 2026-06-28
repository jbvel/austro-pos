"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";

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
import { mockInventoryMovementTypes } from "@/modules/inventory/data/mock-inventory";
import {
  inventoryMovementSchema,
  type InventoryMovementSchemaValues,
} from "@/modules/inventory/schemas/inventory.schema";
import type { InventoryItem } from "@/modules/inventory/types/inventory";

type InventoryMovementFormProps = {
  item?: InventoryItem | null;
  items: InventoryItem[];
  onSubmit: (values: InventoryMovementSchemaValues) => void;
  onCancel: () => void;
};

const defaultValues: InventoryMovementSchemaValues = {
  product_id: 0,
  product_name: "",
  sku: "",
  movement_type: "purchase_entry",
  quantity: 1,
  reason: "",
  reference: "",
};

export function InventoryMovementForm({
  item,
  items,
  onSubmit,
  onCancel,
}: InventoryMovementFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InventoryMovementSchemaValues>({
    resolver: zodResolver(inventoryMovementSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!item) {
      reset(defaultValues);
      return;
    }

    reset({
      ...defaultValues,
      product_id: item.product_id,
      product_name: item.product_name,
      sku: item.sku,
    });
  }, [item, reset]);

  const selectedProductId = useWatch({
    control,
    name: "product_id",
  });
  const selectedInventoryItem = items.find(
    (inventoryItem) => inventoryItem.product_id === selectedProductId,
  );

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => onSubmit(values))}
    >
      <input type="hidden" {...register("product_name")} />
      <input type="hidden" {...register("sku")} />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="movement-product">Producto</Label>
          <Controller
            control={control}
            name="product_id"
            render={({ field }) => (
              <Select
                value={field.value > 0 ? String(field.value) : undefined}
                onValueChange={(value) => {
                  const nextProductId = Number(value);
                  const nextItem = items.find(
                    (inventoryItem) => inventoryItem.product_id === nextProductId,
                  );

                  field.onChange(nextProductId);
                  setValue("product_name", nextItem?.product_name ?? "", {
                    shouldValidate: true,
                  });
                  setValue("sku", nextItem?.sku ?? "", {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger
                  id="movement-product"
                  className="h-11 w-full rounded-2xl"
                  aria-invalid={Boolean(errors.product_id)}
                >
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((inventoryItem) => (
                    <SelectItem
                      key={inventoryItem.product_id}
                      value={String(inventoryItem.product_id)}
                    >
                      {inventoryItem.product_name} ({inventoryItem.sku})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {selectedInventoryItem ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Stock actual:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {selectedInventoryItem.current_stock}
              </span>
            </p>
          ) : null}
          {errors.product_id ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.product_id.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="movement-type">Tipo de movimiento</Label>
          <Controller
            control={control}
            name="movement_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="movement-type"
                  className="h-11 w-full rounded-2xl"
                  aria-invalid={Boolean(errors.movement_type)}
                >
                  <SelectValue placeholder="Selecciona un tipo de movimiento" />
                </SelectTrigger>
                <SelectContent>
                  {mockInventoryMovementTypes.map((movementType) => (
                    <SelectItem key={movementType.id} value={movementType.id}>
                      {movementType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.movement_type ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.movement_type.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="movement-quantity">Cantidad</Label>
          <Input
            id="movement-quantity"
            type="number"
            min={1}
            className="h-11 rounded-2xl"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.quantity.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="movement-reason">Motivo</Label>
          <textarea
            id="movement-reason"
            rows={3}
            className="flex min-h-[96px] w-full rounded-2xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-200/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus-visible:border-sky-400 dark:focus-visible:ring-sky-400/20"
            {...register("reason")}
          />
          {errors.reason ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.reason.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="movement-reference">Referencia</Label>
          <Input
            id="movement-reference"
            className="h-11 rounded-2xl"
            placeholder="Ej: Factura 12345, Venta #001, Conteo físico"
            {...register("reference")}
          />
          {errors.reference ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.reference.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Registrar movimiento</Button>
      </div>
    </form>
  );
}
