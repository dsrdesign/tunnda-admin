import { apiClient } from "@/lib/api-client";
import { PAGE_SIZE, type Page } from "@/lib/page";
import type { IAuditRepository } from "../repository/audit.repository";
import type { AuditRow } from "../types/audit.types";

class AuditApi implements IAuditRepository {
  async findAll(page: number): Promise<Page<AuditRow>> {
    const { data } = await apiClient.get<Page<AuditRow>>("/audit-logs", {
      params: { page, pageSize: PAGE_SIZE },
    });
    return data;
  }
}

export const auditApi = new AuditApi();
