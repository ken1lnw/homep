"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutUsContent2() {
  const t = useTranslations("Content1");
  return (
    <>
      {/* <div className="hidden w-full  lg:grid lg:grid-cols-2 xl:p-5 bg-gray-100">
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
      </div> */}

      {/* Buttom for mobile and its left to right */}

      {/* <div className="lg:hidden w-full grid lg:grid-cols-2 xl:p-5 bg-gray-100">


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

        
      </div> */}

      <div className="relative w-full h-[350px] flex">
        <img
          src="/aboutimg/about2w.png"
          alt=""
          className="w-full h-full object-none xl:object-cover "
        />
        <div className="absolute inset-0 flex text-black container mx-auto items-center justify-end ">
          <div className="px-5 md:max-w-[50%] bg-gray-200/50 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            >
              {/* <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-blue-500"> */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-pink-500 ">
                {/* OEM */}

                PREMIUM AUTOMOTIVE LIGHTING PRODUCTS


              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-sm md:text-md my-2 "
            >
              TYC started its OEM business in 1992 with Ford of South Africa,
              formerly known as SAMCOR. With more than two decades of working
              closely with global OE Manufacturers, from design to manufacturing
              and supply, TYC has rapidly expanded it's OEM customer list.
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
}
