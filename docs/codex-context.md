# Contexto Codex - Austro POS

Austro POS es un sistema POS tipo Bsale orientado a Chile.

## Stack

Frontend:
- Next.js con App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Tipografía global: Geist, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif

Backend futuro:
- Laravel API
- PostgreSQL
- Se trabajará por módulos
- Aún no tocar backend

## Reglas generales

- Sistema orientado a Chile
- Moneda CLP
- Formato de montos: $12.500
- Textos en español chileno
- No usar dólares
- No usar taxes
- No implementar IVA todavía
- No implementar SII todavía
- No implementar boleta/factura todavía
- No implementar impresora real todavía
- No conectar API todavía

## Login

Login mock implementado.

Credenciales:

email: admin@austropos.cl  
password: admin123

Cookie de sesión:

austro_pos_token

Debe funcionar:
- /login
- /dashboard protegido
- logout
- middleware de rutas privadas

## Layout privado

Ya existe:
- Sidebar
- Dashboard
- Modo claro/oscuro
- Rutas privadas placeholder

Menú:
- Dashboard
- POS
- Productos
- Compras
- Ventas
- Stock
- Movimientos
- Ajustes
- Mermas
- Proveedores
- Clientes
- Caja
- Reportes
- Configuración

POS ya está en desarrollo, por lo tanto no debería mostrarse como PRONTO si funciona.

## Decisión arquitectónica: Proveedores

`Proveedores` no debe tratarse como un mantenedor simple.

Debe considerarse un módulo principal del sistema porque se relacionará más adelante con:

- compras
- abastecimiento
- productos comprados
- costos de compra
- fechas de compra
- documentos de compra
- ingreso de stock
- historial de compras
- reportes

Ruta futura sugerida:

`/suppliers`

Ubicación futura del módulo:

`src/modules/suppliers/`

Relación futura esperada:

- una compra pertenece a un proveedor
- un proveedor puede tener muchas compras
- una compra tiene muchos productos
- una compra puede aumentar stock
- un producto puede tener un proveedor principal inicialmente
- más adelante un producto podría tener múltiples proveedores

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

No implementar todavía `Proveedores`, `/suppliers` ni cambios de sidebar reales. Primero seguimos afinando Productos y Categorías.

## Arquitectura frontend

Los módulos deben vivir en:

src/modules/

Las páginas en src/app deben ser simples y renderizar componentes del módulo.

Ejemplo:

src/app/pos/page.tsx debe renderizar PosPage desde src/modules/pos/components/PosPage.tsx

Agrupación futura sugerida del menú:

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

## POS

El módulo POS mock/local está en desarrollo.

Estructura esperada:

src/modules/pos/
- components/
- hooks/
- data/
- types/
- utils/

Archivos esperados:
- types/pos.ts
- data/mock-products.ts
- data/mock-payment-methods.ts
- utils/pos-calculations.ts
- hooks/usePosCart.ts
- components/PosPage.tsx
- components/ProductSearch.tsx
- components/ProductGrid.tsx
- components/ProductCard.tsx
- components/CartPanel.tsx
- components/CartItem.tsx
- components/PaymentSelector.tsx

## POS debe permitir

- Buscar producto por nombre, SKU, código de barras o categoría
- Agregar producto activo al carrito
- Bloquear producto inactivo
- Aumentar/disminuir cantidad
- Quitar producto
- No superar stock
- Seleccionar método de pago
- Finalizar venta mock
- Limpiar carrito
- Mostrar montos en CLP

Métodos de pago:
- Efectivo
- Débito
- Crédito
- Transferencia
- Mercado Pago
- Otro

## Pendiente inmediato

Agregar vuelto para pago en efectivo.

Cuando método de pago sea Efectivo:
- mostrar campo “Monto recibido”
- calcular vuelto automáticamente
- no permitir finalizar si el monto recibido es menor al total

Ejemplo:

Total: $12.500  
Monto recibido: $20.000  
Vuelto: $7.500

Si el monto recibido es menor al total, mostrar:

El monto recibido es menor al total.

Cuando el método de pago no sea efectivo:
- no mostrar monto recibido
- no mostrar vuelto
- no exigir monto recibido

## Próximo prompt

Prompt 23: Agregar cálculo de vuelto para pago en efectivo en POS.

## Estado actual actualizado

Módulos cerrados:

- Módulo 1: Login, dashboard, layout privado y sidebar.
- Módulo 2: POS frontend mock/local.
- Módulo 3: Productos frontend mock/local.

El POS mock incluye:
- productos mock
- búsqueda por nombre, SKU, código de barras y categoría
- carrito local
- control de cantidades
- validación de stock disponible
- métodos de pago
- cálculo de vuelto para efectivo
- formato CLP
- finalización de venta mock

Arquitectura operativa de inventario definida:
- `Stock`: existencia actual por producto
- `Movimientos`: historial de entradas y salidas
- `Ajustes`: correcciones manuales
- `Mermas`: pérdidas, roturas y vencimientos
- limpieza del carrito al finalizar

El stock no se descuenta de forma persistente porque aún no existe backend, base de datos ni productos reales.

## Reglas para el Módulo Productos

- Sistema orientado a Chile.
- Moneda CLP.
- Formato de precios: $12.500.
- Textos visibles en español chileno.
- No usar dólares.
- No implementar IVA todavía.
- No conectar backend.
- No tocar Laravel.
- No mezclar todavía productos del POS con productos del módulo Products.

## Productos cerrados en frontend mock/local

El Módulo Productos ya quedó cerrado en su versión frontend mock/local.

Incluye:

- listado de productos mock
- filtros por columna
- `DataTable` reutilizable
- exportar Excel y CSV
- crear producto
- editar producto
- activar y desactivar producto
- eliminar producto con `AlertDialog`
- categorías activas desde el mantenedor Categorías
- validaciones con Zod
- mensajes con Sonner
- formato CLP

## Pendiente futuro de Productos

- backend Laravel
- base de datos real
- permisos por rol
- proveedores
- compras y abastecimiento
- carga masiva real
- integración con POS real
- stock persistente

## Pendiente futuro: roles y permisos en Productos

El Módulo Productos tendrá acciones restringidas por perfil.

Las acciones sensibles deben ser solo para Administrador:
- crear productos
- editar productos
- activar productos
- desactivar productos
- eliminar productos
- carga masiva de productos
- administración de categorías

Los usuarios tipo Cajero no deben administrar productos.
El Cajero solo debe poder usar productos desde el POS para vender.

Esta restricción se implementará más adelante cuando se trabaje el módulo de roles, perfiles y permisos.

Por ahora no implementar permisos reales.
Solo dejar la regla documentada.
