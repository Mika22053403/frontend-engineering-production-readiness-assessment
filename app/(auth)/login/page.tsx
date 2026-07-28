"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/store/auth-store";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  function handleLogin() {
    login({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });

    router.push("/contacts");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button onClick={handleLogin}>Login</Button>
    </main>
  );
}
