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
import type { Product } from "@/modules/products/types/product";
import { ProductStatusBadge } from "@/modules/products/components/ProductStatusBadge";
import {
  formatProductPrice,
  getProductStatus,
  getProductStatusLabel,
} from "@/modules/products/utils/product-formatters";

type ProductTableProps = {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onToggleProductStatus: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
};

export function ProductTable({
  products,
  onEditProduct,
  onToggleProductStatus,
  onDeleteProduct,
}: ProductTableProps) {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const columns: DataTableColumn<Product>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[180px]",
      render: (product) => (
        <p className="font-semibold text-slate-950 dark:text-white">
          {product.name}
        </p>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      sortable: true,
      filterable: true,
      cellClassName: "font-medium text-slate-950 dark:text-white whitespace-nowrap",
    },
    {
      key: "barcode",
      header: "Código de barras",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
      render: (product) => product.barcode || "Sin código",
    },
    {
      key: "category",
      header: "Categoría",
      sortable: true,
      filterable: true,
    },
    {
      key: "price",
      header: "Precio",
      sortable: true,
      cellClassName: "font-medium text-slate-950 dark:text-white whitespace-nowrap",
      render: (product) => formatProductPrice(product.price),
      exportValue: (product) => product.price,
    },
    {
      key: "cost",
      header: "Costo",
      sortable: true,
      cellClassName: "whitespace-nowrap",
      render: (product) => formatProductPrice(product.cost),
      exportValue: (product) => product.cost,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      cellClassName: "font-medium text-slate-950 dark:text-white",
    },
    {
      key: "min_stock",
      header: "Stock mínimo",
      sortable: true,
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      render: (product) => <ProductStatusBadge product={product} />,
      accessor: (product) => getProductStatusLabel(getProductStatus(product)),
      searchValue: (product) => getProductStatusLabel(getProductStatus(product)),
      exportValue: (product) => getProductStatusLabel(getProductStatus(product)),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={products}
        getRowKey={(product) => product.id}
        emptyMessage="No se encontraron productos."
        actionsClassName="text-center pr-5 min-w-[112px]"
        actionsCellClassName="pr-5 min-w-[112px]"
        fileName="productos-austro-pos"
        rowActions={(product) => (
          <div className="flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "text-slate-700 dark:text-slate-200",
                )}
                aria-label="Editar producto"
                onClick={() => onEditProduct(product)}
              >
                <Pencil className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Editar producto</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({
                    variant: product.is_active ? "destructive" : "secondary",
                    size: "icon-sm",
                  }),
                )}
                aria-label={
                  product.is_active ? "Desactivar producto" : "Activar producto"
                }
                onClick={() => onToggleProductStatus(product.id)}
              >
                {product.is_active ? (
                  <Ban className="size-4" />
                ) : (
                  <Power className="size-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                {product.is_active
                  ? "Desactivar producto"
                  : "Activar producto"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "destructive", size: "icon-sm" }),
                  "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:bg-rose-500/20",
                )}
                aria-label="Eliminar producto"
                onClick={() => setProductToDelete(product)}
              >
                <Trash2 className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Eliminar producto</TooltipContent>
            </Tooltip>
          </div>
        )}
      />

      <AlertDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-slate-950 dark:text-white">
              Eliminar producto
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
              ¿Seguro que deseas eliminar este producto? Esta acción debe
              usarse solo para productos creados por error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (productToDelete) {
                  onDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }
              }}
            >
              Eliminar producto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
