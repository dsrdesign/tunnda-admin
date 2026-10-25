import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-forest text-on-forest shadow-primary hover:bg-forest-hover",
  secondary: "bg-forest-soft text-forest hover:bg-forest-soft-hover",
  ghost: "text-forest hover:bg-forest-soft",
  danger: "bg-error-soft text-error hover:brightness-95",
};

const SIZES: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

/** Boutons en pilule, tonaux : vert plein pour l'action principale, vert pâle pour les autres. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition duration-300 ease-spring active:scale-[0.98] motion-reduce:transition-none",
    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-forest",
    VARIANTS[variant],
    SIZES[size],
  ].join(" ");
}

export function ButtonLink({
  variant,
  size,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}) {
  return (
    <Link className={`${buttonClasses(variant, size)} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  busy = false,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Action en cours : le bouton reste à sa place mais ne répond plus. */
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || busy}
      aria-busy={busy || undefined}
      className={`${buttonClasses(variant, size)} disabled:cursor-not-allowed disabled:opacity-55 ${className}`}
    >
      {busy ? <span aria-hidden>…</span> : children}
    </button>
  );
}
