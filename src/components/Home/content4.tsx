"use client";
import { MdVerified } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { FiGlobe } from "react-icons/fi";
import { TbAutomaticGearbox } from "react-icons/tb";

import React from "react";
import { useTranslations } from "next-intl";

// Motion animation variant

const Content4page1 = () => {
      const t = useTranslations("Benefits");
  
  return (
    <>

<div className="bg-gray-200 py-10 md:px-10 lg:px-20 xl:px-40">
      <h1 className=" text-5xl text-[#0172E5] font-extrabold text-center lg:text-left">
        {/* Benefits */}
        {t("benefits")}
        
        </h1>
      <div className=" w-full">
        <div className="grid md:grid-cols-4 mt-10 gap-5">
          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <GiProcessor className="text-8xl mb-5 text-[#0172E5]" />
            <h1 className="text-2xl font-bold">
              {/* Technology */}
              {t("tech")}

              </h1>
            <p className="text-gray-600">
              {/* Using science to enhance product and process innovation. */}
              {t("tech2")}

              </p>

            {/* <p className="text-gray-600">By working closely with OEM partners and with intensive ongoing research and development, we are able to provide efficient lighting products. We use top grade material and precision manufacturing to ensure product durability, reliability and safety.</p> */}

          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <MdVerified className="text-8xl mb-5 text-[#0172E5]" />

            <h1 className="text-2xl font-bold">
              {/* Quality */}
              {t("qua")}
              </h1>
            <p className="text-gray-600">
              {/* Surpassing customer expectations and industry standards. */}
              {t("qua2")}

            </p>

            {/* <p className="text-gray-600">TYC adheres to design, manufacturing and quality standards expected of an OEM manufacturer. Quality is more than just a word, it is a philosophy, a source of inspiration, achievement and motivation.</p> */}

          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <TbAutomaticGearbox className="text-8xl mb-5 text-[#0172E5]" />
 
            <h1 className="text-2xl font-bold">
              {/* Process
               */}
               {t("proc")}

            </h1>
            <p className="text-gray-600">
              {/* Creating a product, from design to delivery. */}
              {t("proc2")}

            </p>

            {/* <p className="text-gray-600">TYC adheres to design, manufacturing and quality standards expected of an OEM manufacturer. Quality is more than just a word, it is a philosophy, a source of inspiration, achievement and motivation.</p> */}

          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <FiGlobe className="text-8xl mb-5 text-[#0172E5]" />

            <h1 className="text-2xl font-bold">
              {/* Sustainability */}
              {t("sust")}
              </h1>
            <p className="text-gray-600">
              {/* Meeting current and future demands of global customer without
              environmental compromise. */}
              {t("sust2")}
            </p>


            {/* <p className="text-gray-600">TYC incorporates principles of sustainability and environmental protection into all of its major business decisions and operations. At TYC, we continue to improve our production systems through extensive research programs and employee training to meet current and future demands of global customers without environmental compromise.</p> */}

          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Content4page1;
