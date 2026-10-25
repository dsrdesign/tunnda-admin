import type { Page } from "@/lib/page";
import type { AuditRow } from "../types/audit.types";

export interface IAuditRepository {
  findAll(page: number): Promise<Page<AuditRow>>;
}
