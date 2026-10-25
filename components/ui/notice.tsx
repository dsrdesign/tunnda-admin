import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";

const STYLES = {
  success: { box: "bg-forest-soft", icon: "text-forest", Icon: CheckCircle2 },
  warning: { box: "bg-gold-soft", icon: "text-gold-text", Icon: AlertTriangle },
  error: { box: "bg-error-soft", icon: "text-error", Icon: XCircle },
} as const;

/** Message système : toujours une icône et un texte, jamais la couleur seule. */
export function Notice({
  tone,
  title,
  children,
}: {
  tone: keyof typeof STYLES;
  title?: string;
  children?: ReactNode;
}) {
  const { box, icon, Icon } = STYLES[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`grid grid-cols-[auto_1fr] gap-3 rounded-2xl p-4 text-[0.9375rem] ${box}`}
    >
      <Icon size={20} aria-hidden className={`mt-0.5 ${icon}`} />
      <div className="grid gap-0.5">
        {title ? <p className="font-medium">{title}</p> : null}
        {children ? <div className="text-fg/85">{children}</div> : null}
      </div>
    </div>
  );
}
