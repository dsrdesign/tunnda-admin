"use client";

import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Fenêtre modale : se ferme avec Échap ou en touchant le fond ; bloque le défilement derrière. */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgb(20_26_23/0.45)] backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] bg-surface p-6 shadow-soft motion-safe:animate-rise sm:rounded-[1.75rem]"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id={titleId} className="font-display text-2xl leading-tight font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-fg/[0.06] hover:text-fg"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
