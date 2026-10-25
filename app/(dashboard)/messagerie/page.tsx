import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MessagesScreen } from "@/features/messaging";

export const metadata: Metadata = { title: "Messagerie" };

export default function MessagingPage() {
  return (
    <>
      <PageHeader
        title="Messagerie"
        description="Chaque tentative d’envoi d’un code de connexion, par WhatsApp ou par SMS. Le code lui-même n’est jamais enregistré."
      />
      <MessagesScreen />
    </>
  );
}
