import axios from "axios";

/** Le message d'une erreur de l'API (en français), ou un message par défaut. */
export function errorMessage(
  error: unknown,
  fallback = "Une erreur est survenue.",
): string {
  if (axios.isAxiosError(error)) {
    const message = (
      error.response?.data as { message?: string | string[] } | undefined
    )?.message;
    if (Array.isArray(message)) return message.join(" ");
    if (message) return message;
    if (!error.response) return "Le serveur est injoignable.";
  }
  return fallback;
}
