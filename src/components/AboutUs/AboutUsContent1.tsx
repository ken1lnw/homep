"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

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

export default function AboutUsContent1() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full h-[350px] flex  text-black my-10 px-5">
        <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-semibold text-blue-500">Who we are</h1>
          </motion.div>
          <motion.p 
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          className="">
            Founded with a passion for innovation and excellence, TYC is a
            leading manufacturer of high-quality automotive lighting solutions.
            Specializing in headlight production, we are committed to enhancing
            visibility, safety, and style for vehicles worldwide. Our mission is
            to provide cutting-edge lighting technology that meets the highest
            industry standards while exceeding customer expectations.
          </motion.p>
        </div>

        <div className="h-full w-1/2 flex p-5 ">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            src="https://www.sumipol.com/wp-content/uploads/2019/09/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95.jpg"
            alt=""
            className="w-full object-cover rounded-sm shadow-xl"
          />
        </div>
      </div>
    </>
  );
}
