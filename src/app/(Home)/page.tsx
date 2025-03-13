"use client";

import Content1page1 from "@/components/Home/content1";
import Content2page1 from "@/components/Home/content2";
import Content3page1 from "@/components/Home/content3";
import Content4page1 from "@/components/Home/content4";
import Content5page1 from "@/components/Home/content5";
import Content6page1 from "@/components/Home/content6";
import { useTranslations } from "next-intl";


export default function Home() {
  // const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col">
      {/* <h1>{t("title")}</h1> */}

      <Content1page1 />
      <Content2page1 />
      <Content3page1 />
      <Content4page1 />
      <Content6page1 />
      <Content5page1 />

      {/* <div className="w-full h-[600px] bg-black/20">
  <div className="text-white flex justify-center items-center h-full">
    Image
  </div>
</div> */}

      {/* <div className="w-full h-[600px] bg-green-300/20">
  <div className="text-white flex justify-center items-center h-full">
    Image 2
  </div>
</div> */}
    </div>
  );
}
