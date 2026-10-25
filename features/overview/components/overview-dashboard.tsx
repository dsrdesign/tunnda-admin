"use client";

import { Notice } from "@/components/ui/notice";
import { errorMessage } from "@/lib/errors";
import { formatBytes, formatNumber, plural } from "@/lib/format";
import { CHANNEL_LABELS } from "@/features/messaging/types/messaging.types";
import { useOverview } from "../hooks/use-overview";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="grid content-start gap-1.5 rounded-[1.5rem] bg-surface p-4 ring-1 ring-fg/[0.06] sm:p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="font-display text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{value}</p>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-xs font-medium tracking-[0.12em] text-muted uppercase">{title}</h2>
      {children}
    </section>
  );
}

const dayLabel = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric" });

export function OverviewDashboard() {
  const overview = useOverview();
  if (overview.error)
    return <Notice tone="error" title="La vue d’ensemble n’a pas pu être chargée.">{errorMessage(overview.error)}</Notice>;
  if (!overview.data)
    return <div className="h-96 animate-pulse rounded-[1.75rem] bg-fg/[0.04]" />;
  const { users, families, tree, invitations, messages7d, activity } = overview.data;
  const n = formatNumber;

  return (
    <div className="grid gap-10">
      <Section title="Comptes">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Utilisateurs" value={n(users.total)} hint={`+${n(users.new7d)} cette semaine · +${n(users.new30d)} en 30 jours`} />
          <Stat label="Contributeurs actifs" value={n(users.active7d)} hint="Ont modifié un arbre ces 7 derniers jours" />
          <Stat label="Comptes suspendus" value={n(users.suspended)} />
          <Stat label="Invitations en attente" value={n(invitations.pending)} hint={`${plural(invitations.accepted30d, "acceptée", "acceptées")} en 30 jours`} />
        </div>
      </Section>

      <Section title="Familles et arbres">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Familles" value={n(families.total)} hint={`+${n(families.new30d)} en 30 jours`} />
          <Stat label="Membres par famille" value={families.avgMembers.toLocaleString("fr-FR")} hint="En moyenne" />
          <Stat label="Fiches" value={n(tree.persons)} hint={`${families.avgPersons.toLocaleString("fr-FR")} par famille en moyenne`} />
          <Stat label="Photos" value={n(tree.photos)} hint={formatBytes(tree.photoBytes)} />
        </div>
        <p className="text-sm text-muted">
          {n(tree.unions)} unions · {n(tree.filiations)} liens parent-enfant. Le contenu des arbres n’est jamais affiché ici.
        </p>
      </Section>

      <Section title="Codes de connexion · 7 derniers jours">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Envoyés" value={n(messages7d.sent)} />
          <Stat
            label="Échecs"
            value={n(messages7d.failed)}
            hint={messages7d.sent + messages7d.failed > 0 ? `${Math.round((messages7d.failed / (messages7d.sent + messages7d.failed)) * 100)} % des tentatives` : undefined}
          />
          {messages7d.byChannel.map((row) => (
            <Stat
              key={row.channel}
              label={CHANNEL_LABELS[row.channel as keyof typeof CHANNEL_LABELS] ?? row.channel}
              value={n(row.sent)}
              hint={plural(row.failed, "échec", "échecs")}
            />
          ))}
        </div>
      </Section>

      <Section title="Activité · 14 derniers jours">
        <div className="overflow-x-auto rounded-[1.75rem] bg-fg/[0.035] p-1.5 ring-1 ring-fg/[0.08]">
          <table className="w-full min-w-[40rem] rounded-[1.375rem] bg-surface text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Jour</th>
                {activity.map((day) => (
                  <th key={day.date} className="px-1 py-3 font-medium whitespace-nowrap">
                    {dayLabel.format(new Date(`${day.date}T12:00:00`))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line tabular-nums">
              {(
                [
                  ["Modifications", "events"],
                  ["Connexions", "logins"],
                  ["Nouveaux comptes", "newUsers"],
                ] as const
              ).map(([label, key]) => (
                <tr key={key}>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{label}</td>
                  {activity.map((day) => (
                    <td key={day.date} className={`px-1 py-3 text-center ${day[key] ? "font-medium" : "text-muted/50"}`}>
                      {day[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
