# Módulo Compras / Abastecimiento - Austro POS

## Objetivo

El módulo Compras / Abastecimiento permitirá registrar compras a proveedores y preparar el flujo futuro de ingreso de stock, costos de compra e historial de abastecimiento.

## Contexto

- Sistema POS orientado a Chile.
- Moneda CLP.
- Textos visibles en español chileno.
- No conectar backend todavía.
- No tocar Laravel.
- No implementar inventario real todavía.
- No implementar DTE/SII todavía.
- No implementar permisos reales todavía.

## Alcance inicial mock/local

Debe permitir:

- listar compras
- buscar compras
- crear compra
- editar compra mock si no está cerrada
- anular compra mock
- seleccionar proveedor
- agregar productos comprados
- registrar cantidad comprada
- registrar costo unitario
- calcular subtotal por producto
- calcular total de compra
- registrar fecha de compra
- registrar tipo de documento proveedor
- registrar número de documento proveedor
- preparar ingreso futuro de stock

## Estructura principal de datos

### Purchase

- id
- supplier_id
- supplier_name
- document_type
- document_number
- purchase_date
- status
- subtotal
- total
- notes
- created_at
- updated_at

### PurchaseItem

- id
- product_id
- product_name
- sku
- quantity
- unit_cost
- subtotal

## Tipos de documento proveedor iniciales

- Factura
- Boleta
- Guía de despacho
- Nota de venta
- Otro

## Estados iniciales

- draft: Borrador
- completed: Completada
- cancelled: Anulada

## Reglas iniciales

- Una compra debe tener proveedor.
- Una compra debe tener fecha.
- Una compra debe tener al menos un producto.
- La cantidad debe ser mayor a 0.
- El costo unitario no puede ser negativo.
- El total se calcula automáticamente.
- Una compra anulada no debe editarse.
- Una compra completada más adelante aumentará stock.
- En esta etapa mock/local todavía no modificar stock real.
- No conectar todavía con inventario persistente.

## Relación con otros módulos

Este módulo será clave porque conectará:

- Proveedores
- Productos
- Costos
- Stock
- Inventario
- Historial de abastecimiento

## Relación futura con Inventario

Más adelante, cuando una compra se complete:

- aumentará stock de los productos
- creará movimientos de inventario
- actualizará costo de compra
- quedará historial por proveedor

En esta etapa mock/local todavía no se debe modificar stock real ni persistir movimientos.

## Ejemplo futuro de compra

Proveedor: Distribuidora Sur
Documento: Factura N° 12345
Fecha: 26-06-2026

Productos:

- Coca Cola 1.5L, cantidad 50, costo unitario $1.600
- Arroz 1kg, cantidad 20, costo unitario $1.250

Total compra:
$105.000

Resultado futuro:

- se guarda la compra
- se aumenta stock
- se registra movimiento de inventario

## Estructura frontend esperada

```text
src/modules/purchases/
├── components/
├── data/
├── hooks/
├── schemas/
├── types/
└── utils/
```

## Ruta futura

`/purchases`

## Menú

Compras debe ser un módulo principal de Operación.

Ubicación sugerida en sidebar:

- Ventas
- Compras
- Inventario
- Caja

## Reglas técnicas para esta etapa

- No implementar código todavía.
- No crear componentes todavía.
- No modificar sidebar todavía.
- No conectar backend.
- No tocar Laravel.
- No conectar inventario persistente.
- No implementar DTE/SII todavía.

## Estado actual

El Módulo Compras queda cerrado en versión frontend mock/local.

Incluye:

- listado de compras mock
- DataTable reutilizable
- crear compra
- editar compra
- anular compra con AlertDialog
- eliminar compra borrador con AlertDialog
- selección de proveedor
- selección de productos
- cálculo de subtotales
- cálculo de total en CLP
- validaciones con Zod
- mensajes con Sonner
- ruta `/purchases`
- acceso desde sidebar

## Pendiente para futuras etapas

- backend Laravel
- base de datos real
- permisos por rol
- ingreso real de stock
- movimientos de inventario
- historial real por proveedor
- integración con módulo Inventario
- integración tributaria si corresponde
