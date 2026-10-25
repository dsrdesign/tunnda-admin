import { ChevronLeft, ChevronRight } from "lucide-react";

/** Pagination simple : page courante, total et deux flèches. */
export function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;
  const button =
    "grid size-10 place-items-center rounded-full ring-1 ring-line transition hover:bg-forest-soft hover:text-forest disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="mt-4 flex items-center justify-end gap-3 text-sm text-muted">
      <span className="tabular-nums">
        Page {page} sur {pages} · {total} au total
      </span>
      <button type="button" className={button} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Page précédente">
        <ChevronLeft size={18} aria-hidden />
      </button>
      <button type="button" className={button} disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Page suivante">
        <ChevronRight size={18} aria-hidden />
      </button>
    </div>
  );
}
