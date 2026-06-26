"use client";

import { useState } from "react";
import { PanelLeftOpen } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen w-full flex-col gap-6 px-3 py-3 sm:px-4 lg:flex-row lg:px-6 lg:py-4 2xl:px-8">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <PanelLeftOpen className="size-4" />
              Menu
            </Button>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
