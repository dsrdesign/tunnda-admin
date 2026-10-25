import type { ReactNode } from "react";

const TONES = {
  neutral: "bg-fg/[0.06] text-fg/80",
  forest: "bg-forest-soft text-forest",
  gold: "bg-gold-soft text-gold-text",
  error: "bg-error-soft text-error",
} as const;

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${TONES[tone]}`}>
      {children}
    </span>
  );
}
