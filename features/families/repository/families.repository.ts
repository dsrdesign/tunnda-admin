import type { Page } from "@/lib/page";
import type { FamilyRow } from "../types/families.types";

export interface IFamiliesRepository {
  findAll(page: number): Promise<Page<FamilyRow>>;
}
