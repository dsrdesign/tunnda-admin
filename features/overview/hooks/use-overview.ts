"use client";

import { useQuery } from "@tanstack/react-query";
import { overviewService } from "../services/overview.service";

export const useOverview = () =>
  useQuery({ queryKey: ["overview"], queryFn: () => overviewService.get() });
