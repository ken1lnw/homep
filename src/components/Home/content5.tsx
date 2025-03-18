/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  BulbOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

// Motion animation variant

const Content5page1 = () => {
  return (
    <>
      <div className="bg-white py-10 md:px-8 lg:px-18 xl:px-32 mb-5">
        <h1 className=" text-5xl font-bold text-center lg:text-left">
          Our Partners
        </h1>
        <div className=" w-full">
          <div className="grid md:grid-cols-4 gap-5">
            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433316933.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">TRIUMPH</h1>
              <p>Description about Triumph.</p>
            </div>

            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1432862076.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">SUZUKI</h1>
              <p>Description about SUZUKI.</p>
            </div>

            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433736103.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">AGCO</h1>
              <p>Description about AGCO.</p>
            </div>

            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://genera.com/_images/clients-logo-04.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">TOYOTA</h1>
              <p>Description about TOYOTA.</p>
            </div>
          </div>
        </div>
      </div>

 
    </>
  );
};

export default Content5page1;
