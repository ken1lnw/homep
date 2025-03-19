"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutUsContent2() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="hidden w-full  lg:grid lg:grid-cols-2 xl:p-5 bg-gray-100">
        <div className="col-span-1 h-[220px] lg:h-[250px] xl:h-[350px] flex lg:p-5 ">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            src="https://genera.com/_images/mini-banner-02.jpg"
            alt=""
            className="w-full object-cover lg:rounded-sm lg:shadow-xl"
          />
        </div>

        <div className="col-span-1 h-full my-2 flex flex-col p-4 gap-4 justify-center items-start px-5 md:my-0 md:h-[220px] lg:h-[250px] xl:h-[350px]  ">
          <motion.h1
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-5xl lg:text-4xl xl:text-6xl font-semibold text-pink-500"
          >
            OEM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-md"
          >
            TYC started its OEM business in 1992 with Ford of South Africa,
            formerly known as SAMCOR. With more than two decades of working
            closely with global OE Manufacturers, from design to manufacturing
            and supply, TYC has rapidly expanded it's OEM customer list.
          </motion.p>
        </div>
      </div>


 
 {/* Buttom for mobile and its left to right */}




      <div className="lg:hidden w-full grid lg:grid-cols-2 xl:p-5 bg-gray-100">


      <div className="col-span-1 h-full my-2 flex flex-col p-4 gap-4 justify-center items-start px-5 md:my-0 md:h-[220px] lg:h-[250px] xl:h-[350px]  ">
          <motion.h1
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-5xl lg:text-4xl xl:text-6xl font-semibold text-pink-500"
          >
            OEM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-md"
          >
            TYC started its OEM business in 1992 with Ford of South Africa,
            formerly known as SAMCOR. With more than two decades of working
            closely with global OE Manufacturers, from design to manufacturing
            and supply, TYC has rapidly expanded it's OEM customer list.
          </motion.p>
        </div>



        <div className="col-span-1 h-[220px] lg:h-[250px] xl:h-[350px] flex lg:p-5 ">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            src="https://genera.com/_images/mini-banner-02.jpg"
            alt=""
            className="w-full object-cover lg:rounded-sm lg:shadow-xl"
          />
        </div>

        
      </div>
    </>
  );
}
