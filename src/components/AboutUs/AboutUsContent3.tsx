"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
import "@/style/swiper-button-nav.css";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";



export default function AboutUsContent3() {
  const t = useTranslations("Content1");

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  return (
    <>
      <div className="w-full h-[300px] flex  text-black  px-5 bg-gray-200">
        <div className="h-[300px] w-2/3 flex py-5 items-center">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            slidesPerView={6} // Show 5 slides at a time
            // spaceBetween={-40} // ✅ เพิ่มระยะห่างระหว่าง slides
            onSwiper={setSwiperInstance} // Store the swiper instance when initialized
            // style={{
            //   color: "black"
            // //   background : "black"
            // }}
            // allowSlideNext={false}
            breakpoints={{
              // When the screen width is less than 768px (md and below), show 1 slide
              320: {
                slidesPerView: 1,
              },
              // For larger screens (above 768px), show 5 slides
              768: {
                slidesPerView: 3,
              },

              1024: {
                slidesPerView: 3,
              },

              1440: {
                slidesPerView: 5,
              },
            }}
            
          >
            {/* Your slides here */}
            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1594263201.jpg"
                  alt="Supplier Quality Excellence Award 2019"
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Supplier Quality Excellence Award 2019
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.11, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1432621805.png
 "
                  alt=""
                />

                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  KYMCO Supplier&APOS;s Award 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386321.png "
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Navistar Diamon Supplier 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.13, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386457.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  2nd Navistar Asian Supplier Summit 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.14, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387340.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  GM Platinum Supplier Summit 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1431675779.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  DUCATI Supplier&APOS;s Award 2013
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.16, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387507.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  AGCO Taiwan Award for New Product Development 2013
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.17, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387573.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  1st Navistar Asian Supplier Summit 2010
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.18, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387619.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  DUCATI Supplier&APOS;s Award 2009
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.19, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387697.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Navistar Diamond Supplier 2009
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.20, ease: "easeOut" }}
                  className="w-32 h-full"
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387743.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  CAPA 25 YEARS AWARD 2005{" "}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <motion.img
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.21 , ease: "easeOut" }}
                  className="w-32 h-full"
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387797.png"
                  alt=""
                />
                <div className="absolute top-0 w-44 h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ford Q1 Preffered Quality Stats 2005{" "}
                </div>
              </div>
            </SwiperSlide>

            {/* Other SwiperSlides */}
          </Swiper>
        </div>

        <div className="w-1/3 flex flex-col justify-center items-start p-4 gap-4 ">
          <h1 className="text-6xl font-semibold text-pink-500">Awards</h1>
          <p className="">
            Our passion for, and devotion to, the innovative design of lighting
            products has gained recognition and merits among our peers.
          </p>
        </div>
      </div>
    </>
  );
}
