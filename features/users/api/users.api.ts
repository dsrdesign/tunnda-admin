import { apiClient } from "@/lib/api-client";
import { PAGE_SIZE, type Page } from "@/lib/page";
import type { IUsersRepository } from "../repository/users.repository";
import type { UserFilters, UserRow } from "../types/users.types";

class UsersApi implements IUsersRepository {
  async findAll(filters: UserFilters, page: number): Promise<Page<UserRow>> {
    const { data } = await apiClient.get<Page<UserRow>>("/users", {
      params: {
        page,
        pageSize: PAGE_SIZE,
        status: filters.status,
        ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
      },
    });
    return data;
  }

  async suspend(id: string, reason: string): Promise<void> {
    await apiClient.post(`/users/${id}/suspend`, { reason });
  }

  async reactivate(id: string): Promise<void> {
    await apiClient.post(`/users/${id}/reactivate`);
  }
}

export const usersApi = new UsersApi();
