import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Vérification rapide : sans cookie de session, retour à la connexion.
 * Ce n'est qu'un confort : la vraie vérification (jeton admin valide, administrateur existant) est faite par l'API.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const open = pathname === "/connexion" || pathname.startsWith("/api/auth/");
  if (!open && !request.cookies.get("tunnda_admin_session")) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon.svg).*)"],
};
