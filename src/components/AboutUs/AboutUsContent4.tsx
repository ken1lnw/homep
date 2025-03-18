"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "swiper/css";
// import "swiper/css/navigation";
import "@/style/swiper-button-nav.css";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";

const fadeUpVariant = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function AboutUsContent4() {
  const t = useTranslations("Content1");

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Function to handle next slide
  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  // Function to handle previous slide
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  return (
    <>
      <div className="w-full h-[200px] flex text-black my-10">
        <div className="w-1/2 flex flex-col justify-center items-start gap-4 pl-32 ">
          <h1 className="text-6xl font-semibold text-blue-500">Certificate</h1>
          <p className="">
            TYC is ISO26262, IATF16949, ISO9001, ISO45001, ISO14064, Ford Q1 and
            AEO certified.
          </p>
        </div>

        <div className=" w-1/2 flex justify-center items-center  ">
          {/* <img
            src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1594263201.jpg"
            alt=""
            className=" object-cover rounded-sm shadow-xl"
          />

          <img
            src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1432621805.png"
            alt=""
            className=" object-cover rounded-sm shadow-xl"
          /> */}

          <motion.img
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            src="https://www.tyc.com.tw/assets/uploads/about/certification/icon1683682773.png"
            alt=""
            className=" h-40 object-cover bg-white "
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
    </>
  );
}
