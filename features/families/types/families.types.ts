/** Une famille vue du dashboard : métadonnées seulement (ni nom, ni personnes, ni liens). */
export type FamilyRow = {
  id: string;
  createdAt: string;
  ownerMasked: string;
  memberCount: number;
  personCount: number;
  photoCount: number;
  pendingInvitations: number;
  lastActivityAt: string | null;
};
