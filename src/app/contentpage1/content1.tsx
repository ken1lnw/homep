
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
        modules={[ EffectFade ,Navigation, Pagination ]}
        navigation={true}
        effect={""}
        onSwiper={setSwiperInstance} // Store the swiper instance when initialized

        className="    h-[480px] w-full"
      >
        <SwiperSlide>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-50" />

            {/* รูปภาพ */}
            <img
              className="h-[480px] w-full object-cover"
              src="https://www.aceee.org/sites/default/files/styles/social_sharing_image/public/hero-images/energy-efficiency-industrial.jpg?itok=wopNlR8u"
              alt=""
            />
            {/* กล่องข้อความที่อยู่กลางภาพ */}

            <div className="absolute inset-0 flex flex-col  justify-center mr-56">
              <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg text-right">
                Light
              </div>
              <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-right">
                <p>
                  Lighting the Way
                  <br /> to Innovation
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-50" />

            <img
              className="h-[480px] w-full object-cover"
              src="https://www.laherramienta.com/wp-content/uploads/2023/01/sum_ind_prtda.jpg"
              alt=""
            />

            <div className="absolute inset-0 flex flex-col  justify-center ml-56">
              <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg text-left">
                Intelligence
              </div>
              <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-left">
                <p>
                  Precision, Power, and Intelligence
                  <br />
                  in Every Lightin Every Light
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="relative">
              <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-50" />

              <img
                className="h-[480px] w-full object-cover"
                src="https://assets.weforum.org/article/image/VjCnrKCaaFhBiC0_sFQUw-etIRTxXGJj8yIQdFYfGJ0.JPG"
                alt=""
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center ">
                <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg ">
                  Safety
                </div>
                <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-left ">
                  <p>
                    Drive with Confidence, Illuminate with Safety
                    <br />
                    Illuminate with Safety
                  </p>
                </div>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide><div className="relative">
              <div className="absolute top-0 left-0 w-full h-[480px] bg-black opacity-50" />

              <img
                className="h-[480px] w-full object-cover"
                src="https://intelcorp.scene7.com/is/image/intelcorp/adobestock-97576824:1920-1080?wid=1280&hei=720"
                alt=""
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center ">
                <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg ">
                  Safety
                </div>
                <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-left ">
                  <p>
                    Drive with Confidence, Illuminate with Safety
                    <br />
                    Illuminate with Safety
                  </p>
                </div>
              </div>
            </div></SwiperSlide>
    
      </Swiper>


    </>
  );
}
