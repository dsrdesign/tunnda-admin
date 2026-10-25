"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cell, DataTable } from "@/components/ui/data-table";
import { Notice } from "@/components/ui/notice";
import { Pagination } from "@/components/ui/pagination";
import { errorMessage } from "@/lib/errors";
import { formatDate, formatDateTime } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/page";
import { useUsers } from "../hooks/use-users";
import { STATUS_LABELS, type UserRow, type UserStatus } from "../types/users.types";
import { AccountDialog } from "./suspend-dialog";

export function UsersScreen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<UserRow | null>(null);
  const users = useUsers({ search, status }, page);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-60 flex-1">
          <span className="sr-only">Rechercher</span>
          <Search size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Nom affiché ou chiffres du numéro"
            className="h-11 w-full rounded-full border-[1.5px] border-field-border bg-surface pr-4 pl-11 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/15"
          />
        </label>
        <div className="flex gap-1 rounded-full bg-fg/[0.05] p-1" role="group" aria-label="Filtrer par statut">
          {(Object.keys(STATUS_LABELS) as UserStatus[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={status === value}
              onClick={() => {
                setStatus(value);
                setPage(1);
              }}
              className={`h-9 rounded-full px-4 text-sm font-medium transition ${status === value ? "bg-surface text-forest shadow-sm" : "text-muted hover:text-fg"}`}
            >
              {STATUS_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      {users.error ? <Notice tone="error" title="La liste n’a pas pu être chargée.">{errorMessage(users.error)}</Notice> : null}

      <DataTable
        headers={["Compte", "Numéro", "Familles", "Inscrit le", "Dernière modification", "Statut", ""]}
        isLoading={users.isPending}
        isEmpty={users.data?.items.length === 0}
        emptyText="Aucun compte ne correspond."
      >
        {users.data?.items.map((user) => (
          <tr key={user.id}>
            <Cell className="font-medium">{user.displayName ?? <span className="text-muted">Sans nom</span>}</Cell>
            <Cell className="tabular-nums text-muted">{user.phoneMasked}</Cell>
            <Cell className="tabular-nums">{user.familyCount}</Cell>
            <Cell className="text-muted">{formatDate(user.createdAt)}</Cell>
            <Cell className="text-muted">{formatDateTime(user.lastActivityAt)}</Cell>
            <Cell>
              {user.suspendedAt ? <Badge tone="error">Suspendu</Badge> : <Badge tone="forest">Actif</Badge>}
            </Cell>
            <Cell className="text-right">
              <button
                type="button"
                onClick={() => setSelected(user)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${user.suspendedAt ? "text-forest hover:bg-forest-soft" : "text-error hover:bg-error-soft"}`}
              >
                {user.suspendedAt ? "Réactiver" : "Suspendre"}
              </button>
            </Cell>
          </tr>
        ))}
      </DataTable>
      {users.data ? <Pagination page={page} pageSize={PAGE_SIZE} total={users.data.total} onChange={setPage} /> : null}
      {selected ? <AccountDialog user={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  );
}
