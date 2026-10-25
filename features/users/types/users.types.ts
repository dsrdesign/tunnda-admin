export type UserRow = {
  id: string;
  displayName: string | null;
  phoneMasked: string;
  createdAt: string;
  suspendedAt: string | null;
  suspensionReason: string | null;
  familyCount: number;
  lastActivityAt: string | null;
};

export type UserStatus = "all" | "active" | "suspended";

export type UserFilters = { search: string; status: UserStatus };

export const STATUS_LABELS: Record<UserStatus, string> = {
  all: "Tous",
  active: "Actifs",
  suspended: "Suspendus",
};
