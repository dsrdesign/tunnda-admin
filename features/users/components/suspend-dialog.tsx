"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Notice } from "@/components/ui/notice";
import { errorMessage } from "@/lib/errors";
import { useReactivateUser, useSuspendUser } from "../hooks/use-users";
import type { UserRow } from "../types/users.types";

/** Suspendre (avec une raison, tracée dans le journal) ou réactiver un compte. L'effet est immédiat. */
export function AccountDialog({ user, onClose }: { user: UserRow; onClose: () => void }) {
  const suspend = useSuspendUser();
  const reactivate = useReactivateUser();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const name = user.displayName ?? "Ce compte";

  if (user.suspendedAt)
    return (
      <Modal title="Réactiver le compte" onClose={onClose}>
        <div className="grid gap-4">
          <p className="leading-relaxed text-muted">
            {name} ({user.phoneMasked}) retrouvera aussitôt l’accès à ses familles.
          </p>
          {user.suspensionReason ? (
            <p className="rounded-2xl bg-fg/[0.04] p-4 text-sm">
              <span className="text-muted">Raison de la suspension : </span>
              {user.suspensionReason}
            </p>
          ) : null}
          {error ? <Notice tone="error" title={error} /> : null}
          <Button
            size="lg"
            busy={reactivate.isPending}
            onClick={() =>
              reactivate.mutate(user.id, {
                onSuccess: onClose,
                onError: (e) => setError(errorMessage(e)),
              })
            }
          >
            Réactiver le compte
          </Button>
        </div>
      </Modal>
    );

  return (
    <Modal title="Suspendre le compte" onClose={onClose}>
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          suspend.mutate(
            { id: user.id, reason },
            { onSuccess: onClose, onError: (e) => setError(errorMessage(e)) },
          );
        }}
      >
        <p className="leading-relaxed text-muted">
          {name} ({user.phoneMasked}) perdra tout de suite l’accès à ses familles, même avec une session ouverte. Rien n’est supprimé.
        </p>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Raison (tracée dans le journal d’audit)</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={300}
            rows={3}
            required
            className="rounded-2xl border-[1.5px] border-field-border bg-surface p-3 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/15"
            placeholder="Ex. signalé pour usurpation d’identité"
          />
        </label>
        {error ? <Notice tone="error" title={error} /> : null}
        <Button type="submit" variant="danger" size="lg" busy={suspend.isPending} disabled={reason.trim().length < 3}>
          Suspendre le compte
        </Button>
      </form>
    </Modal>
  );
}
