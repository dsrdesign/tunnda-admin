const dateTime = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});
const dateOnly = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" });
const number = new Intl.NumberFormat("fr-FR");

export const formatDateTime = (value: string | null | undefined) =>
  value ? dateTime.format(new Date(value)) : "—";

export const formatDate = (value: string | null | undefined) =>
  value ? dateOnly.format(new Date(value)) : "—";

export const formatNumber = (value: number) => number.format(value);

const decimal = (value: number, digits: number) =>
  value.toLocaleString("fr-FR", { maximumFractionDigits: digits });

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 ** 2) return `${decimal(bytes / 1024, 0)} Ko`;
  if (bytes < 1024 ** 3) return `${decimal(bytes / 1024 ** 2, 1)} Mo`;
  return `${decimal(bytes / 1024 ** 3, 2)} Go`;
}

/** « 1 acceptée », « 3 acceptées » : accord simple, au pluriel à partir de 2. */
export const plural = (count: number, one: string, many: string) =>
  `${number.format(count)} ${count > 1 ? many : one}`;

/** Un identifiant court, assez pour s'y retrouver dans une liste. */
export const shortId = (id: string) => id.slice(0, 8);
