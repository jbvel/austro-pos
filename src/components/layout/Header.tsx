import type { ReactNode } from "react";

type HeaderProps = {
  badge?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function Header({ badge, title, description, action }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6 rounded-[28px] border border-sky-100/80 bg-[linear-gradient(135deg,#5d87ff_0%,#49beff_100%)] p-6 text-white shadow-[0_24px_64px_-28px_rgba(73,190,255,0.55)] dark:border-sky-400/15 dark:bg-[linear-gradient(135deg,#2d4ba6_0%,#255c86_100%)] dark:shadow-[0_18px_42px_-24px_rgba(0,0,0,0.55)] sm:flex-row sm:items-start sm:justify-between sm:p-7">
      <div className="space-y-3">
        {badge ? (
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 dark:bg-white/10 dark:text-white/80">
            {badge}
          </span>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-xl text-sm leading-6 text-white/80 dark:text-white/72">
          {description}
        </p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
