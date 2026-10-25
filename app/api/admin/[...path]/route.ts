import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { readSession } from "@/lib/session";

/** Seuls des segments simples (identifiants, mots) : jamais de remontée de dossier ni d'adresse déguisée. */
const SEGMENT = /^[A-Za-z0-9_-]+$/;

/**
 * Proxy vers les routes /admin de tunnda-api. Le navigateur n'appelle que ce serveur : le jeton reste dans le cookie
 * httpOnly et n'est ajouté qu'ici.
 */
async function forward(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  if (!path.every((segment) => SEGMENT.test(segment))) {
    return NextResponse.json({ message: "Adresse invalide." }, { status: 400 });
  }
  const token = await readSession();
  if (!token)
    return NextResponse.json({ message: "Non connecté." }, { status: 401 });

  // Protection CSRF en plus du cookie SameSite : une action qui modifie doit venir de ce site.
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ message: "Origine refusée." }, { status: 403 });
    }
  }

  const ip = request.headers.get("x-forwarded-for");
  try {
    const upstream = await fetch(
      `${API_URL}/admin/${path.join("/")}${new URL(request.url).search}`,
      {
        method: request.method,
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...(ip ? { "x-forwarded-for": ip } : {}),
        },
        body: request.method === "GET" ? undefined : await request.text(),
      },
    );
    return new Response(upstream.status === 204 ? null : await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { message: "L'API est injoignable." },
      { status: 502 },
    );
  }
}

export { forward as GET, forward as POST };
