# Reglas de módulos frontend Austro POS

## 1. Objetivo

El frontend debe crecer por módulos funcionales, manteniendo el código separado, reutilizable y fácil de mantener.

## 2. Estructura recomendada por módulo

Cada módulo debe vivir dentro de:

`src/modules/`

Ejemplo:

```text
src/modules/
├── pos/
├── suppliers/
├── products/
├── purchases/
├── sales/
├── stock/
├── movements/
├── adjustments/
├── shrinkage/
├── customers/
├── cash-register/
├── reports/
└── settings/
```

Cada módulo puede tener esta estructura:

```text
src/modules/products/
├── components/
├── hooks/
├── services/
├── types/
├── schemas/
└── utils/
```

Uso esperado:

`components/`  
Componentes visuales propios del módulo.

`hooks/`  
Hooks específicos del módulo.

`services/`  
Funciones para comunicarse con API o manejar lógica externa.

`types/`  
Tipos TypeScript propios del módulo.

`schemas/`  
Validaciones Zod del módulo.

`utils/`  
Funciones auxiliares pequeñas del módulo.

## 3. Reglas para pages en app/

Las rutas dentro de `src/app/` deben ser simples.

Ejemplo:

`src/app/products/page.tsx`

Debe limitarse a renderizar una vista o componente principal del módulo.

Ejemplo esperado:

```tsx
import { ProductsPage } from "@/modules/products/components/ProductsPage";

export default function Page() {
  return <ProductsPage />;
}
```

Regla:  
No poner lógica pesada directamente en `page.tsx`.

## 4. Componentes compartidos

Los componentes reutilizables globales deben vivir en:

`src/components/`

Ejemplos:
- `layout`
- `ui`
- `shared`

Los componentes específicos de un módulo deben vivir dentro del módulo.

Ejemplo:  
`ProductTable` debe vivir en `src/modules/products/components/`  
No en `src/components/` si solo lo usa `Products`.

## 5. Servicios

Cada módulo debe tener sus propios `services` cuando se conecte con API.

Ejemplo:

`src/modules/products/services/products.service.ts`

Funciones esperadas:
- `getProducts()`
- `getProductById()`
- `createProduct()`
- `updateProduct()`
- `deleteProduct()`

No crear estos servicios todavía, solo documentar la regla.

## 6. Tipos

Los tipos globales deben estar en:

`src/types/`

Los tipos específicos deben estar dentro del módulo.

Ejemplo:  
`src/modules/products/types/product.ts`

## 7. Validaciones

Las validaciones con Zod específicas del módulo deben vivir en:

`src/modules/products/schemas/`

Ejemplo:  
`product.schema.ts`

## 8. Reglas de diseño

Cada módulo debe respetar:

`docs/design-rules.md`

No crear diseños visuales distintos para cada módulo.

## 9. Proveedores como módulo de negocio

`Proveedores` debe tratarse como módulo principal del sistema, no como mantenedor.

Ruta futura sugerida:

`/suppliers`

Ubicación futura:

`src/modules/suppliers/`

Justificación:

- una compra pertenece a un proveedor
- un proveedor puede tener muchas compras
- una compra tiene muchos productos
- una compra puede aumentar stock
- un producto puede tener un proveedor principal inicialmente
- más adelante un producto podría tener múltiples proveedores

Alcance esperado del módulo Proveedores:

- listar proveedores
- crear proveedor
- editar proveedor
- activar/desactivar proveedor
- eliminar proveedor solo si no tiene historial
- ver datos comerciales
- ver historial de compras
- relacionar proveedor con compras y abastecimiento

Campos futuros de proveedor:

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

No implementar todavía `Proveedores` ni la ruta `/suppliers` hasta que se indique.

## 10. Regla de tablas DataTable

Todas las tablas principales del sistema deben usar un componente reutilizable tipo `DataTable`.

Aplicará para:

- Productos
- Ventas
- Stock
- Movimientos
- Ajustes
- Mermas
- Clientes
- Caja
- Reportes
- Configuración

La `DataTable` debe quedar preparada para funcionalidades útiles en administración.

Funciones esperadas:

- columnas configurables
- búsqueda global
- filtros por columna
- ordenamiento por columna
- paginación
- selector de cantidad de filas por página
- exportar a Excel
- exportar a CSV si es simple de agregar
- mostrar/ocultar columnas
- acciones por fila
- estados visuales
- mensaje cuando no hay datos
- loading state
- responsive básico
- modo claro/oscuro
- textos en español chileno

`DataTable` debe vivir en:

`src/components/shared/DataTable.tsx`

Reglas:

- No duplicar tablas por módulo.
- No crear tablas HTML independientes si se puede usar `DataTable`.
- La lógica específica de cada módulo debe quedar fuera de `DataTable`.
- `DataTable` no debe conocer productos, ventas ni clientes.
- Las columnas deben ser configurables.
- Las acciones por fila deben venir desde el módulo.
- Los filtros específicos pueden ser configurados desde el módulo.
- La exportación debe usar los datos visibles o filtrados según se defina.
- Si una celda es específica del módulo, puede vivir dentro del módulo.
- No conectar backend todavía.
- No tocar Laravel.

Para el Módulo Productos:

- `ProductTable` debe usar `DataTable` internamente.

## 11. Propuesta de agrupación futura del menú

Principal:

- Dashboard
- POS

Gestión:

- Productos
- Clientes
- Proveedores

Operación:

- Compras
- Ventas
- Stock
- Movimientos
- Ajustes
- Mermas
- Caja

Mantenedores:

- Categorías
- Marcas
- Unidades de medida
- Bodegas / sucursales

Sistema:

- Reportes
- Configuración

Esta agrupación es una guía arquitectónica futura. No implica cambiar el sidebar actual todavía.

## 12. Reglas técnicas

- Usar TypeScript.
- Evitar archivos gigantes.
- No duplicar lógica.
- No mezclar lógica de negocio con presentación.
- No crear conexión real a API hasta que se indique.
- Mantener modo mock cuando corresponda.
- Mantener compatibilidad con Tailwind y shadcn/ui.
- Mantener textos en español.
- Mantener tildes correctamente.

## 13. Orden de desarrollo recomendado

1. POS
2. Productos
3. Ventas
4. Caja
5. Inventario
6. Clientes
7. Reportes
8. Configuración
