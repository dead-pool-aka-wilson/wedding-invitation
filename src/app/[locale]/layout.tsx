import type { Metadata } from "next";
import { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Hong Kong Parallax Wedding Invitation",
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
