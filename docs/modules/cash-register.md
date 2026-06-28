# Módulo Caja - Austro POS

## Objetivo

El módulo Caja permitirá controlar apertura, cierre, ingresos, egresos, ventas del día y cuadratura de caja en modo frontend mock/local.

## Contexto

- Sistema POS orientado a Chile.
- Moneda CLP.
- Textos visibles en español chileno.
- No conectar backend todavía.
- No tocar Laravel.
- No conectar todavía con POS real.
- No conectar todavía con Ventas reales.
- No implementar permisos reales todavía.

## Alcance inicial mock/local

Debe permitir:

- abrir caja
- registrar monto inicial
- ver estado de caja actual
- registrar ingreso manual
- registrar egreso manual
- ver movimientos de caja
- cerrar caja
- calcular caja esperada
- registrar caja contada
- calcular diferencia
- ver historial de cajas mock/local

## Estructura principal de datos

### CashRegisterSession

- id
- opened_at
- closed_at
- opening_amount
- expected_amount
- counted_amount
- difference
- status
- opened_by
- closed_by
- notes

### CashMovement

- id
- session_id
- type
- amount
- reason
- reference
- created_at
- created_by

## Tipos de movimiento

- opening: Apertura
- sale: Venta
- manual_income: Ingreso manual
- manual_expense: Egreso manual
- closing: Cierre

## Estados de caja

- open: Abierta
- closed: Cerrada

## Reglas iniciales

- Solo puede existir una caja abierta a la vez en modo mock/local.
- No se puede cerrar una caja que no está abierta.
- Para abrir caja se debe ingresar monto inicial.
- El monto inicial no puede ser negativo.
- Los ingresos aumentan la caja esperada.
- Los egresos disminuyen la caja esperada.
- Un egreso no puede ser negativo.
- Un ingreso no puede ser negativo.
- Para cerrar caja se debe ingresar monto contado.
- La diferencia se calcula:
  caja contada - caja esperada
- En esta etapa mock/local las ventas del POS todavía no impactan caja automáticamente.
- Más adelante, cada venta real deberá crear movimiento de caja si corresponde.

## Ejemplo de cálculo

Monto inicial: $50.000
Ventas efectivo: $120.000
Ingresos manuales: $10.000
Egresos manuales: $5.000
Caja esperada: $175.000
Caja contada: $173.000
Diferencia: -$2.000

## Relación futura con POS

Más adelante:

- No se podrá vender si no hay caja abierta.
- Las ventas en efectivo aumentarán caja.
- Las ventas con débito/crédito quedarán registradas por método de pago.
- El cierre de caja mostrará resumen por método de pago.

## Relación futura con Ventas

Más adelante:

- Caja tendrá resumen de ventas del turno.
- Caja tendrá total por vendedor.
- Caja tendrá total por método de pago.
- Caja tendrá historial de cierres.

## Estructura frontend esperada

```text
src/modules/cash-register/
├── components/
├── data/
├── hooks/
├── schemas/
├── types/
└── utils/
```

## Ruta futura

`/cash-register`

## Menú

Caja debe ser un módulo principal de Operación.

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
- No conectar POS real todavía.
- No conectar Ventas reales todavía.
