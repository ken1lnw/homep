/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";

const contentStyle: React.CSSProperties = {
  height: "600px",
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

export default function Content1page1() {
  return (
    <>
      <Carousel arrows draggable fade dots={false} className="">
        <div>
          <h3 style={contentStyle}>
            <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"/>

              {/* รูปภาพ */}
              <img
                className="h-[600px] w-full object-cover"
                src="https://www.aceee.org/sites/default/files/styles/social_sharing_image/public/hero-images/energy-efficiency-industrial.jpg?itok=wopNlR8u"
                alt=""
              />
              {/* กล่องข้อความที่อยู่กลางภาพ */}

              <div className="absolute inset-0 flex flex-col  justify-center mr-56">
                <motion.div
                  variants={fadeUpVariant}
                  initial="initial"
                  animate="animate"
                >
                  <div className="text-white text-9xl font-bold px-4 py-2 rounded-lg text-right">
                    Light
                  </div>
                  <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-right">
                    <p>
                    Lighting the Way 
                    <br/> to Innovation
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"/>

              <img
                className="h-[600px] w-full object-cover"
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
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"/>

              <img
                className="h-[600px] w-full object-cover"
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
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
          <div className="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"/>

            <img
              className="h-full w-full object-cover"
              src="https://intelcorp.scene7.com/is/image/intelcorp/adobestock-97576824:1920-1080?wid=1280&hei=720"
              alt=""
            />
          </h3>
        </div>
      </Carousel>
    </>
  );
}
