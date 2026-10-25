/** Page de résultats renvoyée par l'API admin. */
export type Page<T> = { items: T[]; total: number; page: number; pageSize: number };

export const PAGE_SIZE = 25;
