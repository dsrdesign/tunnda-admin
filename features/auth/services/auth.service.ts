import { authApi } from "../api/auth.api";
import type { IAuthRepository } from "../repository/auth.repository";

class AuthService implements IAuthRepository {
  constructor(private readonly repository: IAuthRepository) {}

  requestOtp = (phoneNumber: string) => this.repository.requestOtp(phoneNumber);
  verifyOtp = (phoneNumber: string, code: string) =>
    this.repository.verifyOtp(phoneNumber, code);
  logout = () => this.repository.logout();
}

export const authService = new AuthService(authApi);
