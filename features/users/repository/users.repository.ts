import type { Page } from "@/lib/page";
import type { UserFilters, UserRow } from "../types/users.types";

export interface IUsersRepository {
  findAll(filters: UserFilters, page: number): Promise<Page<UserRow>>;
  suspend(id: string, reason: string): Promise<void>;
  reactivate(id: string): Promise<void>;
}
