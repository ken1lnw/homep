/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion"

// Motion animation variant


const Content6page1 = () => {
  return (
    <>
      <div className="relative">
        {/* Black overlay div with 50% opacity */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-black opacity-80"></div>
        
        <img
          src="https://www.tyc.com.tw/assets/uploads/homepage/banner/banner1436519559.jpg"
          alt=""
          className=" w-full h-[500px] object-cover"
        />
        
        {/* Text content positioned in the center */}
        <div className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 text-white">

         <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0, ease: "easeOut" }}
                  >
          <h1 className="text-4xl font-bold">
          QUALITY AUTOMOTIVE PARTS WITH <br/>
          ROAD SAFETY ASSURANCE
          </h1>
          <p className="break-words my-6">
          At the heart of our mission is a commitment to providing top-quality automotive parts designed to ensure road safety. Our products are rigorously tested to meet the highest safety standards, giving you peace of mind and confidence on every journey. Trust in our expertise to keep you and your loved ones safe on the road.

          </p>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Content6page1;
