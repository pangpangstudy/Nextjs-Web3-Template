import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/contexts/Providers";
import Init from "./components/Layout/Init";

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Init />
          {children}
        </Providers>
      </body>
    </html>
  );
}
