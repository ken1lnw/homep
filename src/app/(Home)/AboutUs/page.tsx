import AboutUsAwards from "@/components/AboutUs/AboutUsAwards";
import AboutUsContent1 from "@/components/AboutUs/AboutUsContent1";
import AboutUsContent2 from "@/components/AboutUs/AboutUsContent2";

import AboutUsContent4 from "@/components/AboutUs/AboutUsContent4";
import AboutUsContent5 from "@/components/AboutUs/AboutUsContent5";
import HistoryComponent from "@/components/History/HistoryComponent";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[300px]  bg-black opacity-20" />

        <img
          src="/BannerHeadL2.png"
          alt="TYC Building"
          className="w-full h-[200px] lg:h-[300px] object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
          {t("title")}
            {/* About Us */}
          </h1>
          <p className="text-md md:text-xl font-bold">
          {t("des")}
            {/* Expect more , Expect TYC. */}
          </p>
        </div>
      </div>

      <AboutUsContent1 />

      <AboutUsContent2 />

      <AboutUsContent5 />

      <HistoryComponent/>

      
      {/* <div className="hidden lg:flex">
        <AboutUsContent3 />
      </div>


      <div className="lg:hidden">
        <AboutUsContent3Mobile />
      </div> */}

      <AboutUsAwards/>


      <AboutUsContent4 />
      {/* <AboutUsContent6/>  */}
    </div>
  );
}
