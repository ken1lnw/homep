"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "@/style/swiper-button-homepage.css";
import "swiper/css/effect-fade";
// import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper core type for typing the swiper instance
import { Swiper as SwiperType } from "swiper";

export default function Content1page1() {
  const t = useTranslations("Content1");

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
      <Swiper
        modules={[EffectFade, Navigation, Pagination]}
        navigation={true}
        effect={""}
        onSwiper={setSwiperInstance} // Store the swiper instance when initialized
        className="    h-[480px] w-full"
      >
        <SwiperSlide>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-75" />

            {/* รูปภาพ */}
            <img
              className="h-[480px] w-full object-cover"
              src="https://www.tyc.com.tw/assets/uploads/homepage/banner/banner1681711252.jpg"
              alt=""
            />
            {/* กล่องข้อความที่อยู่กลางภาพ */}

            {/* <div className="absolute inset-0 flex flex-col  justify-center mr-56">
              <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg text-right">
                Light
              </div>
              <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-right">
                <p>
                  We are inspired
                  <br /> as we light-up the world.
                </p>
              </div>
            </div>
 */}

            <div className="absolute inset-0 flex flex-col items-center justify-center ">
              <div className="text-white text-7xl md:text-8xl lg:text-9xl font-bold px-4 py-2 rounded-lg ">
                Light. Intelligence. Safety.
              </div>
              <div className="text-white text-2xl md:text-4xl font-bold px-4 py-2 rounded-lg text-center ">
                <p>
                  We are inspired as we light-up the world.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-80" />
            <img
              className="h-[480px] w-full object-cover"
              // src="https://www.laherramienta.com/wp-content/uploads/2023/01/sum_ind_prtda.jpg"

              src="https://genera.com/_images/About-img-02.jpg"
              alt=""
            />
            
            {/* <div className="absolute inset-0 flex flex-col  justify-center ml-56">
              <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg text-left">
                Intelligence
              </div>
              <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-left">
                <p>
                  
                  We observe and create.
                </p>
              </div>
            </div>
            */}
           
            <div className="absolute inset-0 flex flex-col items-center justify-center ">
              <div className="text-white text-4xl md:text-8xl lg:text-9xl  font-bold px-4 py-2 rounded-lg ">
                Intelligence
              </div>
              <div className="text-white text-2xl md:text-4xl font-bold px-4 py-2 rounded-lg text-center ">
                <p>We observe and create.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-50" />

            <img
              className="h-[480px] w-full object-cover"
              // src="https://assets.weforum.org/article/image/VjCnrKCaaFhBiC0_sFQUw-etIRTxXGJj8yIQdFYfGJ0.JPG"
              src="https://genera.com/_images/About-section-01.jpg"
              alt=""
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center ">
              <div className="text-white text-7xl md:text-8xl lg:text-9xl font-bold px-4 py-2 rounded-lg ">
                Safety
              </div>
              <div className="text-white text-2xl md:text-4xl font-bold px-4 py-2 rounded-lg text-center ">
                <p>
                  {/* Drive with Confidence, Illuminate with Safety
                    <br />
                    Illuminate with Safety */}
                  We have a proactive attitude towards safety.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
