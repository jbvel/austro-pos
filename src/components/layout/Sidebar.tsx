"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Building2,
  Boxes,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ListTree,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  ShoppingBasket,
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
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, enabled: true },
  { label: "POS", href: "/pos", icon: ShoppingCart, enabled: true },
  { label: "Productos", href: "/products", icon: Package, enabled: true },
  { label: "Proveedores", href: "/suppliers", icon: Building2, enabled: true },
  { label: "Clientes", href: "/customers", icon: Users, enabled: false },
  { label: "Caja", href: "/cash-register", icon: CreditCard, enabled: false },
  { label: "Ventas", href: "/sales", icon: ReceiptText, enabled: false },
  { label: "Compras", href: "/purchases", icon: ShoppingBasket, enabled: true },
  { label: "Inventario", href: "/inventory", icon: Boxes, enabled: false },
  { label: "Reportes", href: "/reports", icon: BarChart3, enabled: false },
  { label: "Configuración", href: "/settings", icon: Settings, enabled: false },
];

const maintainerItems = [
  { label: "Categorías", href: "/maintainers/categories", icon: ListTree, enabled: true },
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
    onCloseMobile();
    logout();
    router.push("/login");
  }

  function handleNavigate() {
    onCloseMobile();
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 p-3 transition-transform duration-300 ease-out md:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_20px_60px_-36px_rgba(93,135,255,0.28)] backdrop-blur dark:border-slate-700/70 dark:bg-[color-mix(in_oklch,var(--card)_98%,#04070d)] dark:shadow-[0_12px_28px_-24px_rgba(0,0,0,0.72)] ${
          collapsed ? "w-20 px-2.5 py-4" : "w-64 px-4 py-5"
        }`}
      >
        <div className="space-y-5">
          <div
            className={`flex min-h-11 items-start ${
              collapsed ? "justify-center" : "justify-between gap-3"
            }`}
          >
            <div
              className={`flex min-w-0 items-center ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
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
          </div>

          <div
            className={`flex min-h-10 items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed ? <ThemeToggle /> : <div />}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              onClick={onToggleCollapse}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="my-5 h-px bg-slate-200/80 dark:bg-white/8" />

        <div className="flex-1 overflow-y-auto">
          <div
            className={`mb-3 flex items-center px-2 ${
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

          <nav className="space-y-1.5 pr-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                enabled={item.enabled}
                collapsed={collapsed}
                onClick={handleNavigate}
                isActive={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                }
              />
            ))}

            <div className={`pt-5 ${collapsed ? "space-y-2" : "space-y-3"}`}>
              <div
                className={`flex items-center px-2 ${
                  collapsed ? "justify-center" : "justify-between"
                }`}
              >
                {!collapsed ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Mantenedores
                  </p>
                ) : null}
                <ListTree className="size-4 text-slate-500 dark:text-slate-400" />
              </div>

              <div className="space-y-1.5">
                {maintainerItems.map((item) => (
                  <NavItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    enabled={item.enabled}
                    collapsed={collapsed}
                    onClick={handleNavigate}
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                    }
                  />
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div
          className={`mt-5 rounded-2xl border border-slate-200/80 bg-slate-100/90 dark:border-slate-700/60 dark:bg-slate-900/60 ${
            collapsed ? "p-2.5" : "p-4"
          }`}
        >
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
            <div className="mt-3 flex justify-center">
              <ThemeToggle />
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
