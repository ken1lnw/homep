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

export default function AboutUsContent5() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full h-[350px] flex  text-blac  px-5 ">

      <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
          <motion.h1 
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-6xl font-semibold text-blue-500">QUALITY ASSURANCE</motion.h1>
          <motion.p 
           initial={{ opacity: 0, x: -200 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
           className="">
Our top priorities are quality automotive products, exceptional customer service, and on-time delivery. These priorities make quality assurance one of the most important aspects of our operations.

The automotive products we sell must meet or exceed our customers' expectations, from purchasing quality raw materials through design and engineering, to production and delivery through (most importantly) customer-oriented after-sales service.                            
          </motion.p>
        </div>

        
        <div className="h-full w-1/2 flex p-5">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            src="https://genera.com/_images/About-img-01.jpg"
            alt=""
            className="w-full h-full object-contain  bg-white"
          />
        </div>

      
      </div>
    </>
  );
}
