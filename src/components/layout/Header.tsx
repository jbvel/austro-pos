import type { ReactNode } from "react";

type HeaderProps = {
  badge?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function Header({ badge, title, description, action }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6 rounded-[28px] border border-[color:var(--brand-border)] bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] p-6 text-[color:var(--brand-foreground)] shadow-[0_24px_64px_-28px_var(--brand-shadow)] dark:border-[color:var(--brand-border-dark)] dark:bg-[linear-gradient(135deg,var(--brand-gradient-dark-start)_0%,var(--brand-gradient-dark-end)_100%)] dark:shadow-[0_18px_42px_-24px_rgba(0,0,0,0.55)] sm:flex-row sm:items-start sm:justify-between sm:p-7">
      <div className="space-y-3">
        {badge ? (
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-foreground-muted)] dark:bg-white/10">
            {badge}
          </span>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--brand-foreground-soft)]">
          {description}
        </p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
