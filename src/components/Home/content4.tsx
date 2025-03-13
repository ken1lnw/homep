/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BulbOutlined, FieldTimeOutlined, TeamOutlined, VerifiedOutlined } from "@ant-design/icons";
import React, { useState } from "react";

// Motion animation variant

const Content4page1 = () => {
  return (
    <>

<h1 className="bg-gray-200 text-5xl font-bold pt-5 px-32">Benefits</h1>

      <div className="bg-gray-200 w-full h-[300px] flex justify-center items-center px-32">

        <div className="flex flex-col w-1/4 gap-2">
          <BulbOutlined className="text-7xl" />
          <h1 className="text-2xl font-bold">INNOVATION</h1>   
          <p>Embrace change as the norm and not the exception; propel transformation by fostering creativity and aiming for leadership within our industry sectors.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
          <TeamOutlined className="text-7xl" />
          <h1 className="text-2xl font-bold">TEAMWORK</h1>   
          <p>Cultivate a culture of trust through open dialogue and collaboration with TYC Genera employees, partners, and clients.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
          <VerifiedOutlined className="text-7xl" />
          <h1 className="text-2xl font-bold">INTEGRITY</h1>   
          <p>INTEGRITY Integrity is the quality of being honest and having strong moral principles. It involves consistently doing the right thing, even when no one is watching.</p> 
        </div>

        <div className="flex flex-col w-1/4 gap-2">
          <FieldTimeOutlined className="text-7xl" />
          <h1 className="text-2xl font-bold">SPEED</h1>   
          <p>SPEED Speed is the capacity to act or move quickly and efficiently. It involves rapid response times, swift execution, and the ability to adapt to changing circumstances with agility.</p> 
        </div>
      </div>
    </>
  );
};

export default Content4page1;
