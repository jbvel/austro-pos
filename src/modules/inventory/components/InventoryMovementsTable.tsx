"use client";

import type { DataTableColumn } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { InventoryMovementTypeBadge } from "@/modules/inventory/components/InventoryMovementTypeBadge";
import type { InventoryMovement } from "@/modules/inventory/types/inventory";
import {
  formatInventoryDate,
  getInventoryMovementTypeLabel,
} from "@/modules/inventory/utils/inventory-formatters";

type InventoryMovementsTableProps = {
  movements: InventoryMovement[];
};

export function InventoryMovementsTable({
  movements,
}: InventoryMovementsTableProps) {
  const columns: DataTableColumn<InventoryMovement>[] = [
    {
      key: "created_at",
      header: "Fecha",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
      render: (movement) => formatInventoryDate(movement.created_at),
      exportValue: (movement) => formatInventoryDate(movement.created_at),
    },
    {
      key: "product_name",
      header: "Producto",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[220px] font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "sku",
      header: "SKU",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap font-medium",
    },
    {
      key: "movement_type",
      header: "Tipo movimiento",
      sortable: true,
      filterable: true,
      render: (movement) => (
        <InventoryMovementTypeBadge type={movement.movement_type} />
      ),
      accessor: (movement) => getInventoryMovementTypeLabel(movement.movement_type),
      searchValue: (movement) =>
        getInventoryMovementTypeLabel(movement.movement_type),
      exportValue: (movement) =>
        getInventoryMovementTypeLabel(movement.movement_type),
    },
    {
      key: "quantity",
      header: "Cantidad",
      sortable: true,
      cellClassName: "whitespace-nowrap font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "previous_stock",
      header: "Stock anterior",
      sortable: true,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "new_stock",
      header: "Stock nuevo",
      sortable: true,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "reason",
      header: "Motivo",
      sortable: true,
      filterable: true,
      cellClassName: "min-w-[220px]",
    },
    {
      key: "reference",
      header: "Referencia",
      sortable: true,
      render: (movement) => movement.reference || "Sin referencia",
      exportValue: (movement) => movement.reference || "Sin referencia",
      cellClassName: "min-w-[180px]",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={movements}
      getRowKey={(movement) => movement.id}
      emptyMessage="No se encontraron movimientos de inventario."
      fileName="movimientos-inventario-austro-pos"
      tableClassName="min-w-[1180px]"
    />
  );
}
