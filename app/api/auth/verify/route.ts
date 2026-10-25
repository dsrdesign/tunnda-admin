import { NextResponse } from "next/server";
import { ApiError, authApi } from "@/lib/api";
import { writeSession } from "@/lib/session";

export async function POST(request: Request) {
  const { phoneNumber, code } = (await request.json().catch(() => ({}))) as {
    phoneNumber?: string;
    code?: string;
  };
  if (!phoneNumber || !code)
    return NextResponse.json(
      { message: "Numéro ou code manquant." },
      { status: 400 },
    );
  try {
    const { accessToken, admin } = await authApi.verifyOtp(
      phoneNumber,
      code,
      request.headers.get("x-forwarded-for"),
    );
    await writeSession(accessToken);
    // Le jeton n'est jamais renvoyé au navigateur : seul le cookie httpOnly le porte.
    return NextResponse.json({ admin });
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
