/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Motion animation variant

const Content6page1 = () => {
  const t = useTranslations("QualityA");

  return (
    <>
      <div className="relative">
        {/* Black overlay div with 50% opacity */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-black opacity-60"></div>

        <img
          src="https://www.tyc.com.tw/assets/uploads/homepage/banner/banner1436519559.jpg"
          alt=""
          className=" w-full h-[500px] object-cover"
        />

        {/* Text content positioned in the center */}
        <div className="absolute inset-0 flex items-center xl:w-1/2 xl:top-1/2 xl:left-1/2 xl:transform  xl:-translate-x-1/2  xl:-translate-y-1/2 px-6 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          >
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
              {/* QUALITY AUTOMOTIVE PARTS WITH <br/>
          ROAD SAFETY ASSURANCE */}
              {t("qua")} <br />
              {t("qua2")}
            </h1>
            <p className="text-md md:text-lg lg:text-xl break-words my-6">
              {/* For Replacement Aftermarket Automotive Spare Parts , With our
              comprehensive selection of aftermarket spare parts, we provide a
              one-stop-shop premium service to our customers. */}
                      {t("qua3")} <br/>
                      {t("qua4")}


            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Content6page1;
