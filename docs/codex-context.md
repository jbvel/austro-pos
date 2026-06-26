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
- Ventas
- Inventario
- Clientes
- Caja
- Reportes
- Configuración

POS ya está en desarrollo, por lo tanto no debería mostrarse como PRONTO si funciona.

## Arquitectura frontend

Los módulos deben vivir en:

src/modules/

Las páginas en src/app deben ser simples y renderizar componentes del módulo.

Ejemplo:

src/app/pos/page.tsx debe renderizar PosPage desde src/modules/pos/components/PosPage.tsx

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