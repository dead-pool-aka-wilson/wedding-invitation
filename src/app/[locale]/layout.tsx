import type { Metadata } from "next";
import { ReactNode } from "react";
import "../globals.css";
import LanguageToggle from "@/components/LanguageToggle";

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
      <body>
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
