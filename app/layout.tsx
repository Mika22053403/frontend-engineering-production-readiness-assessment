import type { Metadata } from "next";
import "./globals.css";

import { QueryProvider, ThemeProvider } from "@/providers";

export const metadata: Metadata = {
  title: "CampaignHQ",
  description: "CampaignHQ Contacts Module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
