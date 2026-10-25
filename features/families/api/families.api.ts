import { apiClient } from "@/lib/api-client";
import { PAGE_SIZE, type Page } from "@/lib/page";
import type { IFamiliesRepository } from "../repository/families.repository";
import type { FamilyRow } from "../types/families.types";

class FamiliesApi implements IFamiliesRepository {
  async findAll(page: number): Promise<Page<FamilyRow>> {
    const { data } = await apiClient.get<Page<FamilyRow>>("/families", {
      params: { page, pageSize: PAGE_SIZE },
    });
    return data;
  }
}

export const familiesApi = new FamiliesApi();
