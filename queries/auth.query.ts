import { mutationOptions } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const authMutations = {
  login: () =>
    mutationOptions({
      mutationFn: authService.login,
    }),
};