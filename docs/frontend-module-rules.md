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
├── products/
├── sales/
├── inventory/
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

## 9. Reglas técnicas

- Usar TypeScript.
- Evitar archivos gigantes.
- No duplicar lógica.
- No mezclar lógica de negocio con presentación.
- No crear conexión real a API hasta que se indique.
- Mantener modo mock cuando corresponda.
- Mantener compatibilidad con Tailwind y shadcn/ui.
- Mantener textos en español.
- Mantener tildes correctamente.

## 10. Orden de desarrollo recomendado

1. POS
2. Productos
3. Ventas
4. Caja
5. Inventario
6. Clientes
7. Reportes
8. Configuración
