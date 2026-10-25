/** Vue d'ensemble : uniquement des nombres, jamais le contenu d'un arbre. */
export type Overview = {
  users: { total: number; new7d: number; new30d: number; active7d: number; suspended: number };
  families: { total: number; new30d: number; avgMembers: number; avgPersons: number };
  tree: { persons: number; unions: number; filiations: number; photos: number; photoBytes: number };
  invitations: { pending: number; accepted30d: number };
  messages7d: {
    sent: number;
    failed: number;
    byChannel: { channel: string; sent: number; failed: number }[];
  };
  activity: { date: string; events: number; newUsers: number; logins: number }[];
};
