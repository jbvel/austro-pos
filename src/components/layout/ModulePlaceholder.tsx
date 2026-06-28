import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/Header";

type ModulePlaceholderProps = {
  title: string;
  description: string;
  statusLabel?: string;
};

export function ModulePlaceholder({
  title,
  description,
  statusLabel = "Preparado para desarrollo",
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-6">
      <Header
        badge="Módulo"
        title={title}
        description={description}
        action={
          <Button
            variant="secondary"
            className="bg-white text-primary hover:bg-primary/8 dark:bg-white/8 dark:text-white/90 dark:hover:bg-white/14"
          >
            {statusLabel}
          </Button>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <Card className="border border-primary/12 bg-white/95 shadow-sm shadow-[0_10px_24px_-18px_var(--brand-shadow-soft)] dark:border-primary/12 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0b1220)] dark:shadow-[0_10px_26px_-18px_rgba(0,0,0,0.6)]">
          <CardHeader className="space-y-2">
            <CardDescription className="text-sm uppercase tracking-[0.16em] text-primary/90 dark:text-primary/85">
              Estado del módulo
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {title} listo para crecer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Esta pantalla ya existe dentro del layout privado y puede recibir
              logica real, tablas, formularios y conexiones API en la siguiente
              etapa de desarrollo.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/10 bg-primary/[0.045] p-4 dark:border-primary/10 dark:bg-primary/[0.08]">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Vista
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  Base
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-4 dark:border-emerald-500/12 dark:bg-emerald-500/[0.07]">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Estado
                </p>
                <p className="mt-2 text-2xl font-semibold text-emerald-600">
                  Lista
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-primary/[0.045] p-4 dark:border-primary/10 dark:bg-primary/[0.08]">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Integración
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  Pendiente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/50 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0a1019)] dark:shadow-[0_10px_24px_-18px_rgba(0,0,0,0.58)]">
          <CardHeader className="space-y-1">
            <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
              Siguiente etapa
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Implementacion futura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Aquí desarrollaremos la funcionalidad real del módulo, manteniendo
              el shell administrativo, protección de rutas y coherencia visual
              ya definidos para Austro POS.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
