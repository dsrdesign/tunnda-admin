export type AuditRow = {
  id: string;
  action: string;
  adminName: string;
  targetType: string | null;
  targetId: string | null;
  details: Record<string, unknown> | null;
  ip: string | null;
  createdAt: string;
};

export const ACTION_LABELS: Record<string, string> = {
  ADMIN_LOGIN: "Connexion au dashboard",
  USER_SUSPENDED: "Compte suspendu",
  USER_REACTIVATED: "Compte réactivé",
};
