/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  BulbOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { MdVerified } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { FiGlobe } from "react-icons/fi";
import { TbAutomaticGearbox } from "react-icons/tb";

import React, { useState } from "react";

// Motion animation variant

const Content4page1 = () => {
  return (
    <>

<div className="bg-gray-200 py-10 md:px-10 lg:px-20 xl:px-40">
      <h1 className=" text-5xl font-bold text-center lg:text-left">Benefits</h1>
      <div className=" w-full">
        <div className="grid md:grid-cols-4 mt-10 gap-5">
          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <GiProcessor className="text-8xl mb-5" />
            <h1 className="text-2xl font-bold">Technology</h1>
            <p>Using science to enhance product and process innovation.</p>
          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <MdVerified className="text-8xl mb-5" />

            <h1 className="text-2xl font-bold">Quality</h1>
            <p>Surpassing customer expectations and industry standards.</p>
          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <TbAutomaticGearbox className="text-8xl mb-5" />
 
            <h1 className="text-2xl font-bold">Process</h1>
            <p>Creating a product, from design to delivery.</p>
          </div>

          <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
            <FiGlobe className="text-8xl mb-5" />

            <h1 className="text-2xl font-bold">Sustainability</h1>
            <p>
              Meeting current and future demands of global customer without
              environmental compromise.
            </p>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Content4page1;
