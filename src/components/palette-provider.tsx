"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  DEFAULT_THEME_PALETTE,
  isThemePalette,
  PALETTE_STORAGE_KEY,
  type ThemePaletteId,
} from "@/modules/settings/lib/theme-palettes";

type PaletteContextValue = {
  palette: ThemePaletteId;
  setPalette: (palette: ThemePaletteId) => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);
const paletteListeners = new Set<() => void>();

function applyPalette(palette: ThemePaletteId) {
  document.documentElement.setAttribute("data-theme-palette", palette);
}

function subscribeToPalette(listener: () => void) {
  paletteListeners.add(listener);

  return () => {
    paletteListeners.delete(listener);
  };
}

function emitPaletteChange() {
  paletteListeners.forEach((listener) => listener());
}

function readPaletteSnapshot(): ThemePaletteId {
  if (typeof window === "undefined") {
    return DEFAULT_THEME_PALETTE;
  }

  const storedValue = window.localStorage.getItem(PALETTE_STORAGE_KEY);

  return storedValue && isThemePalette(storedValue)
    ? storedValue
    : DEFAULT_THEME_PALETTE;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const palette = useSyncExternalStore(
    subscribeToPalette,
    readPaletteSnapshot,
    () => DEFAULT_THEME_PALETTE,
  );

  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  function setPalette(nextPalette: ThemePaletteId) {
    applyPalette(nextPalette);
    window.localStorage.setItem(PALETTE_STORAGE_KEY, nextPalette);
    emitPaletteChange();
  }

  const value = useMemo(
    () => ({
      palette,
      setPalette,
    }),
    [palette],
  );

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);

  if (!context) {
    throw new Error("usePalette debe usarse dentro de PaletteProvider.");
  }

  return context;
}
