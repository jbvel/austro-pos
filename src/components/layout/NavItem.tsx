"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  enabled?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
};

export function NavItem({
  label,
  href,
  icon: Icon,
  isActive,
  enabled = true,
  collapsed = false,
  onClick,
}: NavItemProps) {
  if (!enabled) {
    return (
      <div
        className={`flex rounded-2xl px-3 py-3 text-sm text-slate-500 dark:text-slate-400 ${
          collapsed
            ? "justify-center"
            : "items-center justify-between"
        }`}
        title={`${label} - PRONTO`}
      >
        <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
          <Icon className="size-4" />
          {!collapsed ? <span>{label}</span> : null}
        </div>
        {!collapsed ? (
          <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-white/10 dark:text-slate-300">
            PRONTO
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex rounded-2xl px-3 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] text-[color:var(--brand-foreground)] shadow-lg shadow-[var(--brand-shadow-soft)] dark:shadow-none dark:brightness-95"
          : "text-slate-700 hover:bg-primary/[0.08] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-primary/[0.14] dark:hover:text-white"
      } ${collapsed ? "justify-center" : "items-center gap-3"}`}
      title={label}
    >
      <Icon className="size-4" />
      {!collapsed ? <span>{label}</span> : null}
    </Link>
  );
}
