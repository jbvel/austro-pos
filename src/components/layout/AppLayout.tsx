"use client";

import { useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((current) => !current)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[1px] md:hidden"
          aria-label="Cerrar menú lateral"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <main
        className={`min-h-screen transition-[padding] duration-300 ease-out ${
          collapsed ? "md:pl-[7rem]" : "md:pl-[18.5rem]"
        }`}
      >
        <div className="flex min-h-screen w-full flex-col gap-4 px-3 py-3 sm:px-4 lg:px-6 lg:py-5 2xl:px-8">
          <div className="flex md:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-xl border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú lateral"
            >
              <PanelLeft className="size-4" />
            </Button>
          </div>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
