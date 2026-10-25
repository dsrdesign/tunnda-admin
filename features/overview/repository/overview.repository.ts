import type { Overview } from "../types/overview.types";

export interface IOverviewRepository {
  get(): Promise<Overview>;
}
