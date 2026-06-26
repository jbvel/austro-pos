# Reglas de diseño Austro POS

## 1. Identidad visual
- Sistema sobrio, moderno y profesional.
- Evitar diseños exagerados o decorativos sin función.
- Priorizar claridad operativa por sobre efectos visuales.

## 2. Tipografía
- Usar la fuente global: `Geist, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`.
- No definir fuentes distintas por componente.
- Mantener jerarquías tipográficas consistentes entre títulos, subtítulos y textos auxiliares.

## 3. Colores
- Azul para elementos activos y acciones principales.
- Verde para estados correctos o positivos.
- Amarillo o naranjo solo para advertencias.
- Rojo solo para errores, peligro o eliminación.
- No usar fondos rojizos o café para cards normales.

## 4. Modo oscuro
- Usar fondos gris/azul oscuro.
- Mantener cards neutras y sobrias.
- Usar bordes sutiles, no pesados.
- Priorizar alto contraste en textos importantes.
- Evitar sombras fuertes o brillos excesivos.

## 5. Componentes
- Reutilizar componentes existentes antes de crear otros nuevos.
- No duplicar cards, botones o layouts.
- Crear componentes pequeños cuando aparezca repetición.
- Mantener el layout privado separado del login.

## 6. Textos
- Todo el sistema debe estar en español.
- Usar tildes correctamente.
- Evitar textos largos en cards.
- Usar lenguaje simple, directo y operativo.

## 7. Estados de módulos
- Los módulos no implementados deben mostrarse como `PRONTO`.
- No simular funcionalidades que aún no existen.
- Las páginas placeholder deben ser claras y honestas sobre su estado.

## 8. Reglas técnicas visuales
- No mezclar lógica de negocio con diseño.
- No poner estilos excesivos directamente si ya existe una utilidad reutilizable.
- Mantener compatibilidad con Tailwind CSS y shadcn/ui.
- No romper responsive ni modo oscuro.
