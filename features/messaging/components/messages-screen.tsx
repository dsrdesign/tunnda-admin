"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cell, DataTable } from "@/components/ui/data-table";
import { Notice } from "@/components/ui/notice";
import { Pagination } from "@/components/ui/pagination";
import { errorMessage } from "@/lib/errors";
import { formatDateTime } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/page";
import { useMessages } from "../hooks/use-messages";
import { CHANNEL_LABELS, type MessageChannel, type MessageStatus } from "../types/messaging.types";

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: { value: T; label: string }[];
  onChange: (value: T | "") => void;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | "")}
        className="h-11 rounded-full border-[1.5px] border-field-border bg-surface px-4 outline-none focus:border-forest focus:ring-4 focus:ring-forest/15"
      >
        <option value="">Tous</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function MessagesScreen() {
  const [status, setStatus] = useState<MessageStatus | "">("");
  const [channel, setChannel] = useState<MessageChannel | "">("");
  const [page, setPage] = useState(1);
  const messages = useMessages({ status: status || undefined, channel: channel || undefined }, page);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-3">
        <Select
          label="Statut"
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
          options={[
            { value: "SENT", label: "Envoyé" },
            { value: "FAILED", label: "Échec" },
          ]}
        />
        <Select
          label="Canal"
          value={channel}
          onChange={(v) => {
            setChannel(v);
            setPage(1);
          }}
          options={(Object.keys(CHANNEL_LABELS) as MessageChannel[]).map((c) => ({ value: c, label: CHANNEL_LABELS[c] }))}
        />
      </div>
      {messages.error ? <Notice tone="error" title="La liste n’a pas pu être chargée.">{errorMessage(messages.error)}</Notice> : null}
      <DataTable
        headers={["Date", "Destinataire", "Canal", "Statut", "Détail"]}
        isLoading={messages.isPending}
        isEmpty={messages.data?.items.length === 0}
        emptyText="Aucun envoi enregistré."
      >
        {messages.data?.items.map((message) => (
          <tr key={message.id}>
            <Cell className="whitespace-nowrap text-muted">{formatDateTime(message.createdAt)}</Cell>
            <Cell className="tabular-nums">{message.recipientMasked}</Cell>
            <Cell>{CHANNEL_LABELS[message.channel]}</Cell>
            <Cell>{message.status === "SENT" ? <Badge tone="forest">Envoyé</Badge> : <Badge tone="error">Échec</Badge>}</Cell>
            <Cell className="max-w-md text-xs text-muted">{message.error ?? "—"}</Cell>
          </tr>
        ))}
      </DataTable>
      {messages.data ? <Pagination page={page} pageSize={PAGE_SIZE} total={messages.data.total} onChange={setPage} /> : null}
    </div>
  );
}
