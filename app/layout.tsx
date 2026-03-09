import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIGGED — Automated Oil Stock Distributor",
  description: "Hold $RIGGED. Earn real oil-stock yield. Powered by Ondo Finance & Meteora.",
  openGraph: {
    title: "RIGGED — Automated Oil Stock Distributor",
    description: "Hold $RIGGED. Earn real oil-stock yield powered by Ondo Finance & Meteora.",
    siteName: "RIGGED",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIGGED — Automated Oil Stock Distributor",
    description: "Hold $RIGGED. Earn real oil-stock yield powered by Ondo Finance & Meteora.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
