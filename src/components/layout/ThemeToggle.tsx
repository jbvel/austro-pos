"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const themeOptions = [
  {
    value: "light",
    label: "Claro",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Oscuro",
    icon: Moon,
  },
  {
    value: "system",
    label: "Sistema",
    icon: Monitor,
  },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-2xl border border-primary/12 bg-primary/[0.05] p-1 dark:border-primary/12 dark:bg-primary/[0.08]">
        {themeOptions.map((option) => (
          <div
            key={option.value}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 dark:text-slate-500"
          >
            <option.icon className="size-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-primary/12 bg-primary/[0.05] p-1 shadow-sm shadow-[0_10px_20px_-18px_var(--brand-shadow-soft)] dark:border-primary/12 dark:bg-primary/[0.08] dark:shadow-none">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive =
          theme === option.value ||
          (option.value !== "system" &&
            theme === "system" &&
            resolvedTheme === option.value);

        return (
          <Button
            key={option.value}
            type="button"
            variant="ghost"
            size="icon-sm"
            className={`rounded-xl ${
              isActive
                ? "bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] text-[color:var(--brand-foreground)] hover:bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] dark:shadow-none dark:brightness-95"
                : "text-slate-600 hover:bg-primary/[0.08] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-primary/[0.14] dark:hover:text-white"
            }`}
            onClick={() => setTheme(option.value)}
            aria-label={`Cambiar tema a ${option.label}`}
            title={option.label}
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </div>
  );
}
