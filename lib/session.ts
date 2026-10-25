import "server-only";
import { cookies } from "next/headers";

const NAME = "tunnda_admin_session";

/** Durée de la session : la même que celle du jeton admin de l'API (8 h). */
export const SESSION_SECONDS = 8 * 60 * 60;

/** Le jeton de l'API vit dans un cookie httpOnly : le navigateur ne peut jamais le lire. */
export async function readSession(): Promise<string | null> {
  return (await cookies()).get(NAME)?.value ?? null;
}

export async function writeSession(token: string): Promise<void> {
  (await cookies()).set(NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(NAME);
}

export const SESSION_COOKIE = NAME;
