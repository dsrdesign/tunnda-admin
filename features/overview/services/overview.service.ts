import { overviewApi } from "../api/overview.api";
import type { IOverviewRepository } from "../repository/overview.repository";

class OverviewService implements IOverviewRepository {
  constructor(private readonly repository: IOverviewRepository) {}
  get = () => this.repository.get();
}

export const overviewService = new OverviewService(overviewApi);
