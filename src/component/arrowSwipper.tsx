/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const ArrowSwipper = () => {
  const swiper = useSwiper(); // Access the Swiper instance

  // Function to handle next slide
  const handleNext = () => {
    swiper.slideNext();
  };

  // Function to handle previous slide
  const handlePrev = () => {
    swiper.slidePrev();
  };

  return (
    <>
      <div className="mx-50 my-14">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={5} // Show 5 slides at a time
          spaceBetween={20} // Space between slides
        >
          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-32" src="https://www.genera.com/_images/Headlight.png" alt="" />
                <div className="text-black mt-2">AUTOMOTIVE LAMP</div>
              </div>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
              <div className="flex flex-col items-center">
                <img className="w-32" src="https://www.genera.com/_images/Cooling_Fan.png" alt="" />
                <div className="text-black mt-2">HAVC</div>
              </div>
            </motion.div>
          </SwiperSlide>

          {/* Add other SwiperSlides here */}

        </Swiper>

        {/* Custom navigation arrows */}
        {/* <div className="flex justify-between mt-4">
          <button onClick={handlePrev} className="swiper-button-prev">
            Prev
          </button>
          <button onClick={handleNext} className="swiper-button-next">
            Next
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ArrowSwipper;
