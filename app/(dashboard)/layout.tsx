"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/store/auth-store";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-bold">CampaignHQ</h1>
          <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <main>{children}</main>
    </>
  );
}
