"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import "swiper/css";
// import "swiper/css/navigation";
import "@/style/swiper-button-nav.css";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";


export default function AboutUsContent4() {
  const t = useTranslations("AboutUs");

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  return (
    <>
      {/* <div className="w-full  grid lg:grid-cols-2 xl:p-5 mb-10  ">
        <div className="col-span-1 h-full my-2 flex flex-col p-4 gap-4 justify-center items-start px-5 md:my-0 md:h-[220px] lg:h-[250px]  lg:pl-32  ">
          <h1 className="text-6xl font-semibold text-blue-500">Certificate</h1>
          <p className="">
            TYC is ISO26262, IATF16949, ISO9001, ISO45001, ISO14064, Ford Q1 and
            AEO certified.
          </p>
        </div>

        <div className="col-span-1 justify-center lg:h-[250px]  flex lg:p-5 ">

          <div className="grid grid-cols-2 md:grid-cols-4 items-center">
          <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
              src="https://www.tyc.com.tw/assets/uploads/about/certification/icon1683682773.png"
              alt=""
              className=" h-40 object-cover bg-white  "
            />

            <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
              src="https://www.tyc.com.tw/assets/uploads/about/certification/icon1571625941.png"
              alt=""
              className=" h-40 object-cover bg-white "
            />

            <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.13, ease: "easeOut" }}
              src="https://www.tyc.com.tw/assets/uploads/about/certification/icon1436514436.png"
              alt=""
              className=" h-40 p-7 object-cover bg-white "
            />

            <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.14, ease: "easeOut" }}
              src="https://www.tyc.com.tw/assets/uploads/about/certification/icon1431670502.png"
              alt=""
              className=" h-40 p-3 object-cover bg-white "
            />

          </div>


      


        </div>
      </div> */}

      <div className="flex flex-col lg:grid lg:grid-cols-2 w-full py-5 ">
        <div className="items-center flex xl:justify-end">
          <div className=" h-full my-5  flex flex-col p-4 gap-4 justify-center items-start px-5 xl:my-0 ">
            <h1 className="text-6xl font-semibold text-blue-500">
              {/* Certificate */}
              {t("cer")}
            </h1>
            <p className="">
              {/* TYC is ISO26262, IATF16949, ISO9001, ISO45001, ISO14064, Ford Q1
              and AEO certified. */}
              {t("descer")}
            </p>
          </div>
        </div>
        <div className="flex  justify-center items-center xl:justify-start">
          <img
            src="/certificate/iso4in1.png"
            alt=""
            className="object-contain h-[200px] md:h-[250px] xl:h-[250px]"
          />
        </div>
      </div>

      
    </>
  );
}
