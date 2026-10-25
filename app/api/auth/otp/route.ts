import { NextResponse } from "next/server";
import { ApiError, authApi } from "@/lib/api";

/** Demande d'un code : passe par ce serveur, jamais directement du navigateur à l'API. */
export async function POST(request: Request) {
  const { phoneNumber } = (await request.json().catch(() => ({}))) as {
    phoneNumber?: string;
  };
  if (!phoneNumber)
    return NextResponse.json({ message: "Numéro manquant." }, { status: 400 });
  try {
    await authApi.requestOtp(phoneNumber, request.headers.get("x-forwarded-for"));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof ApiError ? error.message : "L'API est injoignable.",
      },
      { status: error instanceof ApiError ? error.status : 502 },
    );
  }
}
