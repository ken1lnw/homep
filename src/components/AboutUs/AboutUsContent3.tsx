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

export default function AboutUsContent3() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full h-[300px] flex  text-black my-20 px-5">
        <div className="w-1/3 flex flex-col justify-center items-start p-4 gap-4 ">
          <h1 className="text-6xl font-semibold text-blue-500">Awards</h1>
          <p className="">
            Our passion for, and devotion to, the innovative design of lighting
            products has gained recognition and merits among our peers.
          </p>
        </div>

        <div className="h-[300px] w-2/3 flex">
          <img
            src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1594263201.jpg"
            alt=""
            className=" object-cover rounded-sm shadow-xl"
          />

<img
            src="https://www.tyc.com.tw/assets/uploads/about/awards/glory1432621805.png"
            alt=""
            className=" object-cover rounded-sm shadow-xl"
          />
        </div>
      </div>
    </>
  );
}
