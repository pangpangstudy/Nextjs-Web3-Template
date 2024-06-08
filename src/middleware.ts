import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales, pathnames } from "./navigation";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!_next|.*\\..*).*)", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
