export type MessageChannel = "WHATSAPP" | "SMS" | "CONSOLE";
export type MessageStatus = "SENT" | "FAILED";

/** Un envoi de code de connexion : jamais le code, et le numéro masqué. */
export type MessageRow = {
  id: string;
  kind: string;
  channel: MessageChannel;
  status: MessageStatus;
  recipientMasked: string;
  error: string | null;
  createdAt: string;
};

export type MessageFilters = { status?: MessageStatus; channel?: MessageChannel };

export const CHANNEL_LABELS: Record<MessageChannel, string> = {
  WHATSAPP: "WhatsApp",
  SMS: "SMS",
  CONSOLE: "Console (développement)",
};
