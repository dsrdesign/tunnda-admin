"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/brand/logo";
import { Bezel } from "@/components/ui/bezel";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { errorMessage } from "@/lib/errors";
import { useRequestOtp, useVerifyOtp } from "../hooks/use-auth";

/** +237 est ajouté seul pour un numéro camerounais à 9 chiffres ; un numéro international (+…) est gardé tel quel. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  return `+237${digits}`;
}

export function LoginForm() {
  const router = useRouter();
  const requestOtp = useRequestOtp();
  const verifyOtp = useVerifyOtp();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [error, setError] = useState<string | null>(null);

  function sendCode(event: React.FormEvent) {
    event.preventDefault();
    if (!phone.trim()) return setError("Entrez votre numéro.");
    setError(null);
    requestOtp.mutate(normalizePhone(phone), {
      onSuccess: () => setStep("code"),
      onError: (e) => setError(errorMessage(e)),
    });
  }

  function verify(value: string) {
    if (verifyOtp.isPending) return;
    setError(null);
    verifyOtp.mutate(
      { phoneNumber: normalizePhone(phone), code: value },
      {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
        onError: (e) => {
          setError(errorMessage(e));
          setCode("");
        },
      },
    );
  }

  function changeCode(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    if (digits.length === 6) verify(digits);
  }

  return (
    <div className="w-full max-w-sm motion-safe:animate-rise">
      <Bezel innerClassName="grid gap-6 p-7">
        <div className="grid gap-3">
          <span className="grid size-14 place-items-center rounded-full bg-forest-soft text-forest">
            <LogoMark size={30} />
          </span>
          <h1 className="font-display text-3xl leading-tight font-bold">
            Tunnda Admin
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            {step === "phone"
              ? "Accès réservé à l’équipe. Vous recevrez un code de connexion."
              : "Entrez le code à 6 chiffres que vous venez de recevoir."}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={sendCode} className="grid gap-4" noValidate>
            <Field
              id="phone"
              label="Numéro de téléphone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="6 52 62 89 33"
            />
            {error ? <Notice tone="error" title={error} /> : null}
            <Button type="submit" size="lg" busy={requestOtp.isPending}>
              Recevoir mon code
            </Button>
          </form>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (code.length === 6) verify(code);
            }}
            className="grid gap-4"
          >
            <label htmlFor="code" className="sr-only">
              Code à 6 chiffres
            </label>
            <input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              maxLength={6}
              value={code}
              disabled={verifyOtp.isPending}
              onChange={(e) => changeCode(e.target.value)}
              placeholder="······"
              className="h-16 w-full rounded-2xl border-[1.5px] border-field-border bg-surface text-center font-display text-3xl tracking-[0.5em] tabular-nums outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/15"
            />
            {error ? <Notice tone="error" title={error} /> : null}
            <Button type="submit" size="lg" busy={verifyOtp.isPending} disabled={code.length !== 6}>
              Se connecter
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setStep("phone");
                setCode("");
                setError(null);
              }}
            >
              Changer de numéro
            </Button>
          </form>
        )}
      </Bezel>
    </div>
  );
}
