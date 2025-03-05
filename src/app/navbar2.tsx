/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
import Image from 'next/image';
const { Header, Content, Footer } = Layout;
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const navItems : MenuItem[]= [
    {
      label: "Prodcuts",
      key: "1",
      children: ["a1", "a2", "a3", "a4", "a5"].map((item, i) => ({
        key: `1-${i + 1}`,
        label: item,
        style:{
            color:'black'
        }
        
      })),
    
    },
    {
      label: "Resources",
      key: "2",
      children: ["b1", "b2", "b3", "b4", "b5"].map((item, i) => ({
        key: `2-${i + 1}`,
        label: item,
        style:{
            color:'black'
        }
      })),
    },
    {
      label: "Application",
      key: "3",
      children: ["c1", "c2", "c3", "c4", "c5"].map((item, i) => ({
        key: `3-${i + 1}`,
        label: item,
        style:{
            color:'black'
        }
      })),
    },
    {
      label: "Join Us",
      key: "4",
      children: ["d1", "d2", "d3", "d4", "d5"].map((item, i) => ({
        key: `4-${i + 1}`,
        label: item,
        style:{
            color:'black'
        }
      })),
    },
    {
      label: "Contact",
      key: "5",
      children: ["e1", "e2", "e3", "e4", "e5"].map((item, i) => ({
        key: `5-${i + 1}`,
        label: item,
        style:{
            color:'black'
        }
      })),
    },
  ];

export default function Navbar2() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
  return ( <>

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
          src="/brand-2023.png"
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
              itemSelectedBg: "#55b4ff", // สีพื้นหลังของตัวเลือกที่ถูกเลือก
        itemSelectedColor: "#55b4ff", // สีของตัวเลือกที่ถูกเลือก
        // subMenuItemSelectedColor :'#000000'
            },
            Dropdown:{

            }
          },
          token:{
            colorText:"#000000"
          }
        }}
      >
        <Menu
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          items={navItems}
          style={{
            minWidth: 0,
            position: "sticky",
            background: "transparent",
          }}
         
        />
      </ConfigProvider>
    </Header>
  </>
  );
}
