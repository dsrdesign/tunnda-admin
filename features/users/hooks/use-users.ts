"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { UserFilters } from "../types/users.types";

export const useUsers = (filters: UserFilters, page: number) =>
  useQuery({
    queryKey: ["users", filters, page],
    queryFn: () => usersService.findAll(filters, page),
    placeholderData: keepPreviousData,
  });

function useRefresh() {
  const queryClient = useQueryClient();
  return () => {
    for (const key of ["users", "overview", "audit-logs"])
      void queryClient.invalidateQueries({ queryKey: [key] });
  };
}

export function useSuspendUser() {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => usersService.suspend(id, reason),
    onSettled: refresh,
  });
}

export function useReactivateUser() {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: (id: string) => usersService.reactivate(id),
    onSettled: refresh,
  });
}
