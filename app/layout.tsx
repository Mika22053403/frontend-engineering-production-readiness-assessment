import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import MSWProvider from "@/providers/msw-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CampaignHQ",
  description: "Contacts Module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <QueryProvider>{children}</QueryProvider>
        </MSWProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
