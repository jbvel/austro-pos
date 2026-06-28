"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  categorySchema,
  type CategorySchemaValues,
} from "@/modules/categories/schemas/category.schema";
import type {
  Category,
  CategoryFormValues,
} from "@/modules/categories/types/category";

type CategoryFormProps = {
  category?: Category | null;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
};

const defaultValues: CategorySchemaValues = {
  name: "",
  description: "",
  is_active: true,
};

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const isEditing = Boolean(category);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategorySchemaValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  useEffect(() => {
    if (!category) {
      reset(defaultValues);
      return;
    }

    reset({
      name: category.name,
      description: category.description ?? "",
      is_active: category.is_active,
    });
  }, [category, reset]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="category-name">Nombre</Label>
          <Input
            id="category-name"
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
          <Label htmlFor="category-description">Descripción</Label>
          <textarea
            id="category-description"
            rows={4}
            className="min-h-28 w-full rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-ring dark:focus:ring-ring/30"
            {...register("description")}
          />
          {errors.description ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errors.description.message as string}
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
        <span>Activa</span>
      </label>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Actualizar categoría" : "Crear categoría"}
        </Button>
      </div>
    </form>
  );
}
