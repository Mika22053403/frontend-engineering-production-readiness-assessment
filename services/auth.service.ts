import { api } from "@/lib/api";
import { LoginPayload, LoginResponse, SignupPayload } from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", payload);
    return response.data;
  },

  async signup(payload: SignupPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/signup", payload);
    return response.data;
  },
};