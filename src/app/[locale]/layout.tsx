import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wedding.example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#06080d",
};

export const metadata: Metadata = {
  title: "지훈 ♥ 수진 Wedding Invitation",
  description: "2025년 4월 4일 토요일, 저희 결혼식에 초대합니다",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "지훈 ♥ 수진 Wedding Invitation",
    description: "2025년 4월 4일 토요일, 저희 결혼식에 초대합니다",
    url: siteUrl,
    siteName: "Wedding Invitation",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 1200,
        alt: "지훈 ♥ 수진 Wedding Invitation",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "지훈 ♥ 수진 Wedding Invitation",
    description: "2025년 4월 4일 토요일, 저희 결혼식에 초대합니다",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
      <body className="bg-bg text-text font-sans safe-area-inset-top safe-area-inset-bottom prevent-zoom">
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
