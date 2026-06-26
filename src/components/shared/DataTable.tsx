"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Columns3, Download, LoaderCircle } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SortDirection = "asc" | "desc" | null;

export type DataTableColumn<TData> = {
  key: keyof TData | string;
  header: string;
  render?: (row: TData) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  hideable?: boolean;
  className?: string;
  cellClassName?: string;
  accessor?: (row: TData) => unknown;
  exportValue?: (row: TData) => string | number;
  searchValue?: (row: TData) => string;
};

type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  getRowKey: (row: TData) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  enableGlobalSearch?: boolean;
  rowActions?: (row: TData) => React.ReactNode;
  actionsHeader?: string;
  actionsClassName?: string;
  actionsCellClassName?: string;
  fileName?: string;
  tableClassName?: string;
};

function getColumnValue<TData>(column: DataTableColumn<TData>, row: TData) {
  if (column.accessor) {
    return column.accessor(row);
  }

  return (row as Record<string, unknown>)[String(column.key)];
}

function normalizeValue(value: unknown) {
  if (value == null) {
    return "";
  }

  return String(value).trim().toLowerCase();
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DataTable<TData>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No hay datos disponibles.",
  loading = false,
  enableGlobalSearch = false,
  rowActions,
  actionsHeader = "Acciones",
  actionsClassName,
  actionsCellClassName,
  fileName = "tabla-austro-pos",
  tableClassName,
}: DataTableProps<TData>) {
  const defaultVisibleColumns = useMemo(
    () =>
      columns
        .filter((column) => column.hideable !== false)
        .map((column) => String(column.key)),
    [columns],
  );
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortState, setSortState] = useState<{
    key: string | null;
    direction: SortDirection;
  }>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

  const hasActions = typeof rowActions === "function";

  const activeColumns = useMemo(
    () =>
      columns.filter(
        (column) =>
          column.hideable === false || visibleColumns.includes(String(column.key)),
      ),
    [columns, visibleColumns],
  );

  const filteredData = useMemo(() => {
    const normalizedGlobalSearch = normalizeValue(globalSearch);

    return data.filter((row) => {
      const matchesGlobalSearch =
        !enableGlobalSearch ||
        normalizedGlobalSearch === "" ||
        activeColumns.some((column) => {
          const searchableValue = column.searchValue
            ? column.searchValue(row)
            : getColumnValue(column, row);

          return normalizeValue(searchableValue).includes(normalizedGlobalSearch);
        });

      if (!matchesGlobalSearch) {
        return false;
      }

      return columns.every((column) => {
        if (!column.filterable) {
          return true;
        }

        const filterValue = normalizeValue(columnFilters[String(column.key)]);

        if (!filterValue) {
          return true;
        }

        const columnValue = column.searchValue
          ? column.searchValue(row)
          : getColumnValue(column, row);

        return normalizeValue(columnValue).includes(filterValue);
      });
    });
  }, [activeColumns, columnFilters, columns, data, enableGlobalSearch, globalSearch]);

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) {
      return filteredData;
    }

    const column = columns.find((item) => String(item.key) === sortState.key);

    if (!column) {
      return filteredData;
    }

    return [...filteredData].sort((leftRow, rightRow) => {
      const leftValue = normalizeValue(getColumnValue(column, leftRow));
      const rightValue = normalizeValue(getColumnValue(column, rightRow));

      if (leftValue < rightValue) {
        return sortState.direction === "asc" ? -1 : 1;
      }

      if (leftValue > rightValue) {
        return sortState.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [columns, filteredData, sortState]);

  const totalResults = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPageSafe - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPageSafe, rowsPerPage, sortedData]);

  const exportableColumns = useMemo(
    () => activeColumns.filter((column) => column.exportable !== false),
    [activeColumns],
  );

  function handleSort(columnKey: string) {
    setCurrentPage(1);
    setSortState((currentSort) => {
      if (currentSort.key !== columnKey) {
        return { key: columnKey, direction: "asc" };
      }

      if (currentSort.direction === "asc") {
        return { key: columnKey, direction: "desc" };
      }

      if (currentSort.direction === "desc") {
        return { key: null, direction: null };
      }

      return { key: columnKey, direction: "asc" };
    });
  }

  function handleFilterChange(columnKey: string, value: string) {
    setCurrentPage(1);
    setColumnFilters((currentFilters) => ({
      ...currentFilters,
      [columnKey]: value,
    }));
  }

  function handleToggleColumn(columnKey: string) {
    setVisibleColumns((currentColumns) =>
      currentColumns.includes(columnKey)
        ? currentColumns.filter((item) => item !== columnKey)
        : [...currentColumns, columnKey],
    );
  }

  function handleExportCsv() {
    const headers = exportableColumns.map((column) => column.header);
    const rows = sortedData.map((row) =>
      exportableColumns.map((column) => {
        const value = column.exportValue
          ? column.exportValue(row)
          : getColumnValue(column, row);

        return `"${String(value ?? "").replaceAll('"', '""')}"`;
      }),
    );
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    downloadBlob(
      new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" }),
      `${fileName}.csv`,
    );
  }

  function handleExportExcel() {
    const excelRows = sortedData.map((row) =>
      Object.fromEntries(
        exportableColumns.map((column) => [
          column.header,
          column.exportValue ? column.exportValue(row) : getColumnValue(column, row),
        ]),
      ),
    );

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          {enableGlobalSearch ? (
            <Input
              type="search"
              value={globalSearch}
              onChange={(event) => {
                setCurrentPage(1);
                setGlobalSearch(event.target.value);
              }}
              placeholder="Buscar..."
              className="h-11 rounded-2xl border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.03]"
            />
          ) : null}

          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-2xl"
              onClick={() => setIsColumnMenuOpen((current) => !current)}
            >
              <Columns3 className="size-4" />
              Columnas
            </Button>

            {isColumnMenuOpen ? (
              <div className="absolute z-20 mt-2 w-64 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-lg shadow-slate-200/40 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Columnas visibles
                </p>
                <div className="space-y-2">
                  {columns
                    .filter((column) => column.hideable !== false)
                    .map((column) => {
                      const columnKey = String(column.key);

                      return (
                        <label
                          key={columnKey}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                        >
                          <input
                            type="checkbox"
                            checked={visibleColumns.includes(columnKey)}
                            onChange={() => handleToggleColumn(columnKey)}
                            className="size-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          <span>{column.header}</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-2xl"
            onClick={handleExportExcel}
          >
            <Download className="size-4" />
            Exportar Excel
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-2xl"
            onClick={handleExportCsv}
          >
            <Download className="size-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {columns.some((column) => column.filterable) ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {columns
            .filter((column) => column.filterable)
            .map((column) => (
              <Input
                key={String(column.key)}
                value={columnFilters[String(column.key)] ?? ""}
                onChange={(event) =>
                  handleFilterChange(String(column.key), event.target.value)
                }
                placeholder={`Filtrar por ${column.header.toString().toLowerCase()}...`}
                className="h-10 rounded-2xl border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.03]"
              />
            ))}
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center rounded-[28px] border border-slate-200/80 bg-white/90 p-12 text-sm text-slate-500 dark:border-white/8 dark:bg-white/[0.03] dark:text-slate-400">
          <LoaderCircle className="mr-2 size-4 animate-spin" />
          Cargando datos...
        </div>
      ) : totalResults === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300/80 bg-white/80 p-10 text-center text-sm text-slate-500 dark:border-white/12 dark:bg-white/[0.03] dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className={cn("w-full min-w-[1180px]", tableClassName)}>
              <thead className="bg-slate-50/90 dark:bg-white/[0.04]">
                <tr className="text-left text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {activeColumns.map((column) => {
                    const isSorted = sortState.key === String(column.key);
                    const sortDirection = isSorted ? sortState.direction : null;

                    return (
                      <th
                        key={String(column.key)}
                        className={cn("px-4 py-3 font-semibold", column.className)}
                      >
                        <button
                          type="button"
                          className={cn(
                            "inline-flex items-center gap-2",
                            column.sortable ? "cursor-pointer" : "cursor-default",
                          )}
                          onClick={() =>
                            column.sortable ? handleSort(String(column.key)) : undefined
                          }
                        >
                          <span>{column.header}</span>
                          {column.sortable ? (
                            sortDirection === "asc" ? (
                              <ArrowUpAZ className="size-4" />
                            ) : sortDirection === "desc" ? (
                              <ArrowDownAZ className="size-4" />
                            ) : (
                              <ArrowUpAZ className="size-4 opacity-35" />
                            )
                          ) : null}
                        </button>
                      </th>
                    );
                  })}
                  {hasActions ? (
                    <th
                      className={cn(
                        "px-4 py-3 font-semibold whitespace-nowrap text-right min-w-[180px]",
                        actionsClassName,
                      )}
                    >
                      {actionsHeader}
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr
                    key={getRowKey(row)}
                    className="border-t border-slate-200/70 text-sm text-slate-700 dark:border-white/8 dark:text-slate-200"
                  >
                    {activeColumns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn("px-4 py-4", column.cellClassName)}
                      >
                        {column.render
                          ? column.render(row)
                          : String(getColumnValue(column, row) ?? "")}
                      </td>
                    ))}
                    {hasActions ? (
                      <td
                        className={cn(
                          "px-4 py-4 align-top min-w-[180px]",
                          actionsCellClassName,
                        )}
                      >
                        {rowActions(row)}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600 dark:border-white/8 dark:bg-white/[0.03] dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <p>
          Mostrando{" "}
          <span className="font-medium text-slate-950 dark:text-white">
            {totalResults === 0 ? 0 : (currentPageSafe - 1) * rowsPerPage + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium text-slate-950 dark:text-white">
            {Math.min(currentPageSafe * rowsPerPage, totalResults)}
          </span>{" "}
          de{" "}
          <span className="font-medium text-slate-950 dark:text-white">
            {totalResults}
          </span>{" "}
          resultados
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2">
            <span>Filas por página</span>
            <select
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
              className="h-10 rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
            >
              {[10, 25, 50, 100].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPageSafe <= 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            >
              Anterior
            </Button>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Página {currentPageSafe} de {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPageSafe >= totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
