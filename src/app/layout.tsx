import type { Metadata } from "next";
import {
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
// import "@/style/swiper-button-home1.css"
import { Toaster } from "@/components/ui/sonner";
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


export const metadata: Metadata = {
  title: "TYC HomePage",
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
  // const currentClassName = locale === 'th' ? NotoFont.className : TYCFont.className;

  return (
    <html lang={locale}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      // className={`${TYCFont.className}`}
      // className={MitrFont.className}
      // className={IBMFont.className}
      // className={NotoFont.className}
      // className={currentClassName}
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
