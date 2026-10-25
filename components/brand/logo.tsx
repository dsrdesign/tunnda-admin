/**
 * Symbole « Lignée » : branches et racines en miroir, trois membres au bout des branches.
 * Le point du haut, doré dans la version couleur, marque la génération qui reçoit l'héritage.
 */
export function LogoMark({
  size = 32,
  monochrome = false,
  className = "",
  title,
}: {
  size?: number;
  /** Une seule couleur (impression, tampon) : le point doré prend la couleur du symbole. */
  monochrome?: boolean;
  className?: string;
  /** Sans titre, le symbole est décoratif (masqué aux lecteurs d'écran). */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M32 52V20M32 38 19 25M32 38l13-13M32 52l-8 7M32 52l8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="22" r="5.5" fill="currentColor" />
      <circle cx="48" cy="22" r="5.5" fill="currentColor" />
      <circle
        cx="32"
        cy="13"
        r="6"
        className={monochrome ? "fill-current" : "fill-gold"}
      />
    </svg>
  );
}

/** Symbole et mot-symbole TUNNDA côte à côte. */
export function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-forest ${className}`}
    >
      <LogoMark size={size} />
      <span
        className="font-display font-bold tracking-[0.08em]"
        style={{ fontSize: size * 0.62 }}
      >
        TUNNDA
      </span>
    </span>
  );
}
