export const PALETTE_STORAGE_KEY = "austro_pos_palette";

export const themePalettes = [
  {
    id: "blue",
    name: "Azul Austro",
    preview: ["#5d87ff", "#49beff", "#d8ebff"],
  },
  {
    id: "green",
    name: "Verde Comercio",
    preview: ["#1f9d75", "#34d399", "#d6f7ea"],
  },
  {
    id: "purple",
    name: "Morado Pro",
    preview: ["#7c3aed", "#a855f7", "#eadcff"],
  },
  {
    id: "orange",
    name: "Naranjo Tienda",
    preview: ["#ea580c", "#fb923c", "#ffe6cf"],
  },
  {
    id: "gray",
    name: "Gris Ejecutivo",
    preview: ["#475569", "#64748b", "#dbe2ea"],
  },
] as const;

export type ThemePaletteId = (typeof themePalettes)[number]["id"];

export const DEFAULT_THEME_PALETTE: ThemePaletteId = "blue";

export function isThemePalette(value: string): value is ThemePaletteId {
  return themePalettes.some((palette) => palette.id === value);
}
