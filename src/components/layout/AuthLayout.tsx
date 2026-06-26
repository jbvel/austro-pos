import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <section className="hidden max-w-2xl lg:block">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
              Austro POS
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white">
                Controla ventas, caja e inventario desde una sola vista.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-slate-700 dark:text-slate-300">
                Una base administrativa clara, sobria y lista para crecer hacia
                un flujo POS completo.
              </p>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-sky-100/60 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="text-sm text-slate-600 dark:text-slate-300">Ventas</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">$0</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-sky-100/60 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="text-sm text-slate-600 dark:text-slate-300">Caja</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">$0</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-sky-100/60 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="text-sm text-slate-600 dark:text-slate-300">Stock critico</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">0</p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          {children}
        </div>
      </div>
    </main>
  );
}
