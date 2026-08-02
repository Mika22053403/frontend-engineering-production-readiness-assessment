import type { Metadata } from "next";
import "./globals.css";

import MswProvider from "@/components/providers/msw-provider";
import QueryProvider from "@/components/providers/query-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "CampaignHQ",
  description: "CampaignHQ Contacts Module",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MswProvider>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </MswProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
