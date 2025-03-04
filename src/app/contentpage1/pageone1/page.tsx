/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

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

export default function Content1page1() {
  return (
    <>
      <Carousel arrows dots={false} className="">
        <div>
          <h3 style={contentStyle}>
            <div className="relative">
              {/* รูปภาพ */}
              <img
                className="h-[600px] w-full object-cover opacity-30"
                src="https://www.aceee.org/sites/default/files/styles/social_sharing_image/public/hero-images/energy-efficiency-industrial.jpg?itok=wopNlR8u"
                alt=""
              />
              {/* กล่องข้อความที่อยู่กลางภาพ */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white text-4xl font-bold px-4 py-2 rounded-lg text-left">
                  Title
                </div>
                <div className="text-white text-sm font-bold px-4 py-2 rounded-lg text-left">
                 <p>dsadsadasd<br/>
                  sadasdasdasdsaddsa<br/>dasddsadsadsa
                  dasdadasdasddsadsad
                 </p>
                </div>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              className="h-full w-full object-cover opacity-30"
              src="https://www.laherramienta.com/wp-content/uploads/2023/01/sum_ind_prtda.jpg"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              className="h-full w-full object-cover opacity-30"
              src="https://assets.weforum.org/article/image/VjCnrKCaaFhBiC0_sFQUw-etIRTxXGJj8yIQdFYfGJ0.JPG"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              className="h-full w-full object-cover opacity-30"
              src="https://intelcorp.scene7.com/is/image/intelcorp/adobestock-97576824:1920-1080?wid=1280&hei=720"
              alt=""
            />
          </h3>
        </div>
      </Carousel>
    </>
  );
}
