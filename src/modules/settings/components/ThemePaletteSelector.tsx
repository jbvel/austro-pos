"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePalette } from "@/components/palette-provider";
import {
  themePalettes,
  type ThemePaletteId,
} from "@/modules/settings/lib/theme-palettes";

function PalettePreview({
  colors,
  isSelected,
}: {
  colors: readonly string[];
  isSelected: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <span
          key={color}
          className={`size-4 rounded-full border border-white/70 shadow-sm dark:border-white/10 ${
            isSelected ? "ring-2 ring-primary/35 ring-offset-2 ring-offset-background" : ""
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function SelectPaletteButton({
  paletteId,
  isSelected,
  onSelect,
}: {
  paletteId: ThemePaletteId;
  isSelected: boolean;
  onSelect: (paletteId: ThemePaletteId) => void;
}) {
  return (
    <Button
      type="button"
      variant={isSelected ? "default" : "outline"}
      className="h-10 rounded-2xl px-4"
      onClick={() => onSelect(paletteId)}
      aria-pressed={isSelected}
    >
      {isSelected ? <Check className="size-4" /> : null}
      {isSelected ? "Seleccionada" : "Seleccionar"}
    </Button>
  );
}

export function ThemePaletteSelector() {
  const { palette, setPalette } = usePalette();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {themePalettes.map((paletteOption) => {
        const isSelected = palette === paletteOption.id;

        return (
          <div
            key={paletteOption.id}
            className={`rounded-[24px] border p-4 transition-colors ${
              isSelected
                ? "border-primary/30 bg-primary/5"
                : "border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/[0.03]"
            }`}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                    {paletteOption.name}
                  </p>
                  {isSelected ? (
                    <span className="inline-flex rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      Activa
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Paleta visual predefinida para todo el sistema.
                </p>
              </div>

              <PalettePreview
                colors={paletteOption.preview}
                isSelected={isSelected}
              />

              <SelectPaletteButton
                paletteId={paletteOption.id}
                isSelected={isSelected}
                onSelect={setPalette}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
