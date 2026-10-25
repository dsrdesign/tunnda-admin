"use client";

import { useState } from "react";
import { Cell, DataTable } from "@/components/ui/data-table";
import { Notice } from "@/components/ui/notice";
import { Pagination } from "@/components/ui/pagination";
import { errorMessage } from "@/lib/errors";
import { formatDateTime, shortId } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/page";
import { useAuditLogs } from "../hooks/use-audit-logs";
import { ACTION_LABELS, type AuditRow } from "../types/audit.types";

function detailOf(log: AuditRow): string {
  const reason = log.details?.reason ?? log.details?.previousReason;
  return typeof reason === "string" ? `« ${reason} »` : "—";
}

export function AuditScreen() {
  const [page, setPage] = useState(1);
  const logs = useAuditLogs(page);
  return (
    <div className="grid gap-5">
      {logs.error ? <Notice tone="error" title="Le journal n’a pas pu être chargé.">{errorMessage(logs.error)}</Notice> : null}
      <DataTable
        headers={["Date", "Administrateur", "Action", "Cible", "Détail", "Adresse IP"]}
        isLoading={logs.isPending}
        isEmpty={logs.data?.items.length === 0}
        emptyText="Aucune action enregistrée."
      >
        {logs.data?.items.map((log) => (
          <tr key={log.id}>
            <Cell className="whitespace-nowrap text-muted">{formatDateTime(log.createdAt)}</Cell>
            <Cell className="font-medium">{log.adminName}</Cell>
            <Cell>{ACTION_LABELS[log.action] ?? log.action}</Cell>
            <Cell className="font-mono text-xs text-muted">
              {log.targetId ? <span title={log.targetId}>{log.targetType === "USER" ? "Compte " : ""}{shortId(log.targetId)}</span> : "—"}
            </Cell>
            <Cell className="max-w-xs text-muted">{detailOf(log)}</Cell>
            <Cell className="font-mono text-xs text-muted">{log.ip ?? "—"}</Cell>
          </tr>
        ))}
      </DataTable>
      {logs.data ? <Pagination page={page} pageSize={PAGE_SIZE} total={logs.data.total} onChange={setPage} /> : null}
    </div>
  );
}
