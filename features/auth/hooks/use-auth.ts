"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useRequestOtp = () =>
  useMutation({ mutationFn: (phoneNumber: string) => authService.requestOtp(phoneNumber) });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
      authService.verifyOtp(phoneNumber, code),
  });

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      queryClient.clear();
      // Rechargement complet voulu : il vide le cache des requêtes de la session précédente.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/connexion");
    },
  });
}
