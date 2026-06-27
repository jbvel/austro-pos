"use client";

import { useState } from "react";
import { Ban, Pencil, Trash2 } from "lucide-react";

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
import { PurchaseDocumentBadge } from "@/modules/purchases/components/PurchaseDocumentBadge";
import { PurchaseStatusBadge } from "@/modules/purchases/components/PurchaseStatusBadge";
import type { Purchase } from "@/modules/purchases/types/purchase";
import {
  formatPurchaseCLP,
  formatPurchaseDate,
  getPurchaseDocumentTypeLabel,
  getPurchaseStatusLabel,
} from "@/modules/purchases/utils/purchase-formatters";

type PurchaseTableProps = {
  purchases: Purchase[];
  onEditPurchase: (purchase: Purchase) => void;
  onCancelPurchase: (purchaseId: number) => void;
  onDeletePurchase: (purchaseId: number) => void;
};

export function PurchaseTable({
  purchases,
  onEditPurchase,
  onCancelPurchase,
  onDeletePurchase,
}: PurchaseTableProps) {
  const [purchaseToCancel, setPurchaseToCancel] = useState<Purchase | null>(null);
  const [purchaseToDelete, setPurchaseToDelete] = useState<Purchase | null>(null);

  const columns: DataTableColumn<Purchase>[] = [
    {
      key: "supplier_name",
      header: "Proveedor",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[200px] font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "document_type",
      header: "Documento",
      sortable: true,
      filterable: true,
      render: (purchase) => <PurchaseDocumentBadge type={purchase.document_type} />,
      accessor: (purchase) => getPurchaseDocumentTypeLabel(purchase.document_type),
      searchValue: (purchase) => getPurchaseDocumentTypeLabel(purchase.document_type),
      exportValue: (purchase) => getPurchaseDocumentTypeLabel(purchase.document_type),
    },
    {
      key: "document_number",
      header: "Número documento",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
      render: (purchase) => purchase.document_number || "Sin número",
    },
    {
      key: "purchase_date",
      header: "Fecha",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
      render: (purchase) => formatPurchaseDate(purchase.purchase_date),
      exportValue: (purchase) => formatPurchaseDate(purchase.purchase_date),
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      filterable: true,
      render: (purchase) => <PurchaseStatusBadge status={purchase.status} />,
      accessor: (purchase) => getPurchaseStatusLabel(purchase.status),
      searchValue: (purchase) => getPurchaseStatusLabel(purchase.status),
      exportValue: (purchase) => getPurchaseStatusLabel(purchase.status),
    },
    {
      key: "items",
      header: "Productos",
      sortable: true,
      render: (purchase) => {
        const count = purchase.items.length;
        return `${count} ${count === 1 ? "producto" : "productos"}`;
      },
      accessor: (purchase) => purchase.items.length,
      exportValue: (purchase) => purchase.items.length,
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      cellClassName: "whitespace-nowrap font-medium text-slate-950 dark:text-white",
      render: (purchase) => formatPurchaseCLP(purchase.total),
      exportValue: (purchase) => purchase.total,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={purchases}
        getRowKey={(purchase) => purchase.id}
        emptyMessage="No se encontraron compras."
        actionsClassName="text-center pr-5 min-w-[144px]"
        actionsCellClassName="pr-5 min-w-[144px]"
        fileName="compras-austro-pos"
        rowActions={(purchase) => {
          const canEdit = purchase.status !== "cancelled";
          const canCancel = purchase.status !== "cancelled";
          const canDelete = purchase.status === "draft";

          return (
            <div className="flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon-sm" }),
                    "text-slate-700 dark:text-slate-200",
                    !canEdit && "cursor-not-allowed opacity-45",
                  )}
                  aria-label="Editar compra"
                  onClick={() => {
                    if (canEdit) {
                      onEditPurchase(purchase);
                    }
                  }}
                >
                  <Pencil className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  {canEdit ? "Editar compra" : "No disponible para compras anuladas"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "icon-sm" }),
                    canCancel
                      ? "text-amber-700 dark:text-amber-300"
                      : "cursor-not-allowed opacity-45",
                  )}
                  aria-label="Anular compra"
                  onClick={() => {
                    if (canCancel) {
                      setPurchaseToCancel(purchase);
                    }
                  }}
                >
                  <Ban className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  {canCancel ? "Anular compra" : "La compra ya está anulada"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "icon-sm" }),
                    canDelete
                      ? "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:bg-rose-500/20"
                      : "cursor-not-allowed opacity-45",
                  )}
                  aria-label="Eliminar compra"
                  onClick={() => {
                    if (canDelete) {
                      setPurchaseToDelete(purchase);
                    }
                  }}
                >
                  <Trash2 className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  {canDelete
                    ? "Eliminar compra"
                    : "Solo puedes eliminar compras en borrador"}
                </TooltipContent>
              </Tooltip>
            </div>
          );
        }}
      />

      <AlertDialog
        open={Boolean(purchaseToCancel)}
        onOpenChange={(open) => {
          if (!open) {
            setPurchaseToCancel(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-slate-950 dark:text-white">
              Anular compra
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
              ¿Seguro que deseas anular esta compra? La compra quedará marcada como
              anulada y no debería seguir editándose.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (purchaseToCancel) {
                  onCancelPurchase(purchaseToCancel.id);
                  setPurchaseToCancel(null);
                }
              }}
            >
              Anular compra
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(purchaseToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setPurchaseToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-slate-950 dark:text-white">
              Eliminar compra
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
              ¿Seguro que deseas eliminar esta compra? Esta acción solo debe
              usarse para compras en borrador creadas por error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (purchaseToDelete) {
                  onDeletePurchase(purchaseToDelete.id);
                  setPurchaseToDelete(null);
                }
              }}
            >
              Eliminar compra
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
