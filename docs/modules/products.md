# Módulo Productos

## Objetivo

Definir el alcance inicial del Módulo Productos de Austro POS antes de su implementación.

## Contexto

- Sistema POS orientado a Chile.
- Moneda CLP.
- Formato de precios: `$12.500`.
- Textos en español chileno.
- No usar dólares.
- No implementar IVA todavía.
- No conectar backend.
- No tocar Laravel.

## Alcance inicial en modo mock/local

El módulo debe permitir:

- listar productos
- buscar productos
- crear producto
- editar producto
- activar/desactivar producto
- mostrar precio en CLP
- mostrar stock y stock mínimo
- marcar bajo stock

## Campos del producto

- `id`
- `name`
- `sku`
- `barcode`
- `category`
- `price`
- `cost`
- `stock`
- `min_stock`
- `is_active`
- `created_at`
- `updated_at`

## Reglas iniciales

- nombre requerido
- SKU requerido
- SKU único
- código de barras único si existe
- precio no puede ser negativo
- costo no puede ser negativo
- stock no puede ser negativo
- stock mínimo no puede ser negativo
- producto inactivo no se vende
- desactivar no elimina

## Estructura futura esperada

```text
src/modules/products/
├── components/
├── data/
├── hooks/
├── schemas/
├── types/
└── utils/
```

## Estructura técnica esperada

### Componentes

```text
src/modules/products/components/ProductsPage.tsx
src/modules/products/components/ProductSearch.tsx
src/modules/products/components/ProductTable.tsx
src/modules/products/components/ProductStatusBadge.tsx
src/modules/products/components/ProductForm.tsx
src/modules/products/components/ProductFormDialog.tsx
```

### Datos, hooks, schemas, tipos y utilidades

```text
src/modules/products/data/mock-products.ts
src/modules/products/hooks/useProducts.ts
src/modules/products/schemas/product.schema.ts
src/modules/products/types/product.ts
src/modules/products/utils/product-formatters.ts
```

## Regla para rutas en `src/app`

- Las rutas en `src/app` deben ser simples.
- `src/app/products/page.tsx` debe renderizar `ProductsPage`.
- No poner lógica pesada en `page.tsx`.
- No conectar API todavía.
- No tocar backend.
- No tocar Laravel.
- No mezclar todavía productos del POS con productos del módulo Products.

## Orden futuro de implementación

1. Tipos y datos mock
2. Schema Zod
3. Hook `useProducts`
4. Componentes visuales
5. Formulario crear/editar
6. Conectar `/products`
7. Prueba final

## Carga masiva de productos

El sistema Austro POS deberá soportar más adelante carga masiva de productos para comercios chilenos.

La carga masiva deberá permitir importar productos desde:

- Excel
- CSV

Campos mínimos esperados para carga masiva:

- `name`
- `sku`
- `barcode`
- `category`
- `price`
- `cost`
- `stock`
- `min_stock`
- `is_active`

Reglas futuras:

- Validar que SKU sea único.
- Validar que código de barras sea único si viene informado.
- Validar precios en CLP.
- Validar que precio no sea negativo.
- Validar que costo no sea negativo.
- Validar que stock no sea negativo.
- Validar que stock mínimo no sea negativo.
- Permitir descargar una plantilla de ejemplo.
- Mostrar errores por fila antes de importar.
- No importar filas inválidas sin confirmación.
- Permitir previsualizar los datos antes de guardar.
- No duplicar productos existentes sin advertencia.
- Más adelante esta funcionalidad debe conectarse con backend Laravel.

## Eliminación segura de productos

Editar:

- usar cuando el producto tiene datos corregibles
- nombre mal escrito
- precio incorrecto
- categoría incorrecta
- código de barras incorrecto
- stock mínimo incorrecto

Desactivar:

- usar cuando el producto existió o podría tener historial
- un producto inactivo no debe aparecer disponible para vender en el POS
- la desactivación no elimina historial

Eliminar:

- usar solo para productos mal creados o registros basura
- en modo mock/local se puede eliminar directamente del listado
- más adelante, con backend, solo se podrá eliminar si no tiene ventas asociadas, movimientos de inventario, compras asociadas, documentos tributarios o historial relevante
- si tiene historial, el backend deberá impedir eliminar y sugerir desactivar

## Notas de implementación futura

- El módulo comenzará en modo mock/local.
- Los montos deben mostrarse en CLP con formato chileno.
- La lógica visual debe respetar `docs/design-rules.md`.
- La estructura del módulo debe respetar `docs/frontend-module-rules.md`.

## Estado actual: módulo cerrado en frontend mock/local

El Módulo Productos queda cerrado en su versión frontend mock/local.

Funcionalidades implementadas:

- listado de productos mock
- filtros por columna
- `DataTable` reutilizable
- exportar Excel
- exportar CSV
- crear producto
- editar producto
- activar producto
- desactivar producto
- eliminar producto con `AlertDialog`
- categorías activas desde el mantenedor Categorías
- validaciones con Zod
- mensajes con Sonner
- formato CLP para precio y costo
- estados visuales `Activo`, `Inactivo` y `Bajo stock`

## Pendiente para futuras etapas

- backend Laravel
- base de datos real
- permisos por rol
- proveedores
- compras y abastecimiento
- carga masiva real
- integración con POS real
- stock persistente
