import axios from "axios";

/** Appels du dashboard : toujours vers ce serveur (même origine), qui les transmet à l'API avec le jeton du cookie. */
export const apiClient = axios.create({
  baseURL: "/api/admin",
  headers: { "Content-Type": "application/json" },
});

/** Connexion et déconnexion : routes de ce serveur qui posent ou retirent le cookie de session. */
export const authClient = axios.create({
  baseURL: "/api/auth",
  headers: { "Content-Type": "application/json" },
});

// Session expirée ou administrateur retiré : retour à la connexion.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/connexion"
    ) {
      // Rechargement complet voulu : il vide aussi le cache des requêtes de la session précédente.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/connexion");
    }
    return Promise.reject(error);
  },
);
