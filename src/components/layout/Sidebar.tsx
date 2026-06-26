"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/layout/NavItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    label: "POS",
    href: "/pos",
    icon: ShoppingCart,
    enabled: true,
  },
  {
    label: "Productos",
    href: "/products",
    icon: Package,
    enabled: false,
  },
  {
    label: "Ventas",
    href: "/sales",
    icon: ReceiptText,
    enabled: false,
  },
  {
    label: "Inventario",
    href: "/inventory",
    icon: Boxes,
    enabled: false,
  },
  {
    label: "Clientes",
    href: "/customers",
    icon: Users,
    enabled: false,
  },
  {
    label: "Caja",
    href: "/cash-register",
    icon: CreditCard,
    enabled: false,
  },
  {
    label: "Reportes",
    href: "/reports",
    icon: BarChart3,
    enabled: false,
  },
  {
    label: "Configuración",
    href: "/settings",
    icon: Settings,
    enabled: false,
  },
];

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
      />
      <aside
        className={`fixed inset-y-3 left-3 z-50 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_20px_60px_-36px_rgba(93,135,255,0.45)] backdrop-blur transition-transform duration-200 dark:border-slate-700/70 dark:bg-[color-mix(in_oklch,var(--card)_98%,#04070d)] dark:shadow-[0_10px_24px_-20px_rgba(0,0,0,0.82)] lg:sticky lg:top-4 lg:z-auto lg:h-[calc(100vh-2rem)] lg:flex-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-[110%]"
        } ${collapsed ? "lg:w-[96px] xl:w-[104px]" : "lg:w-[292px] xl:w-[308px]"} lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
        <div className="mb-8 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#5d87ff_0%,#49beff_100%)] text-sm font-semibold text-white shadow-lg shadow-sky-200/80 dark:shadow-none dark:brightness-90">
                AP
              </div>
              {!collapsed ? (
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                    Austro POS
                  </p>
                  <p className="truncate text-sm text-slate-600 dark:text-slate-300">
                    Panel administrativo
                  </p>
                </div>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
              onClick={onCloseMobile}
              aria-label="Cerrar sidebar"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed ? <ThemeToggle /> : <div />}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              onClick={onToggleCollapse}
              aria-label={
                collapsed ? "Expandir sidebar" : "Colapsar sidebar"
              }
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </Button>
          </div>
        </div>

          <div
            className={`mb-4 flex items-center px-2 ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Navegación
              </p>
            ) : null}
            <ClipboardList className="size-4 text-slate-500 dark:text-slate-400" />
          </div>

          <nav className="flex-1 space-y-1.5">
            {navigationItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                enabled={item.enabled}
                collapsed={collapsed}
                isActive={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                }
              />
            ))}
          </nav>

          <div className="mt-7 rounded-2xl bg-slate-100/90 p-4 dark:border dark:border-slate-700/60 dark:bg-slate-900/60">
            {!collapsed ? (
              <>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  Entorno inicial listo
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  El dashboard ya puede crecer hacia POS, ventas e inventario.
                </p>
              </>
            ) : null}
            <div className={collapsed ? "flex justify-center" : ""}>
              <Button
                variant="outline"
                size={collapsed ? "icon-sm" : "default"}
                className={`mt-4 border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 ${
                  collapsed ? "" : "w-full"
                }`}
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                {collapsed ? <X className="size-4" /> : "Cerrar sesión"}
              </Button>
            </div>
            {collapsed ? (
              <div className="mt-4 flex justify-center">
                <ThemeToggle />
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
