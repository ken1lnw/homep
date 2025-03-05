/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BulbOutlined, FieldTimeOutlined, TeamOutlined, VerifiedOutlined } from "@ant-design/icons";
import React, { useState } from "react";

// Motion animation variant

const Content5page1 = () => {
  return (
    <>   
    
  <h1 className="text-5xl font-bold pt-5 px-32">Our Partners</h1>
      <div className="bg-white w-full mb-20 flex justify-center items-center px-32 ">
   
        <div className="flex flex-col w-1/4 gap-2">
<img src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433316933.png" alt="" className="w-48 h-48 object-contain"/>
          <h1 className="text-2xl font-bold">TRIUMPH</h1>   
          <p>Description about Triumph.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
        <img src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1432862076.png" alt="" className="w-48 h-48 object-contain"/>
        <h1 className="text-2xl font-bold">SUZUKI</h1>   
          <p>Description about SUZUKI.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
        <img src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433736103.png" alt="" className="w-48 h-48 object-contain"/>
          <h1 className="text-2xl font-bold">AGCO</h1>   
          <p>Description about AGCO.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
        <img src="https://genera.com/_images/clients-logo-04.png" alt="" className="w-48 h-48 object-contain"/>
          <h1 className="text-2xl font-bold">TOYOTA</h1>   
          <p>Description about TOYOTA.</p> 
        </div>
      </div>
    </>
  );
};

export default Content5page1;
