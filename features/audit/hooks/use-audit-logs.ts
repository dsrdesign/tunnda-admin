"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { auditService } from "../services/audit.service";

export const useAuditLogs = (page: number) =>
  useQuery({
    queryKey: ["audit-logs", page],
    queryFn: () => auditService.findAll(page),
    placeholderData: keepPreviousData,
  });
