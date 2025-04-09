/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper core type for typing the swiper instance
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// **Motion animation variant** (Parent)
const parentVariant = {
  animate: {
    transition: {
      staggerChildren: 0.3, // เวลาหน่วงการแสดงผลของแต่ละสไลด์
    },
  },
};

// **Motion animation variant** (Children)
const fadeUpVariant = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.2, // ทำให้แต่ละอันหน่วงเวลากันไป
    },
  }),
};

const Content2page1 = () => {
  const t = useTranslations("Content1");

  // Type the state as SwiperType | null
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Function to handle next slide
  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  // Function to handle previous slide
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  // สร้าง Array สำหรับข้อมูลสินค้า
  const products = [
    {
      // src: "https://www.genera.com/_images/Headlight.png",
      src: "slide1/head light.png",
      name: "AUTOMOTIVE LAMP",
    },
    { src: "slide1/Alternator.png", name: "STARTING & CHARGING" },
    {
      src: "slide1/Mirror.png",
      name: "MIRRORS",
    },
    { src: "slide1/Window_Regulator.png", name: "WINDOW REGULATORS" },
    {
      src: "slide1/Fuel_Pump.png",
      name: "FUEL PUMPS",
    },
    { src: "slide1/TOC.png", name: "TRANSMISSION OIL COOLERS" },
    {
      src: "slide1/CAC.png",
      name: "CAC",
    },
  ];

  return (
    <>
      <div className="relative">
        {/* <img
          src="/lrblue.png"
          alt=""
          className="absolute h-full w-full xl:object-cover object-fill"
        /> */}
        <div className="relative">
          <h1 className="flex justify-center my-5 text-5xl font-bold text-[#0172E5]">
            {t("Products")}
          </h1>

          <div className="mx-5 md:mx-20 lg:mx-32 xl:mx-50 my-14 relative">
            <motion.div
              variants={parentVariant}
              initial="initial"
              animate="animate"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={5} // Show 5 slides at a time
                breakpoints={{
                  // When the screen width is less than 768px (md and below), show 1 slide
                  320: {
                    slidesPerView: 1,
                  },
                  // For larger screens (above 768px), show 5 slides
                  768: {
                    slidesPerView: 4,
                  },

                  1024: {
                    slidesPerView: 5,
                  },
                }}
                onSwiper={setSwiperInstance} // Store the swiper instance when initialized
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      variants={fadeUpVariant}
                      initial="initial"
                      animate="animate"
                      custom={index} // ใช้ index เป็นตัวกำหนด delay
                    >
                      <div className="flex flex-col items-center">
                        <img
                          className="w-44"
                          src={product.src}
                          alt={product.name}
                        />
                        <div className="text-black mt-2 text-center">
                          {product.name}
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* Custom navigation arrows */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 z-10">
              <button onClick={handlePrev} className="text-4xl text-black p-2">
                <LeftOutlined />
              </button>
              <button onClick={handleNext} className="text-4xl text-black p-2">
                <RightOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content2page1;
