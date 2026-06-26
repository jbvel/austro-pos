# Módulo Mantenedores - Austro POS

## Objetivo

El módulo Mantenedores permite administrar datos maestros reutilizables por otros módulos del sistema.

## Mantenedores previstos

- Categorías de productos
- Marcas
- Unidades de medida
- Métodos de pago
- Sucursales / bodegas
- Usuarios y roles más adelante

## Entidades fuera de Mantenedores

`Proveedores` no debe tratarse como un mantenedor simple.

Aunque comparte datos maestros básicos, su alcance funcional es de negocio, porque más adelante se relacionará con:

- compras
- abastecimiento
- productos comprados
- costos de compra
- fechas de compra
- documentos de compra
- ingreso de stock
- historial de compras
- reportes

Por esta razón, `Proveedores` debe implementarse como módulo principal del sistema en una ruta propia, no dentro de Mantenedores.

Ruta futura sugerida:

`/suppliers`

Módulo futuro sugerido:

`src/modules/suppliers/`

## Primer mantenedor

Categorías de productos.

## Reglas generales

- Sistema orientado a Chile.
- Textos visibles en español chileno.
- No conectar backend todavía.
- No tocar Laravel.
- No implementar permisos reales todavía.
- Más adelante este módulo será restringido a Administrador.

## Alcance correcto de Mantenedores

Mantenedores debe concentrarse en datos maestros pequeños o características de apoyo para otros módulos.

Ejemplos correctos:

- Categorías
- Marcas
- Unidades de medida
- Métodos de pago
- Bodegas / sucursales
