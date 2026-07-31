"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { authMutations } from "@/queries/auth.query";
import { useAuthStore } from "@/stores/auth-store";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const mutation = useMutation(authMutations.login());

  const handleLogin = async () => {
    const result = await mutation.mutateAsync({
      email: "admin@campaignhq.com",
      password: "password123",
    });

    login(result.token, result.user);

    router.push("/");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>CampaignHQ Login</CardTitle>
      </CardHeader>

      <CardContent>
        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </CardContent>
    </Card>
  );
}
