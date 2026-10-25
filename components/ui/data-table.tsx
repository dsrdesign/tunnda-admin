import type { ReactNode } from "react";

/** Coque commune des tableaux : double cadre, défilement horizontal sur petit écran, état vide et chargement. */
export function DataTable({
  headers,
  isLoading,
  isEmpty,
  emptyText,
  children,
}: {
  headers: string[];
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyText: string;
  children: ReactNode;
}) {
  if (isLoading)
    return <div className="h-56 animate-pulse rounded-[1.75rem] bg-fg/[0.04] ring-1 ring-fg/[0.08]" />;
  if (isEmpty)
    return (
      <p className="rounded-[1.75rem] border border-dashed border-line p-10 text-center text-muted">
        {emptyText}
      </p>
    );
  return (
    <div className="overflow-x-auto rounded-[1.75rem] bg-fg/[0.035] p-1.5 ring-1 ring-fg/[0.08]">
      <table className="w-full min-w-[48rem] overflow-hidden rounded-[1.375rem] bg-surface text-left text-sm">
        <thead className="text-xs tracking-wide text-muted uppercase">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export const Cell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
