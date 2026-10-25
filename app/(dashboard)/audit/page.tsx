import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { AuditScreen } from "@/features/audit";

export const metadata: Metadata = { title: "Journal d’audit" };

export default function AuditPage() {
  return (
    <>
      <PageHeader
        title="Journal d’audit"
        description="Chaque connexion et chaque action d’un administrateur : qui, quoi, quand et d’où."
      />
      <AuditScreen />
    </>
  );
}
