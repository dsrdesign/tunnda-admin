"use client";

import { useState } from "react";
import { Cell, DataTable } from "@/components/ui/data-table";
import { Notice } from "@/components/ui/notice";
import { Pagination } from "@/components/ui/pagination";
import { errorMessage } from "@/lib/errors";
import { formatDate, formatDateTime, shortId } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/page";
import { useFamilies } from "../hooks/use-families";

export function FamiliesScreen() {
  const [page, setPage] = useState(1);
  const families = useFamilies(page);
  return (
    <div className="grid gap-5">
      {families.error ? <Notice tone="error" title="La liste n’a pas pu être chargée.">{errorMessage(families.error)}</Notice> : null}
      <DataTable
        headers={["Famille", "Propriétaire", "Membres", "Fiches", "Photos", "Invitations en attente", "Créée le", "Dernière activité"]}
        isLoading={families.isPending}
        isEmpty={families.data?.items.length === 0}
        emptyText="Aucune famille pour l’instant."
      >
        {families.data?.items.map((family) => (
          <tr key={family.id}>
            <Cell className="font-mono text-xs text-muted" >
              <span title={family.id}>{shortId(family.id)}</span>
            </Cell>
            <Cell className="tabular-nums text-muted">{family.ownerMasked}</Cell>
            <Cell className="tabular-nums">{family.memberCount}</Cell>
            <Cell className="tabular-nums">{family.personCount}</Cell>
            <Cell className="tabular-nums">{family.photoCount}</Cell>
            <Cell className="tabular-nums">{family.pendingInvitations}</Cell>
            <Cell className="text-muted">{formatDate(family.createdAt)}</Cell>
            <Cell className="text-muted">{formatDateTime(family.lastActivityAt)}</Cell>
          </tr>
        ))}
      </DataTable>
      {families.data ? <Pagination page={page} pageSize={PAGE_SIZE} total={families.data.total} onChange={setPage} /> : null}
    </div>
  );
}
