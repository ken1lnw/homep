/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather_Sans } from "next/font/google";
import "./globals.css";
// import Image from "next/image";
import '@ant-design/v5-patch-for-react-19';
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { CustomQueryClientProvider } from "@/hook/QueryClientProvider";
import { App } from "antd";
// import "@/style/swiper-button-home1.css"
import { Toaster } from "@/components/ui/sonner"
import ReooilProvider from "@/hook/RecoilRoot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MerriweatherSans = Merriweather_Sans({
  // variable: "--font-salabo-13px",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TYC Example",
  description: "TYC",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={MerriweatherSans.className}
      >
        <CustomQueryClientProvider>
          <ReooilProvider>
          <NextIntlClientProvider messages={messages}>
              {children}
              <Toaster richColors position="top-center" />
          </NextIntlClientProvider>
          </ReooilProvider>
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
