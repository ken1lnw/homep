/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Content3page1 = () => {
  return (
    <>
      <div className="relative">
        {/* Black overlay div with 50% opacity */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-black opacity-50"></div>

        <img
          src="https://images.unsplash.com/photo-1615752592676-f6bd84f9419d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className=" w-full h-[500px] object-cover"
        />

        {/* Text content positioned in the center */}
        <div className="absolute inset-0 flex items-center xl:w-1/2 xl:top-1/2 xl:left-1/2 xl:transform  xl:-translate-x-1/2  xl:-translate-y-1/2 px-6 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0, ease: "easeOut" }}
          >
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold ">
              {/* We are committed to taking on new worlds, <br />
              
              new technologies and new dreams. */}
              We are committed to taking on new worlds, <br />
              new technologies and new dreams.
            </h1>
            <p className="text-md md:text-lg lg:text-xl break-words my-6">
              {/* Bringing safety and a smile to people is what has driven us all
              these years, and is what continues to motivate us daily. Hence, at
              TYC, we put a lot of focus and devotion on each one of our
              products in the hope that TYC will one day shine on every corner
              of the world. */}

Bringing safety and a smile to people is what has driven us all these years, and is what continues to motivate us daily.
Hence, at TYC, we put a lot of focus and devotion on each one of our products in the hope that TYC will one day shine on every corner of the world.


            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Content3page1;
