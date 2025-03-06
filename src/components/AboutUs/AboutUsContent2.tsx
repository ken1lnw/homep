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

export default function AboutUsContent2() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="my-20 bg-gray-200 py-10">
        <div className="w-full h-[400px] flex  text-black my-20 px-5">
          <div className="h-[500px] w-1/2">
            <img
              src="https://file.chobrod.com/unseencarnews/2019/03/18/1385e016-d61c.jpg"
              alt=""
              className="w-full h-[400px] object-cover rounded-sm shadow-xl"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-center items-start p-4 gap-4 ">
            <h1 className="text-6xl font-semibold text-pink-500">What We Do</h1>
            <p className="">
              At TYC, we design and manufacture premium automotive headlights,
              including LED, projector, and customized lighting solutions. Our
              products are engineered for durability, performance, and aesthetic
              appeal, ensuring that drivers experience superior illumination on
              the road. With state-of-the-art technology and rigorous quality
              control, we guarantee reliability in every product we deliver.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
