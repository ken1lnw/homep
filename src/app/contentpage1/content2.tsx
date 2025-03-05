/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper core type for typing the swiper instance
import { Swiper as SwiperType } from "swiper";

// Motion animation variant
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

const Content2page1 = () => {
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

  return (
    <>

<h1 className="flex justify-center my-5 text-4xl font-bold">Products</h1>

      <div className="mx-50 my-14 relative">


        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={5} // Show 5 slides at a time
          // spaceBetween={20} // Space between slides
          onSwiper={setSwiperInstance} // Store the swiper instance when initialized
        >
          {/* Your slides here */}
          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://www.genera.com/_images/Headlight.png" alt="" />
                <div className="text-black mt-2">AUTOMOTIVE LAMP</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/Alternator.png" alt="" />
                <div className="text-black mt-2">HAVC</div>
              </div>
            </motion.div>
          </SwiperSlide>


          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/Mirror.png" alt="" />
                <div className="text-black mt-2">STARTING & CHARGING</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/Window_Regulator.png" alt="" />
                <div className="text-black mt-2">MIRRORS</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/Fuel_Pump.png" alt="" />
                <div className="text-black mt-2">WINDOW REGULATORS</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/TOC.png" alt="" />
                <div className="text-black mt-2">FUEL PUMPS</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-44" src="https://genera.com/_images/CAC.png" alt="" />
                <div className="text-black mt-2">TRANSMISSION OIL COOLERS</div>
              </div>
            </motion.div>
          </SwiperSlide>
          {/* Other SwiperSlides */}
        </Swiper>

        {/* Custom navigation arrows */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 z-10">
          <button
            onClick={handlePrev}
            className="text-4xl text-black p-2"
            style={{ zIndex: 10 }}
          >
            <LeftOutlined />
          </button>
          <button
            onClick={handleNext}
            className="text-4xl text-black p-2"
            style={{ zIndex: 10 }}
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

export default Content2page1;
