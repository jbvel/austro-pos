# Módulo Configuración - Austro POS

## Paletas de colores

- Las paletas visuales del sistema son predefinidas.
- No se permite selección libre de colores todavía.
- La aplicación de la paleta se hace mediante variables CSS globales.
- La selección se guarda en `localStorage` por ahora.
- Más adelante la paleta podrá guardarse por empresa en backend.
- No se deben alterar los colores semánticos del sistema:
  - rojo para error, peligro o eliminación
  - verde para éxito
  - amarillo o naranjo para advertencia

## Paletas iniciales

- Azul Austro
- Verde Comercio
- Morado Pro
- Naranjo Tienda
- Gris Ejecutivo

## Alcance actual

- selector visual desde `/settings`
- persistencia en `localStorage`
- aplicación global sobre claro y oscuro
- sin impacto en lógica de negocio
- cinco paletas disponibles:
  - Azul Austro
  - Verde Comercio
  - Morado Pro
  - Naranjo Tienda
  - Gris Ejecutivo
- aplicación mediante variables CSS globales

## Estado actual

- La configuración de Apariencia permite seleccionar paletas visuales predefinidas en modo frontend/local.
- La selección persiste en `localStorage` con la clave `austro_pos_palette`.
- La paleta se aplica mediante variables CSS globales en modo claro y oscuro.

## Pendiente futuro

- guardar la paleta por empresa en backend
- logo del negocio
- nombre comercial
- configuración visual multiempresa
