import { ReactQueryProvider } from "@/lib/query/provider.query";
import { ThemeProvider } from "@/providers/theme/index.provider";
import {
  HTML_META_DESCRIPTION,
  HTML_META_KEYWORDS,
  HTML_TITLE,
} from "@/utils/seo/index.util";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: HTML_TITLE,
  description: HTML_META_DESCRIPTION,
  keywords: HTML_META_KEYWORDS,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <Toaster />

            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
