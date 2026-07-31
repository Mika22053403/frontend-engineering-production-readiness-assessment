"use client";

import { useEffect, useState } from "react";

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function startWorker() {
      if (process.env.NODE_ENV !== "development") {
        setReady(true);
        return;
      }

      try {
        const { worker } = await import("@/mocks/browser");

        await worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
        });

        console.log("[MSW] Worker started");

        setReady(true);
      } catch (error) {
        console.error("[MSW] Failed to start", error);

        setReady(true);
      }
    }

    startWorker();
  }, []);

  return ready ? <>{children}</> : null;
}
