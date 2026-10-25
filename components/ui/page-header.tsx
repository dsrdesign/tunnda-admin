import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="grid gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-[60ch] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {actions}
    </header>
  );
}
