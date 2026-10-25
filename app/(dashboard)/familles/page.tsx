import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { FamiliesScreen } from "@/features/families";

export const metadata: Metadata = { title: "Familles" };

export default function FamiliesPage() {
  return (
    <>
      <PageHeader
        title="Familles"
        description="Métadonnées seulement : ni le nom de la famille, ni ses personnes, ni ses liens."
      />
      <FamiliesScreen />
    </>
  );
}
