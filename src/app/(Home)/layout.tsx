import { ReactNode } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import "@ant-design/v5-patch-for-react-19";
import { getLocale } from "next-intl/server";
import { Montserrat, Noto_Sans_Thai_Looped } from "next/font/google";
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
const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();
  const currentClassName =
    locale === "th" ? NotoFont.className : TYCFont.className;
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
