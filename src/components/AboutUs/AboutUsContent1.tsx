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
      <div className="w-full h-[350px] flex  text-black my-5 px-5">
        <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-semibold text-blue-500">We are the light experts</h1>
          </motion.div>
          <motion.p 
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          className="">
            TYC, built on decades of experience and technological advancements, 
            strives to bring safety and happiness to people worldwide. 
            With a strong focus and dedication to each product, 
            we hope to become a beacon of light in every corner of the world.
          </motion.p>
        </div>

        <div className="h-full w-1/2 flex p-5 ">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            src="https://genera.com/_images/About-mini-02.jpg"
            alt=""
            className="w-full object-cover rounded-sm shadow-xl"
          />
        </div>
      </div>
    </>
  );
}
