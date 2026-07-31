import { api } from "@/lib/api";
import { LoginPayload, LoginResponse } from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", payload);
    return response.data;
  },
};