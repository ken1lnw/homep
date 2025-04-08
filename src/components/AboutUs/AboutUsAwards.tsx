"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
import "@/style/swiper-button-nav.css";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";

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

const data = [
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1432621805.png",
    text: "KYMCO Supplier's Award 2014",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386321.png",
    text: "Navistar Diamon Supplier 2014",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386457.png",
    text: "2nd Navistar Asian Supplier Summit 2014",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387340.png",
    text: "GM Platinum Supplier Summit 2014",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1431675779.png",
    text: "DUCATI Supplier's Award 2013",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387507.png",
    text: "AGCO Taiwan Award for New Product Development 2013",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387573.png",
    text: "1st Navistar Asian Supplier Summit 20105",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387619.png",
    text: "DUCATI Supplier's Award 2009",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387697.png",
    text: "Navistar Diamond Supplier 2009",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387743.png",
    text: " CAPA 25 YEARS AWARD 2005",
  },
  {
    imgURL:
      "https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387797.png",
    text: "Ford Q1 Preffered Quality Stats 2005",
  },
  
];

export default function AboutUsAwards() {
  const t = useTranslations("AboutUs");

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <>
      <div className="flex lg:flex-row flex-col bg-gray-200 py-5">
        <div className="lg:w-1/2 flex items-center p-4 gap-4 px-5 lg:hidden">
          <div className="flex flex-col ">
            <h1 className="text-6xl font-semibold text-pink-500">
              {/* Awards */}
              {t("award")}

            </h1>
            <p className="">
              {/* Our passion for, and devotion to, the innovative design of
              lighting products has gained recognition and merits among our
              peers. */}
              {t("desaward")}
            </p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={0}
            speed={600}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 0,
              stretch: 80,
              depth: 350,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              // When the screen width is less than 768px (md and below), show 1 slide
              320: {
                initialSlide: 5,
                slidesPerView: 2,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 100,
                  depth: 350,
                  modifier: 1,
                  slideShadows: true,
                },
              },
              // For larger screens (above 768px), show 5 slides
              768: {
                initialSlide: 5,
                slidesPerView: 4,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 40,
                  depth: 350,
                  modifier: 1,
                  slideShadows: true,
                },
              },

              1024: {
                initialSlide: 5,

                slidesPerView: 3,
              },

              1440: {
                initialSlide: 5,

                slidesPerView: 3,
              },

              1920: {
                initialSlide: 5,

                slidesPerView: 4,
              },
            }}
            modules={[EffectCoverflow, Pagination]}
            onSwiper={setSwiperInstance} // Store the swiper instance when initialized
          >
            {/* Your slides here */}

            {data.map((item, index) => (
               <SwiperSlide key={index}>
               <div className="flex flex-col items-center relative group ">
                 <img
                   className=""
                   src={item.imgURL}
                   alt=""
                 />
                <div className="max-w-[196px] absolute top-0  h-full flex items-center justify-center bg-black/80 bg-opacity-50 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.text}
                 </div>
               </div>
             </SwiperSlide>
            ))}

            {/* <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1432621805.png
 "
                  alt=""
                />

                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  KYMCO Supplier's Award 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386321.png "
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Navistar Diamon Supplier 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433386457.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  2nd Navistar Asian Supplier Summit 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387340.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  GM Platinum Supplier Summit 2014
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1431675779.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  DUCATI Supplier's Award 2013
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387507.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  AGCO Taiwan Award for New Product Development 2013
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387573.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  1st Navistar Asian Supplier Summit 2010
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387619.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  DUCATI Supplier's Award 2009
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387697.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Navistar Diamond Supplier 2009
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group">
                <img
                  className=""
                  src="	https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387743.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  CAPA 25 YEARS AWARD 2005{" "}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center relative group max-w-[196px]">
                <img
                  className=""
                  src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1433387797.png"
                  alt=""
                />
                <div className="absolute top-0  h-full flex items-center justify-center bg-black/60 bg-opacity-0 text-blue-500 font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ford Q1 Preffered Quality Stats 2005{" "}
                </div>
              </div>
            </SwiperSlide> */}

            {/* Other SwiperSlides */}
          </Swiper>
        </div>

        <div className="lg:w-1/2 hidden lg:flex items-center p-4 gap-4 px-5">
          <div className="flex flex-col ml-10">
            <h1 className="text-6xl font-semibold text-pink-500">
              {/* Awards */}
              {t("award")}
              
            </h1>
            <p className="whitespace-pre-wrap">
              {/* Our passion for, and devotion to, the innovative design of
              lighting products has gained recognition and merits among our
              peers. */}

{t("desaward")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
