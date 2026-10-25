import { authClient } from "@/lib/api-client";
import type { IAuthRepository } from "../repository/auth.repository";
import type { AdminProfile } from "../types/auth.types";

class AuthApi implements IAuthRepository {
  async requestOtp(phoneNumber: string): Promise<void> {
    await authClient.post("/otp", { phoneNumber });
  }

  async verifyOtp(phoneNumber: string, code: string): Promise<AdminProfile> {
    const { data } = await authClient.post<{ admin: AdminProfile }>("/verify", {
      phoneNumber,
      code,
    });
    return data.admin;
  }

  async logout(): Promise<void> {
    await authClient.post("/logout");
  }
}

export const authApi = new AuthApi();
