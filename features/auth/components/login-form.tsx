"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { authMutations } from "@/queries/auth.query";
import { useAuthStore } from "@/stores/auth-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampaignHQLogo } from "@/components/layout/campaignhq-logo";

export default function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const mutation = useMutation(authMutations.login());

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event?: React.FormEvent) => {
    event?.preventDefault();

    const result = await mutation.mutateAsync({
      email: "admin@campaignhq.com",
      password: "password123",
    });

    login(result.token, result.user);

    router.push("/");
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <CampaignHQLogo markOnly height={56} />

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your CampaignHQ workspace
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue="admin@campaignhq.com"
            readOnly
            className="bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              defaultValue="password123"
              readOnly
              className="bg-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-full text-base"
          size="lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Loader2 className="size-4 animate-spin" />}
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}