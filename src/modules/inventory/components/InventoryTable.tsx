"use client";

import type { DataTableColumn } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import type { InventoryItem } from "@/modules/inventory/types/inventory";
import { InventoryStatusBadge } from "@/modules/inventory/components/InventoryStatusBadge";
import {
  formatInventoryCLP,
  formatInventoryDate,
  getInventoryStatusLabel,
} from "@/modules/inventory/utils/inventory-formatters";

type InventoryTableProps = {
  items: InventoryItem[];
};

export function InventoryTable({ items }: InventoryTableProps) {
  const columns: DataTableColumn<InventoryItem>[] = [
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
      key: "category",
      header: "Categoría",
      sortable: true,
      filterable: true,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "current_stock",
      header: "Stock actual",
      sortable: true,
      cellClassName: "whitespace-nowrap font-semibold text-slate-950 dark:text-white",
    },
    {
      key: "min_stock",
      header: "Stock mínimo",
      sortable: true,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "unit_cost",
      header: "Costo unitario",
      sortable: true,
      cellClassName: "whitespace-nowrap",
      render: (item) => formatInventoryCLP(item.unit_cost),
      exportValue: (item) => item.unit_cost,
    },
    {
      key: "total_cost",
      header: "Valor total",
      sortable: true,
      cellClassName: "whitespace-nowrap font-medium text-slate-950 dark:text-white",
      render: (item) => formatInventoryCLP(item.total_cost),
      exportValue: (item) => item.total_cost,
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      filterable: true,
      render: (item) => <InventoryStatusBadge status={item.status} />,
      accessor: (item) => getInventoryStatusLabel(item.status),
      searchValue: (item) => getInventoryStatusLabel(item.status),
      exportValue: (item) => getInventoryStatusLabel(item.status),
    },
    {
      key: "updated_at",
      header: "Última actualización",
      sortable: true,
      cellClassName: "whitespace-nowrap",
      render: (item) => formatInventoryDate(item.updated_at),
      exportValue: (item) => formatInventoryDate(item.updated_at),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      getRowKey={(item) => item.id}
      emptyMessage="No se encontraron productos en inventario."
      fileName="inventario-austro-pos"
      tableClassName="min-w-[1060px]"
    />
  );
}
