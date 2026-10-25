import { auditApi } from "../api/audit.api";
import type { IAuditRepository } from "../repository/audit.repository";

class AuditService implements IAuditRepository {
  constructor(private readonly repository: IAuditRepository) {}
  findAll = (page: number) => this.repository.findAll(page);
}

export const auditService = new AuditService(auditApi);
