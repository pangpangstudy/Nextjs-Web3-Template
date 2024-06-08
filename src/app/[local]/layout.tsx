import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/contexts/Providers";
import Init from "../components/Layout/Init";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "You App Name",
  description: "You App description",
  openGraph: {
    title: "Your App Title - The Best Place for Your Needs",
    description: "Discover amazing features and services on our platform",
    // images: [{ url: "https://yourapp.com/default-image.jpg" }],
  },
};
// TODO:NEXT_SEO
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        {" "}
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
