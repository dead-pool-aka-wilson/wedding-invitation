"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");

  const handleToggle = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale || "/"}`;
    router.push(newPath);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="px-3 py-1 text-sm font-medium rounded-md bg-text-bright text-bg hover:opacity-80 transition-opacity"
      aria-label="Toggle language"
    >
      {t("language")}
    </button>
  );
}
