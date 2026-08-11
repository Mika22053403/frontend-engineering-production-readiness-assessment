import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import MswProvider from "@/components/providers/msw-provider";
import QueryProvider from "@/components/providers/query-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampaignHQ | Contacts",
  description: "CampaignHQ Contacts Module",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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