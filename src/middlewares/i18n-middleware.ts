import createMiddleware from "next-intl/middleware";
import { MiddlewareFactory } from "./types";
export const withIntl: MiddlewareFactory = (next) => {
  const intlMiddleware = createMiddleware({
    locales: ["en", "de"],
    defaultLocale: "en",
  });

  return async (req, ev) => {
    const response = intlMiddleware(req);
    if (response) {
      return response;
    }
    return next(req, ev);
  };
};
