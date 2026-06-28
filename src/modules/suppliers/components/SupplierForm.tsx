"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  supplierSchema,
  type SupplierSchemaValues,
} from "@/modules/suppliers/schemas/supplier.schema";
import type {
  Supplier,
  SupplierFormValues,
} from "@/modules/suppliers/types/supplier";

type SupplierFormProps = {
  supplier?: Supplier | null;
  onSubmit: (values: SupplierFormValues) => void;
  onCancel: () => void;
};

type SupplierFormInput = z.input<typeof supplierSchema>;

const defaultValues: SupplierSchemaValues = {
  name: "",
  rut: "",
  business_name: "",
  giro: "",
  contact_name: "",
  phone: "",
  email: "",
  address: "",
  commune: "",
  city: "",
  is_active: true,
};

export function SupplierForm({
  supplier,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const isEditing = Boolean(supplier);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormInput, undefined, SupplierSchemaValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!supplier) {
      reset(defaultValues);
      return;
    }

    reset({
      name: supplier.name,
      rut: supplier.rut ?? "",
      business_name: supplier.business_name ?? "",
      giro: supplier.giro ?? "",
      contact_name: supplier.contact_name ?? "",
      phone: supplier.phone ?? "",
      email: supplier.email ?? "",
      address: supplier.address ?? "",
      commune: supplier.commune ?? "",
      city: supplier.city ?? "",
      is_active: supplier.is_active,
    });
  }, [supplier, reset]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="supplier-name">Nombre proveedor</Label>
          <Input
            id="supplier-name"
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
          <Label htmlFor="supplier-rut">RUT</Label>
          <Input
            id="supplier-rut"
            className="h-11 rounded-2xl"
            {...register("rut")}
          />
          {errors.rut ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.rut.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-business-name">Razón social</Label>
          <Input
            id="supplier-business-name"
            className="h-11 rounded-2xl"
            {...register("business_name")}
          />
          {errors.business_name ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.business_name.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-giro">Giro</Label>
          <Input
            id="supplier-giro"
            className="h-11 rounded-2xl"
            {...register("giro")}
          />
          {errors.giro ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.giro.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-contact-name">Persona de contacto</Label>
          <Input
            id="supplier-contact-name"
            className="h-11 rounded-2xl"
            {...register("contact_name")}
          />
          {errors.contact_name ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.contact_name.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-phone">Teléfono</Label>
          <Input
            id="supplier-phone"
            className="h-11 rounded-2xl"
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.phone.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-email">Correo</Label>
          <Input
            id="supplier-email"
            type="email"
            className="h-11 rounded-2xl"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.email.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 xl:col-span-2">
          <Label htmlFor="supplier-address">Dirección</Label>
          <Input
            id="supplier-address"
            className="h-11 rounded-2xl"
            {...register("address")}
          />
          {errors.address ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.address.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-commune">Comuna</Label>
          <Input
            id="supplier-commune"
            className="h-11 rounded-2xl"
            {...register("commune")}
          />
          {errors.commune ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.commune.message as string}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-city">Ciudad</Label>
          <Input
            id="supplier-city"
            className="h-11 rounded-2xl"
            {...register("city")}
          />
          {errors.city ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.city.message as string}
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
          {isEditing ? "Actualizar proveedor" : "Crear proveedor"}
        </Button>
      </div>
    </form>
  );
}
