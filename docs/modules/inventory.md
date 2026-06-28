# Módulo Inventario - Austro POS

## Objetivo

El módulo Inventario permite controlar stock, movimientos, ajustes y mermas en modo frontend mock/local.

## Alcance actual

El Módulo Inventario queda cerrado en versión frontend mock/local.

Incluye:
- listado de inventario mock
- DataTable reutilizable
- métricas de stock
- estados de stock
- historial de movimientos mock
- registro de movimientos mock/local
- entrada de stock
- salida de stock
- ajuste manual
- merma
- devolución
- validaciones con Zod
- mensajes con Sonner
- ruta `/inventory`
- acceso desde sidebar

## Tipos principales

### InventoryItem

- `id`
- `product_id`
- `product_name`
- `sku`
- `category`
- `current_stock`
- `min_stock`
- `unit_cost`
- `total_cost`
- `status`
- `is_active`
- `updated_at`

### InventoryMovement

- `id`
- `product_id`
- `product_name`
- `sku`
- `movement_type`
- `quantity`
- `previous_stock`
- `new_stock`
- `reason`
- `reference`
- `created_at`

## Tipos de movimiento

- `purchase_entry`: Entrada por compra
- `sale_exit`: Salida por venta
- `manual_adjustment`: Ajuste manual
- `waste`: Merma
- `return_entry`: Devolución
- `other`: Otro

## Estados de stock

- `normal`: stock por sobre el mínimo
- `low_stock`: stock igual o menor al mínimo
- `out_of_stock`: sin stock
- `inactive`: producto inactivo

## Reglas actuales de negocio

- No permitir cantidad menor o igual a `0`.
- No permitir motivo vacío.
- No permitir producto vacío.
- No permitir salida mayor al stock disponible.
- No permitir merma mayor al stock disponible.
- No permitir stock negativo.
- Cada movimiento válido actualiza stock, valor total y estado del producto.
- Cada movimiento válido se agrega al historial mock/local.
- Los cambios no son persistentes al recargar.

## Estructura actual

```text
src/modules/inventory/
├── components/
├── data/
├── hooks/
├── schemas/
├── types/
└── utils/
```

## Componentes actuales

- `InventoryPage`
- `InventoryTable`
- `InventoryStatusBadge`
- `InventoryMovementsTable`
- `InventoryMovementTypeBadge`
- `InventoryMovementForm`
- `InventoryMovementFormDialog`

## Reglas técnicas vigentes

- No conectar API todavía.
- No tocar backend Laravel.
- No modificar stock real persistente.
- No conectar Inventario con Compras todavía.
- No conectar Inventario con POS/Ventas todavía.
- Mantener textos en español chileno.
- Mantener montos en CLP.

## Pendientes para futuras etapas

- backend Laravel
- base de datos real
- permisos por rol
- conexión real con Compras
- conexión real con POS/Ventas
- movimientos persistentes
- stock real
- bodegas/sucursales
- auditoría de inventario
