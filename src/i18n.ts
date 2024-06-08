"server-only";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./navigation";
import defaultMessages from "../messages/en.json";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  const localMessage = (await import(`../messages/${locale}.json`)).default;
  const messages = { ...defaultMessages, ...localMessage };
  return {
    messages,
    formats: {
      dateTime: {
        medium: {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: false,
        },
      },
    },
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === "production"
          ? "MISSING_MESSAGE"
          : "MISSING_MESSAGE: Could not resolve `missing` in `Index`.")
      ) {
        // Do nothing, this error is triggered on purpose
      } else {
        console.error(JSON.stringify(error.message));
      }
    },
    // 消息回退函数，用于在消息缺失时提供回退消息
    getMessageFallback({ key, namespace }) {
      return (
        "`getMessageFallback` called for " +
        [namespace, key].filter((part) => part != null).join(".")
      );
    },
  };
});
