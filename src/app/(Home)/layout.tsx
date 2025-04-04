import { ReactNode } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import "@ant-design/v5-patch-for-react-19";
import { getLocale } from "next-intl/server";
import { IBM_Plex_Sans_Thai, Mitr, Montserrat, Noto_Sans_Thai_Looped, Pridi, Prompt } from "next/font/google";
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



const PridiFont = Pridi ({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const PromptFont = Prompt ({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const MitrFont = Mitr ({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});

const IBMFont = IBM_Plex_Sans_Thai ({
  // variable: "--font-slabo-13px",
  subsets: ["latin"],
  weight: "400",
});



const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();
  const currentClassName =
    locale === "th" ? PromptFont.className : TYCFont.className;
  return (
    <section className={currentClassName}>
      <div className="flex flex-col min-h-screen">
        <Navbar2 />
        <main className="flex-grow pt-[56px]">{children}</main>{" "}
        {/* เพิ่ม padding-top */}
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
