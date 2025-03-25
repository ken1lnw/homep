/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  FacebookOutlined,
  MailOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="w-full py-4 bg-[#22242D] px-8 grid md:grid-cols-2  space-y-10 md:space-y-0">
        <div className="flex flex-col justify-center space-y-3">
          <Image
            src="/TYC_thailand_logo_01.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
          {/* <p className="text-sm text-white">
            Copyright©2025 TYC Brother Industrial Co., Ltd. All rights reserved.
          </p> */}
        </div>


        <div className="flex flex-col md:items-end space-y-4 lg:space-y-0  justify-center">
          <div className="flex flex-col space-y-2 space-x-4 md:flex-row">
            <a href="" className="text-xl text-white hover:text-blue-500">
              Products
            </a>
            <a href="" className="text-xl text-white hover:text-blue-500">
              News
            </a>
            <a href="" className="text-xl text-white hover:text-blue-500">
              About Us
            </a>
            <a href="" className="text-xl text-white hover:text-blue-500">
              Contact Us
            </a>
          </div>

          <div className="text-3xl flex space-x-4 items-center mt-2 md:mt-0">
            <div className="hover:text-blue-500 text-white">
              <YoutubeOutlined className="text-4xl" />
            </div>

            <div className="hover:text-blue-500 text-white">
              <FacebookOutlined />
            </div>

            <div className="hover:text-blue-500 text-white">
              <MailOutlined />
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default Footer;
