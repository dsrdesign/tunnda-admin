import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { UsersScreen } from "@/features/users";

export const metadata: Metadata = { title: "Utilisateurs" };

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Utilisateurs"
        description="Numéros masqués. Une suspension coupe l’accès tout de suite et reste tracée dans le journal d’audit."
      />
      <UsersScreen />
    </>
  );
}
