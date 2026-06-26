# Módulo Proveedores

## Objetivo

Definir el alcance inicial del Módulo Proveedores de Austro POS antes de su implementación.

## Contexto

- Sistema POS orientado a Chile.
- Moneda CLP.
- Textos visibles en español chileno.
- No conectar backend.
- No tocar Laravel.
- No implementar compras todavía.
- No implementar inventario todavía.
- No implementar permisos reales todavía.

## Naturaleza del módulo

`Proveedores` no es un mantenedor simple.

`Proveedores` es un módulo de negocio porque más adelante se relacionará con:

- compras
- abastecimiento
- productos
- costos
- inventario
- historial de compras
- reportes

Por esta razón, debe vivir como módulo principal del sistema y no dentro de Mantenedores.

## Alcance inicial en modo mock/local

El módulo debe permitir:

- listar proveedores
- buscar proveedores
- crear proveedor
- editar proveedor
- activar/desactivar proveedor
- eliminar proveedor mock/local si fue creado por error
- ver datos comerciales básicos
- preparar relación futura con compras y abastecimiento

## Campos del proveedor

Supplier:

- `id`
- `name`
- `rut`
- `business_name`
- `giro`
- `contact_name`
- `phone`
- `email`
- `address`
- `commune`
- `city`
- `is_active`
- `created_at`
- `updated_at`

## Descripción de campos

- `name`: nombre comercial o nombre corto del proveedor
- `rut`: RUT del proveedor
- `business_name`: razón social
- `giro`: giro comercial
- `contact_name`: persona de contacto
- `phone`: teléfono
- `email`: correo
- `address`: dirección
- `commune`: comuna
- `city`: ciudad
- `is_active`: indica si el proveedor está disponible para compras futuras

## Reglas iniciales

- `name` es obligatorio
- `rut` es opcional por ahora
- `business_name` es opcional por ahora
- `email` debe tener formato válido si se informa
- teléfono es opcional
- proveedor inactivo no debería usarse para nuevas compras
- desactivar no elimina historial
- eliminar solo debe usarse para proveedores creados por error
- más adelante, backend debe impedir eliminar proveedores con compras asociadas

## Relación futura con Compras

Más adelante el módulo Compras permitirá:

- seleccionar proveedor
- registrar fecha de compra
- registrar documento de compra
- agregar productos comprados
- registrar cantidad
- registrar costo unitario
- calcular total de compra
- aumentar stock
- guardar historial de abastecimiento

### Ejemplo futuro

Proveedor: `Distribuidora Sur`  
Fecha compra: `26-06-2026`  
Documento: `Factura proveedor N° 12345`

Productos:

- `Coca Cola 1.5L`, 50 unidades, costo `$1.600`
- `Arroz 1kg`, 20 unidades, costo `$1.250`

Resultado esperado:

- se registra compra
- se aumenta stock
- se guarda historial de costo

## Estructura futura esperada

```text
src/modules/suppliers/
├── components/
├── data/
├── hooks/
├── schemas/
├── types/
└── utils/
```

## Ruta futura

`/suppliers`

## Ubicación futura en menú

`Proveedores` debe estar como módulo principal del sistema, no dentro de Mantenedores.

Ubicación sugerida en sidebar:

Gestión:

- Productos
- Clientes
- Proveedores

## Notas de implementación futura

- El módulo comenzará en modo mock/local.
- La lógica visual debe respetar `docs/design-rules.md`.
- La estructura del módulo debe respetar `docs/frontend-module-rules.md`.
- No implementar backend hasta que se indique.
- No conectar todavía Proveedores con Compras, Inventario ni Productos reales.
