/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Merriweather_Sans,
  Slabo_13px,
  Pridi,
  Prompt,
  Mitr,
  IBM_Plex_Sans_Thai,
  Noto_Sans_Thai_Looped,
  Montserrat,
} from "next/font/google";
import "./globals.css";

// import Image from "next/image";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { CustomQueryClientProvider } from "@/hook/QueryClientProvider";
import { App } from "antd";
// import "@/style/swiper-button-home1.css"
import { Toaster } from "@/components/ui/sonner";
import ReooilProvider from "@/hook/RecoilRoot";
import { TooltipProvider } from "@/components/ui/tooltip";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const MerriweatherSans = Merriweather_Sans({
//   // variable: "--font-salabo-13px",
//   subsets: ["latin"],
//   weight: "400",
// });

// const SlaboSans = Slabo_13px ({
//   variable: "--font-slabo-13px",
//   subsets: ["latin"],
//   weight: "400",
// });

const PridiFont = Pridi({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const PromptFont = Prompt({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const MitrFont = Mitr({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const IBMFont = IBM_Plex_Sans_Thai({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const NotoFont = Noto_Sans_Thai_Looped({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const TYCFont = Montserrat({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "500",
});


export const metadata: Metadata = {
  title: "TYC Thailand",
  description: "Light Intelligence Safety",
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
  // const currentClassName = locale === 'th' ? NotoFont.className : TYCFont.className;

  return (
    <html lang={locale}>
      <body
      >
        <CustomQueryClientProvider>
          {/* <ReooilProvider> */}
            <NextIntlClientProvider messages={messages}>
              <TooltipProvider>
                {children}
                <Toaster richColors position="top-center" />
              </TooltipProvider>
            </NextIntlClientProvider>
          {/* </ReooilProvider> */}
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
