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
        <h1 className=" text-5xl text-[#0172E5] font-bold text-center lg:text-left">
          Our Customers
        </h1>
        <div className=" w-full">
          {/* <div className="grid md:grid-cols-3 gap-5"> */}
          <div className="flex flex-col gap-5 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:flex xl:flex-row xl:gap-16 ">
           



            {/* <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://logos-world.net/wp-content/uploads/2021/03/Chevrolet-Logo.png"
                  alt=""
                  className="object-center"
                />
              </div>

              <h1 className="text-md font-bold">Chevrolet (Thailand)</h1>
            </div> */}

            <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1432862076.png"
                  alt=""
                  className=""
                />
              </div>
              <h1 className="text-md font-bold">Thai Suzuki Motor</h1>
            </div>

            <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://logoeps.com/wp-content/uploads/2016/05/Isuzu-logo.png"
                  alt=""
                  className=""
                />
              </div>
              <h1 className="text-md font-bold">
                Isuzu Motors Co., (Thailand)
              </h1>
            </div>

            {/* <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Grab_Logo.svg/2560px-Grab_Logo.svg.png"
                  alt=""
                  className=""
                />
              </div>

              <h1 className="text-md font-bold">Grab (Thailand)</h1>
            </div> */}

            <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Perodua_Logo_%282008_-_Present%29.svg/1200px-Perodua_Logo_%282008_-_Present%29.svg.png"
                  alt=""
                  className=""
                />
              </div>

              <h1 className="text-md font-bold">Perodua (Malaysia) </h1>
            </div>

            <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://www.tanchonggroup.com/wp-content/uploads/cropped-tcmh-logo.png"
                  alt=""
                  className=""
                />
              </div>

              <h1 className="text-md font-bold">Tan Chong (Malaysia) </h1>
            </div>

            <div className="flex flex-col space-y-1 items-center">
              <div className="w-40 h-40 items-center justify-center flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/General_Motors_logo.svg/1200px-General_Motors_logo.svg.png"
                  alt=""
                  className=""
                />
              </div>

              <h1 className="text-md font-bold">GM (Brazil) </h1>
            </div>

            {/* <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433316933.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">TRIUMPH</h1>
              <p>TYC is a valued partner in OEM lighting supply.</p>
            </div>

            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1432862076.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">SUZUKI</h1>
              <p>We need passionable suppliers like TYC for our emotional products!.</p>
            </div>

            <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://www.tyc.com.tw/assets/uploads/homepage/partner/partner1433736103.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">AGCO</h1>
              <p>Cooperative, Friendly, Aggressive, TYC.</p>
            </div> */}

            {/* <div className="flex flex-col items-center lg:block text-center lg:text-left space-y-1">
              <img
                src="https://genera.com/_images/clients-logo-04.png"
                alt=""
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">TOYOTA</h1>
              <p>Description about TOYOTA.</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content5page1;
