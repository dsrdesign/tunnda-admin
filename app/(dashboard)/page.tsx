import { PageHeader } from "@/components/ui/page-header";
import { OverviewDashboard } from "@/features/overview";

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Vue d’ensemble"
        description="L’activité de la plateforme, en nombres. Les arbres appartiennent aux familles : leur contenu n’apparaît jamais ici."
      />
      <OverviewDashboard />
    </>
  );
}
