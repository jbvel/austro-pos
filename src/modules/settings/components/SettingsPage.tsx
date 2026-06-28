import { Header } from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemePaletteSelector } from "@/modules/settings/components/ThemePaletteSelector";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <Header
        badge="Sistema"
        title="Configuración"
        description="Administra parámetros generales y personaliza la apariencia del sistema."
      />

      <Card className="border border-slate-200/80 bg-white/95 py-0 shadow-sm shadow-slate-200/45 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0c1421)] dark:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.7)]">
        <CardHeader className="space-y-2 p-5">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Apariencia
          </CardTitle>
          <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
            Personaliza la paleta visual del sistema con combinaciones predefinidas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-5 pt-0">
          <ThemePaletteSelector />
        </CardContent>
      </Card>
    </div>
  );
}
