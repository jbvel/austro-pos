"use client";

import { useState } from "react";
import { Ban, Pencil, Power, Trash2 } from "lucide-react";

import type { DataTableColumn } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CategoryStatusBadge } from "@/modules/categories/components/CategoryStatusBadge";
import type { Category } from "@/modules/categories/types/category";

type CategoryTableProps = {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onToggleCategoryStatus: (categoryId: number) => void;
  onDeleteCategory: (categoryId: number) => void;
};

export function CategoryTable({
  categories,
  onEditCategory,
  onToggleCategoryStatus,
  onDeleteCategory,
}: CategoryTableProps) {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const columns: DataTableColumn<Category>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[180px] font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "description",
      header: "Descripción",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[240px] text-slate-600 dark:text-slate-300",
      render: (category) => category.description || "Sin descripción",
      searchValue: (category) => category.description || "",
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      filterable: true,
      render: (category) => <CategoryStatusBadge category={category} />,
      accessor: (category) => (category.is_active ? "Activa" : "Inactiva"),
      searchValue: (category) => (category.is_active ? "Activa" : "Inactiva"),
      exportValue: (category) => (category.is_active ? "Activa" : "Inactiva"),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        getRowKey={(category) => category.id}
        emptyMessage="No se encontraron categorías."
        actionsClassName="text-center pr-5 min-w-[128px]"
        actionsCellClassName="pr-5 min-w-[128px]"
        fileName="categorias-austro-pos"
        rowActions={(category) => (
          <div className="flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "text-slate-700 dark:text-slate-200",
                )}
                aria-label="Editar categoría"
                onClick={() => onEditCategory(category)}
              >
                <Pencil className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Editar categoría</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({
                    variant: category.is_active ? "destructive" : "secondary",
                    size: "icon-sm",
                  }),
                )}
                aria-label={
                  category.is_active
                    ? "Desactivar categoría"
                    : "Activar categoría"
                }
                onClick={() => onToggleCategoryStatus(category.id)}
              >
                {category.is_active ? (
                  <Ban className="size-4" />
                ) : (
                  <Power className="size-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                {category.is_active
                  ? "Desactivar categoría"
                  : "Activar categoría"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "destructive", size: "icon-sm" }),
                  "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:bg-rose-500/20",
                )}
                aria-label="Eliminar categoría"
                onClick={() => setCategoryToDelete(category)}
              >
                <Trash2 className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Eliminar categoría</TooltipContent>
            </Tooltip>
          </div>
        )}
      />

      <AlertDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-slate-950 dark:text-white">
              Eliminar categoría
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
              ¿Seguro que deseas eliminar esta categoría? Esta acción debe usarse
              solo para categorías creadas por error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (categoryToDelete) {
                  onDeleteCategory(categoryToDelete.id);
                  setCategoryToDelete(null);
                }
              }}
            >
              Eliminar categoría
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
