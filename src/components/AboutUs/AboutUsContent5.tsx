"use client";
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
      <div className="w-full  grid lg:grid-cols-2 xl:p-5">
        <div className="col-span-1 h-full my-5 flex flex-col p-4 gap-4 justify-center items-start px-5 xl:my-0 md:h-[220px] lg:h-[250px] xl:h-[350px]  ">
          <motion.h1
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}

            className="text-5xl lg:text-4xl xl:text-6xl font-semibold text-blue-500"
          >
            QUALITY ASSURANCE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}

            className=""
          >
            Our top priorities are quality automotive products, exceptional
            customer service, and on-time delivery. These priorities make
            quality assurance one of the most important aspects of our
            operations. The automotive products we sell must meet or exceed our
            customers' expectations, from purchasing quality raw materials
            through design and engineering, to production and delivery through
            (most importantly) customer-oriented after-sales service.
          </motion.p>
        </div>

        <div className="col-span-1 h-[220px] lg:h-[250px] xl:h-[350px] flex lg:p-5 ">
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
