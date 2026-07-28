import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import MSWProvider from "@/providers/msw-provider";

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
      </body>
    </html>
  );
}
