import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const contentStyle: React.CSSProperties = {
  height: "480px",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
};

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

export default function AboutUsContent1() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full h-[300px] flex  text-black my-20 px-5">
        <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
          <h1 className="text-6xl font-semibold text-blue-500">Who we are</h1>
          <p className="">
          Founded with a passion for innovation and excellence, TYC is a leading manufacturer of high-quality automotive lighting solutions.
           Specializing in headlight production, we are committed to enhancing visibility, safety, and style for vehicles worldwide. 
           Our mission is to provide cutting-edge lighting technology that meets the highest industry standards while exceeding customer expectations.
          </p>
        </div>

        <div className="h-[300px] w-1/2">
         <img src="https://www.sumipol.com/wp-content/uploads/2019/09/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95.jpg" 
          alt="" 
          className="w-full h-[300px] object-cover rounded-sm shadow-xl"/>
        
        </div>


        
      </div>
    </>
  );
}
