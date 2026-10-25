import type { AdminProfile } from "../types/auth.types";

export interface IAuthRepository {
  requestOtp(phoneNumber: string): Promise<void>;
  verifyOtp(phoneNumber: string, code: string): Promise<AdminProfile>;
  logout(): Promise<void>;
}
