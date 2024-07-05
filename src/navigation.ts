import { LocalePrefix } from "./types";
import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";
export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en";
export const localePrefix = process.env
  .NEXT_PUBLIC_LOCALE_PREFIX as LocalePrefix;
export const pathnames = {
  "/": "/",
  "/example": {
    en: "/example",
    zh: "/example2",
  },
} satisfies Pathnames<typeof locales>;
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
  });
