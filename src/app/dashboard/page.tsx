"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/Header";

const dashboardCards = [
  {
    title: "Ventas de hoy",
    value: "$0",
  },
  {
    title: "Caja actual",
    value: "$0",
  },
  {
    title: "Productos con bajo stock",
    value: "0",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Header
        badge="Resumen diario"
        title="Dashboard"
        description="Bienvenido a Austro POS. Este panel inicial resume el estado base del negocio mientras construimos los modulos operativos."
        action={
          <Button
            variant="secondary"
            className="bg-white text-sky-700 hover:bg-sky-50 dark:bg-white/8 dark:text-white/90 dark:hover:bg-white/14"
          >
            Sistema activo
          </Button>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <Card className="border border-sky-100/70 bg-white/95 shadow-sm shadow-sky-100/60 dark:border-sky-400/12 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0b1220)] dark:shadow-[0_10px_26px_-18px_rgba(0,0,0,0.6)]">
          <CardHeader className="space-y-2">
            <CardDescription className="text-sm uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300/85">
              Operacion
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Bienvenido a Austro POS
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Sesiones listas</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">1</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Estado del sistema</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">
                OK
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Modo</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                Mock
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/50 dark:border-white/8 dark:bg-[color-mix(in_oklch,var(--card)_90%,#0a1019)] dark:shadow-[0_10px_24px_-18px_rgba(0,0,0,0.58)]">
          <CardHeader className="space-y-1">
            <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
              Estado general
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Inicio estable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              La autenticacion, proteccion de rutas y dashboard base ya estan
              listos para seguir con ventas, inventario y caja.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <Card
            key={card.title}
            className="border border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/50 dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_96%,black)] dark:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.7)]"
          >
            <CardHeader className="space-y-1">
              <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
                {card.title}
              </CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {card.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Indicador base para el tablero inicial del sistema.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
