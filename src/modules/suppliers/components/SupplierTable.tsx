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
import { SupplierStatusBadge } from "@/modules/suppliers/components/SupplierStatusBadge";
import type { Supplier } from "@/modules/suppliers/types/supplier";
import {
  formatSupplierContact,
  formatSupplierRut,
  getSupplierStatus,
  getSupplierStatusLabel,
} from "@/modules/suppliers/utils/supplier-formatters";

type SupplierTableProps = {
  suppliers: Supplier[];
  onEditSupplier: (supplier: Supplier) => void;
  onToggleSupplierStatus: (supplierId: number) => void;
  onDeleteSupplier: (supplierId: number) => void;
};

export function SupplierTable({
  suppliers,
  onEditSupplier,
  onToggleSupplierStatus,
  onDeleteSupplier,
}: SupplierTableProps) {
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);

  const columns: DataTableColumn<Supplier>[] = [
    {
      key: "name",
      header: "Nombre",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[180px] font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "rut",
      header: "RUT",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
      render: (supplier) => formatSupplierRut(supplier.rut),
      searchValue: (supplier) => supplier.rut ?? "",
      exportValue: (supplier) => formatSupplierRut(supplier.rut),
    },
    {
      key: "business_name",
      header: "Razón social",
      sortable: true,
      cellClassName: "min-w-[220px]",
      render: (supplier) => supplier.business_name || "Sin razón social",
      searchValue: (supplier) => supplier.business_name ?? "",
    },
    {
      key: "giro",
      header: "Giro",
      sortable: true,
      cellClassName: "min-w-[200px]",
      render: (supplier) => supplier.giro || "Sin giro",
      searchValue: (supplier) => supplier.giro ?? "",
    },
    {
      key: "contact",
      header: "Contacto",
      sortable: true,
      render: (supplier) => formatSupplierContact(supplier),
      accessor: (supplier) => formatSupplierContact(supplier),
      searchValue: (supplier) => formatSupplierContact(supplier),
      exportValue: (supplier) => formatSupplierContact(supplier),
    },
    {
      key: "phone",
      header: "Teléfono",
      sortable: true,
      cellClassName: "whitespace-nowrap",
      render: (supplier) => supplier.phone || "Sin teléfono",
      searchValue: (supplier) => supplier.phone ?? "",
    },
    {
      key: "email",
      header: "Correo",
      sortable: true,
      cellClassName: "whitespace-nowrap",
      render: (supplier) => supplier.email || "Sin correo",
      searchValue: (supplier) => supplier.email ?? "",
    },
    {
      key: "commune",
      header: "Comuna",
      sortable: true,
      render: (supplier) => supplier.commune || "Sin comuna",
      searchValue: (supplier) => supplier.commune ?? "",
    },
    {
      key: "city",
      header: "Ciudad",
      sortable: true,
      filterable: true,
      render: (supplier) => supplier.city || "Sin ciudad",
      searchValue: (supplier) => supplier.city ?? "",
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      filterable: true,
      render: (supplier) => <SupplierStatusBadge supplier={supplier} />,
      accessor: (supplier) => getSupplierStatusLabel(getSupplierStatus(supplier)),
      searchValue: (supplier) => getSupplierStatusLabel(getSupplierStatus(supplier)),
      exportValue: (supplier) => getSupplierStatusLabel(getSupplierStatus(supplier)),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={suppliers}
        getRowKey={(supplier) => supplier.id}
        emptyMessage="No se encontraron proveedores."
        actionsClassName="text-center pr-5 min-w-[128px]"
        actionsCellClassName="pr-5 min-w-[128px]"
        fileName="proveedores-austro-pos"
        rowActions={(supplier) => (
          <div className="flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "text-slate-700 dark:text-slate-200",
                )}
                aria-label="Editar proveedor"
                onClick={() => onEditSupplier(supplier)}
              >
                <Pencil className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Editar proveedor</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({
                    variant: supplier.is_active ? "destructive" : "secondary",
                    size: "icon-sm",
                  }),
                )}
                aria-label={
                  supplier.is_active
                    ? "Desactivar proveedor"
                    : "Activar proveedor"
                }
                onClick={() => onToggleSupplierStatus(supplier.id)}
              >
                {supplier.is_active ? (
                  <Ban className="size-4" />
                ) : (
                  <Power className="size-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                {supplier.is_active
                  ? "Desactivar proveedor"
                  : "Activar proveedor"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={cn(
                  buttonVariants({ variant: "destructive", size: "icon-sm" }),
                  "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:bg-rose-500/20",
                )}
                aria-label="Eliminar proveedor"
                onClick={() => setSupplierToDelete(supplier)}
              >
                <Trash2 className="size-4" />
              </TooltipTrigger>
              <TooltipContent>Eliminar proveedor</TooltipContent>
            </Tooltip>
          </div>
        )}
      />

      <AlertDialog
        open={Boolean(supplierToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setSupplierToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-slate-950 dark:text-white">
              Eliminar proveedor
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
              ¿Seguro que deseas eliminar este proveedor? Esta acción debe usarse
              solo para proveedores creados por error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (supplierToDelete) {
                  onDeleteSupplier(supplierToDelete.id);
                  setSupplierToDelete(null);
                }
              }}
            >
              Eliminar proveedor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
