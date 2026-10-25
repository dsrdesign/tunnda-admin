import "server-only";
import { readSession } from "./session";

/** Adresse de tunnda-api, avec son préfixe (ex. http://localhost:3000/api/v1). */
export const API_URL = (
  process.env.API_URL ?? "http://localhost:3000/api/v1"
).replace(/\/$/, "");

export type Admin = {
  id: string;
  displayName: string;
  phoneMasked: string;
  lastLoginAt: string | null;
};

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function call<T>(
  path: string,
  init: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, ...rest } = init;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(" ")
      : body?.message;
    throw new ApiError(response.status, message ?? "Une erreur est survenue.");
  }
  return (response.status === 204 ? undefined : await response.json()) as T;
}

const forwarded = (ip: string | null): Record<string, string> =>
  ip ? { "x-forwarded-for": ip } : {};

/** Connexion : pas encore de session. */
export const authApi = {
  requestOtp: (phoneNumber: string, ip: string | null) =>
    call<void>("/admin/auth/otp/request", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
      headers: forwarded(ip),
    }),
  verifyOtp: (phoneNumber: string, code: string, ip: string | null) =>
    call<{ accessToken: string; admin: Admin }>("/admin/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, code }),
      headers: forwarded(ip),
    }),
};

/** Côté serveur, seul le profil est lu (pour vérifier la session) ; le reste passe par le proxy /api/admin. */
export const adminApi = {
  me: async () => {
    const token = await readSession();
    if (!token) throw new ApiError(401, "Non connecté.");
    return call<Admin>("/admin/me", { token });
  },
};
