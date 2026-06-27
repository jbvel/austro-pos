import type {
  Purchase,
  PurchaseDocumentTypeOption,
  PurchaseItem,
  PurchaseStatusOption,
} from "@/modules/purchases/types/purchase";
import {
  calculatePurchaseItemSubtotal,
  calculatePurchaseSubtotal,
  calculatePurchaseTotal,
} from "@/modules/purchases/utils/purchase-calculations";

function createPurchaseItem(item: Omit<PurchaseItem, "subtotal">): PurchaseItem {
  return {
    ...item,
    subtotal: calculatePurchaseItemSubtotal(item.quantity, item.unit_cost),
  };
}

export const mockPurchaseDocumentTypes: PurchaseDocumentTypeOption[] = [
  { id: "invoice", label: "Factura" },
  { id: "receipt", label: "Boleta" },
  { id: "dispatch_guide", label: "Guía de despacho" },
  { id: "sale_note", label: "Nota de venta" },
  { id: "other", label: "Otro" },
];

export const mockPurchaseStatuses: PurchaseStatusOption[] = [
  { id: "draft", label: "Borrador" },
  { id: "completed", label: "Completada" },
  { id: "cancelled", label: "Anulada" },
];

const purchaseOneItems: PurchaseItem[] = [
  createPurchaseItem({
    id: 1,
    product_id: 1,
    product_name: "Coca Cola 1.5L",
    sku: "BEB-001",
    quantity: 50,
    unit_cost: 1600,
  }),
  createPurchaseItem({
    id: 2,
    product_id: 4,
    product_name: "Arroz 1kg",
    sku: "ABA-001",
    quantity: 20,
    unit_cost: 1250,
  }),
];

const purchaseTwoItems: PurchaseItem[] = [
  createPurchaseItem({
    id: 3,
    product_id: 2,
    product_name: "Pan amasado",
    sku: "PAN-001",
    quantity: 100,
    unit_cost: 250,
  }),
  createPurchaseItem({
    id: 4,
    product_id: 5,
    product_name: "Café instantáneo",
    sku: "ABA-002",
    quantity: 12,
    unit_cost: 3300,
  }),
];

const purchaseThreeItems: PurchaseItem[] = [
  createPurchaseItem({
    id: 5,
    product_id: 6,
    product_name: "Detergente 1L",
    sku: "LIM-001",
    quantity: 10,
    unit_cost: 2400,
  }),
];

const purchaseOneSubtotal = calculatePurchaseSubtotal(purchaseOneItems);
const purchaseTwoSubtotal = calculatePurchaseSubtotal(purchaseTwoItems);
const purchaseThreeSubtotal = calculatePurchaseSubtotal(purchaseThreeItems);

export const mockPurchases: Purchase[] = [
  {
    id: 1,
    supplier_id: 1,
    supplier_name: "Distribuidora Sur",
    document_type: "invoice",
    document_number: "12345",
    purchase_date: "2026-06-20",
    status: "completed",
    items: purchaseOneItems,
    subtotal: purchaseOneSubtotal,
    total: calculatePurchaseTotal(purchaseOneSubtotal),
    notes: "Compra de reposición de abarrotes y bebidas.",
    created_at: "2026-06-20T10:15:00.000Z",
    updated_at: "2026-06-20T10:15:00.000Z",
  },
  {
    id: 2,
    supplier_id: 2,
    supplier_name: "Comercial Patagonia",
    document_type: "dispatch_guide",
    document_number: "GD-889",
    purchase_date: "2026-06-22",
    status: "draft",
    items: purchaseTwoItems,
    subtotal: purchaseTwoSubtotal,
    total: calculatePurchaseTotal(purchaseTwoSubtotal),
    notes: "Pendiente de revisión antes de completar.",
    created_at: "2026-06-22T14:30:00.000Z",
    updated_at: "2026-06-22T16:00:00.000Z",
  },
  {
    id: 3,
    supplier_id: 4,
    supplier_name: "Limpieza Total",
    document_type: "sale_note",
    document_number: "NV-1001",
    purchase_date: "2026-06-23",
    status: "cancelled",
    items: purchaseThreeItems,
    subtotal: purchaseThreeSubtotal,
    total: calculatePurchaseTotal(purchaseThreeSubtotal),
    notes: "Compra anulada por error en la carga del documento.",
    created_at: "2026-06-23T09:45:00.000Z",
    updated_at: "2026-06-23T11:10:00.000Z",
  },
];
