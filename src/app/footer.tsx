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
    <div className="w-full h-32 bg-gray-200 flex items-center justify-between px-8">
      {/* ส่วนที่มี Logo และข้อความลิขสิทธิ์ */}
      <div className="flex flex-col justify-start w-1/2">
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

      {/* ส่วนที่มีลิงค์ */}
      <div className="flex flex-col justify-end w-1/2 items-end">
        {/* ลิงก์ */}
        <div className="flex space-x-4">
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

        {/* ไอคอน Mail อยู่ข้างล่าง */}
        <div className="mt-4 text-3xl flex space-x-4">
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
  );
};

export default Footer;
