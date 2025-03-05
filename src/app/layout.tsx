/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
// import Image from "next/image";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TYC Example",
  description: "TYC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <nav className="bg-black/70 sticky top-0 z-10 border-b font-semibold border-gray-200 backdrop-filter backdrop-blur-3xl bg-opacity-30">
        <div className=" mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold flex items-center">
         

              <Image
                src="/image.png"
                width={120}
                height={30}
                alt="Picture of the author"
              />
              <div className="text-white text-sm ml-4"> ISO 9001:2015 Certified </div>
            </span>
            <div className="flex space-x-4 text-white">
              <a className="hover:bg-amber-700" href="#">
                Dashboard
              </a>
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </nav> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar/> */}
        <Navbar2/>

        {children}
        <Footer/>
      </body>
    </html>
  );
}
