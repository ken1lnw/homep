"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutUsContent1() {
  const t = useTranslations("AboutUs");
  return (
    <>
      {/* <div className="w-full  grid lg:grid-cols-2 px-5"> */}
      {/* <div className="w-full  grid lg:grid-cols-2 ">

        <div className="col-span-1 h-full my-2 flex flex-col p-4 gap-4 justify-center items-start px-5 md:my-0 md:h-[220px] lg:h-[250px] xl:h-[350px]  ">


        <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-4xl xl:text-6xl font-semibold text-blue-500">
              We are the light experts
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="text-md"
          >
            TYC, built on decades of experience and technological advancements,
            strives to bring safety and happiness to people worldwide. With a
            strong focus and dedication to each product, we hope to become a
            beacon of light in every corner of the world.
          </motion.p>



          
        </div>

        <div className="col-span-1 h-[220px] lg:h-[250px] xl:h-[350px] flex ">
        <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            src="/production3.png"
            alt=""
            className="w-full  h-fullobject-cover "
          />
        </div>
      </div> */}

      <div className="relative w-full h-[350px]">
        <img
          src="/aboutimg/about1w.png"
          alt=""
          className="w-full h-full object-none xl:object-cover "
        />
        <div className="absolute inset-0 flex text-black  items-center">
          <div className="px-5 bg-white/50 md:bg-transparent h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-blue-500">
                {/* We are the light experts */}
                {t("weare")}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
              className="text-sm md:text-base md:w-1/2 my-2 whitespace-pre-line"
            >
              {/* TYC, built on decades of experience and technological
              advancements, strives to bring safety and happiness to people
              worldwide. With a strong focus and dedication to each product, we
              hope to become a beacon of light in every corner of the world. */}

              {/* Built on decades of experience and technological advancements, we
              have become a beacon of light in the night. Bringing safety and a
              smile to people is what has driven us all these years, and is what
              continues to motivate us daily. Hence, at TYC, we put a lot of
              focus and devotion on each one of our products in the dream that
              TYC will shine on every corner of the world. 
              <br/><br/>
              By exceeding all
              expectations, we are blazing forward as the company that knows,
              understands and delivers light. */}

              {t("desweare")}
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
}
