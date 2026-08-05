"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md rounded-lg border p-8 text-center">
        <h1 className="text-3xl font-bold text-destructive">
          Something went wrong
        </h1>

        <p className="mt-3 text-muted-foreground">
          {error.message || "Unexpected error occurred."}
        </p>

        <Button className="mt-6" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </main>
  );
}
