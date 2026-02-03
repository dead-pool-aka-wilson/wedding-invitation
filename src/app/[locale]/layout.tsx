import type { Metadata } from "next";
import { ReactNode } from "react";
import { JetBrains_Mono, Instrument_Sans } from "next/font/google";
import "../globals.css";
import LanguageToggle from "@/components/LanguageToggle";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

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
    <html lang={locale} className={`${jetbrainsMono.variable} ${instrumentSans.variable}`}>
      <body className="bg-bg text-text font-sans">
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
