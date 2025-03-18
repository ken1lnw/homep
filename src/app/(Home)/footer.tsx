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
      <div className="w-full py-4 bg-gray-200 px-8 grid md:grid-cols-2 space-y-5">
        <div className="flex flex-col justify-center">
          <Image
            src="/brand-2023.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
          <p className="text-sm text-black">
            Copyright©2025 TYC Brother Industrial Co., Ltd. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:items-end justify-center">
          <div className="flex flex-col space-y-2 space-x-4 md:block ">
            <a href="" className="text-xl text-black hover:text-blue-500">
              Products
            </a>
            <a href="" className="text-xl text-black hover:text-blue-500">
              Company
            </a>
            <a href="" className="text-xl text-black hover:text-blue-500">
              Work with TYC
            </a>
            <a href="" className="text-xl text-black hover:text-blue-500">
              Support
            </a>
          </div>

          <div className="text-3xl flex space-x-4 items-center mt-2 md:mt-0">
            <div className="hover:text-blue-500">
              <YoutubeOutlined className="text-4xl" />
            </div>

            <div className="hover:text-blue-500">
              <FacebookOutlined />
            </div>

            <div className="hover:text-blue-500">
              <MailOutlined />
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default Footer;
