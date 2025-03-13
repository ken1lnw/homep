"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { Stick } from "next/font/google";
import Image from "next/image";
import { createPortal } from "react-dom";

const { Header, Content, Footer } = Layout;
const navItems = [
  { label: "Products", key: "1" },
  { label: "Resources", key: "2" },
  { label: "Application", key: "3" },
  { label: "Contact", key: "4" },
  { label: "Join Us", key: "5" },
];

const extraData: Record<string, string[]> = {
  "1": ["a1", "a2", "a3", "a4", "a5"],
  "2": ["b1", "b2", "b3", "b4", "b5"],
  "3": ["c1", "c2", "c3", "c4", "c5"],
  "4": ["d1", "d2", "d3", "d4", "d5"],
  "5": ["e1", "e2", "e3", "e4", "e5"],
};
export default function Navbar() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  let hideTimeout: NodeJS.Timeout;

  const handleMouseEnter = (key: string) => {
    clearTimeout(hideTimeout); // หยุดการซ่อน dropdown
    setHoveredKey(key);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setHoveredKey(null);
    }, 200); // หน่วงเวลาการซ่อน ป้องกัน flicker
  };

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 1)",
          backdropFilter: "blur(10px)",
          justifyContent: "space-between",
        }}
        className="relative"
      >
        <div className="flex">
          <Image
            src="/image.png"
            alt="Logo"
            width={100}
            height={50}
            className="object-contain"
          />
          <div className="text-white ml-4">ISO 9001:2015 Certified</div>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBg: "transparent",
                itemHoverColor: "#55b4ff",
                itemColor: "#ffffff",
                horizontalItemSelectedColor: "#55b4ff",
              },
            },
          }}
        >
          <Menu
            mode="horizontal"
            onMouseLeave={handleMouseLeave} // ซ่อน dropdown เมื่อออกจากเมนู
            items={navItems.map((item) => ({
              ...item,
              onMouseEnter: () => handleMouseEnter(item.key),
            }))}
            style={{
              minWidth: 0,
              position: "sticky",
              background: "transparent",
            }}
          />
        </ConfigProvider>
      </Header>

      {/* ใช้ createPortal เพื่อแสดง dropdown นอก <html> */}
      {/* {hoveredKey &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed top-[64px] left-0 w-full bg-black/80 h-[200px] backdrop-blur-3xl transition-opacity duration-300 text-white"
            onMouseEnter={() => clearTimeout(hideTimeout)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex h-full items-center justify-center gap-10 w-full">
              {extraData[hoveredKey].map((item) => (
                <div key={item} className="flex-1 justify-center items-center">
                    <div>
                        Image
                    </div>
                    {item}
                
                </div>
              ))}
            </div>
          </div>,
          document.body
        )} */}
    </>
  );
}
