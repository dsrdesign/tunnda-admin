import { familiesApi } from "../api/families.api";
import type { IFamiliesRepository } from "../repository/families.repository";

class FamiliesService implements IFamiliesRepository {
  constructor(private readonly repository: IFamiliesRepository) {}
  findAll = (page: number) => this.repository.findAll(page);
}

export const familiesService = new FamiliesService(familiesApi);
