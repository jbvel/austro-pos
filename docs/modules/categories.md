# Mantenedor de Categorías - Austro POS

## Objetivo

Permitir administrar categorías de productos para evitar escribir categorías manualmente en cada producto.

## Alcance inicial mock/local

Debe permitir:

- listar categorías
- buscar categorías
- crear categoría
- editar categoría
- activar/desactivar categoría
- eliminar categoría mock/local si fue creada por error

## Campos

Category:

- `id`
- `name`
- `description`
- `is_active`
- `created_at`
- `updated_at`

## Reglas iniciales

- El nombre es obligatorio.
- El nombre debe ser único.
- Una categoría inactiva no debería usarse para nuevos productos.
- Desactivar no elimina historial.
- Eliminar se usará solo para categorías creadas por error.
- Más adelante, backend deberá impedir eliminar una categoría si tiene productos asociados.

## Relación futura con Productos

Más adelante, el formulario de Productos debe usar las categorías activas desde este mantenedor.

Por ahora:

- No conectar todavía Productos con Categorías.
- No modificar `ProductForm` todavía para usar categorías.
- Primero crear el mantenedor de Categorías aislado.

## Permisos futuros

Más adelante, Categorías será administrado solo por usuarios Administrador.

No implementar permisos reales todavía.
