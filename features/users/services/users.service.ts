import { usersApi } from "../api/users.api";
import type { IUsersRepository } from "../repository/users.repository";
import type { UserFilters } from "../types/users.types";

class UsersService implements IUsersRepository {
  constructor(private readonly repository: IUsersRepository) {}

  findAll = (filters: UserFilters, page: number) =>
    this.repository.findAll(filters, page);
  suspend = (id: string, reason: string) => this.repository.suspend(id, reason);
  reactivate = (id: string) => this.repository.reactivate(id);
}

export const usersService = new UsersService(usersApi);
