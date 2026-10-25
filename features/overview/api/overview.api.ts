import { apiClient } from "@/lib/api-client";
import type { IOverviewRepository } from "../repository/overview.repository";
import type { Overview } from "../types/overview.types";

class OverviewApi implements IOverviewRepository {
  async get(): Promise<Overview> {
    const { data } = await apiClient.get<Overview>("/overview");
    return data;
  }
}

export const overviewApi = new OverviewApi();
