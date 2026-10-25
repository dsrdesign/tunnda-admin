import type { ReactNode } from "react";

/**
 * Carte « double cadre » : un liseré translucide autour d'une surface avec un léger reflet intérieur
 * et une ombre profonde et douce. Pour les éléments à mettre en valeur, pas pour tout.
 */
export function Bezel({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] bg-fg/[0.035] p-1.5 ring-1 ring-fg/[0.08] ${className}`}
    >
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-surface shadow-[inset_0_1px_1px_rgb(255_255_255/0.7),0_30px_60px_-34px_rgb(37_45_41/0.32)] dark:shadow-[inset_0_1px_1px_rgb(255_255_255/0.05),0_30px_60px_-34px_rgb(0_0_0/0.7)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
