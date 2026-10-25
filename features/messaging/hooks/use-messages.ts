"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { messagingService } from "../services/messaging.service";
import type { MessageFilters } from "../types/messaging.types";

export const useMessages = (filters: MessageFilters, page: number) =>
  useQuery({
    queryKey: ["messages", filters, page],
    queryFn: () => messagingService.findAll(filters, page),
    placeholderData: keepPreviousData,
  });
