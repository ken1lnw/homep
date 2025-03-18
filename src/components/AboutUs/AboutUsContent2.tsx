'use client'
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

export default function AboutUsContent2() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full h-[350px] flex  text-black mb-10  px-5 bg-gray-100">
        <div className="h-full w-1/2 flex p-5">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            src="https://genera.com/_images/mini-banner-02.jpg"
            alt=""
            className="w-full h-full object-cover rounded-sm shadow-xl"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
          <motion.h1 
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-6xl font-semibold text-pink-500">OEM</motion.h1>
          <motion.p 
           initial={{ opacity: 0, x: 200 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
           className="">
TYC started its OEM business in 1992 with Ford of South Africa, 
formerly known as SAMCOR. With more than two decades of working closely 
with global OE Manufacturers, from design to manufacturing and supply, TYC has rapidly expanded it's OEM customer list.                                    
          </motion.p>
        </div>
      </div>
    </>
  );
}
