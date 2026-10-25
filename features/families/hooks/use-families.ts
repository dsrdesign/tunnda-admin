"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { familiesService } from "../services/families.service";

export const useFamilies = (page: number) =>
  useQuery({
    queryKey: ["families", page],
    queryFn: () => familiesService.findAll(page),
    placeholderData: keepPreviousData,
  });
