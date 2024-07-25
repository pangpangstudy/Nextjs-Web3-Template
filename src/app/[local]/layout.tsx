import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/contexts/Providers";
import Init from "../../components/Layout/Init";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "You App Name",
//   description: "You App description",
//   openGraph: {
//     title: "Your App Title - The Best Place for Your Needs",
//     description: "Discover amazing features and services on our platform",
//     // images: [{ url: "https://yourapp.com/default-image.jpg" }],
//   },
// };
// CHANGE: intl  metadata
type Props = {
  children: ReactNode;
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">): Promise<Metadata> {
  try {
    const t = await getTranslations({ locale, namespace: "LocaleLayout" });
    return {
      metadataBase: new URL(process.env.BASE_URL!),
      title: t("title"),
      description: t("description"),
      keywords: t("keywords"),
      manifest: "/manifest.json",
      openGraph: {
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        // images: [{ url: "https://yourapp.com/default-image.jpg" }],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      metadataBase: new URL(process.env.BASE_URL!),
      title: "PWA Next.js",
      description: "Your App description",
      keywords: "you keywords",
      manifest: "/manifest.json",
      openGraph: {
        title: "Your App Title - The Best Place for Your Needs",
        description: "Discover amazing features and services on our platform",
      },
    };
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Init />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
