"use client";
import { Locale, useRouter } from "@/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  // eg:
  const items = [
    { label: "中文", local: "zh" },
    { label: "English", local: "en" },
  ] as { label: string; local: Locale }[];
  const locale = useLocale() as Locale;
  function handleLocaleChange(newLocale: Locale): void {
    console.log(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }
  return (
    <div className="flex flex-row gap-4">
      {items.map((item) => {
        return (
          <button
            key={item.local}
            onClick={() => handleLocaleChange(item.local)}
            className={`${locale === item.local ? "text-red-500" : ""}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
