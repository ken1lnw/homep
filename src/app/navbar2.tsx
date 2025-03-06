/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Menu,
  theme,
  Input,
  Space,
} from "antd";
import Image from "next/image";
import type { MenuProps, GetProps } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { GlobalOutlined } from "@ant-design/icons";


type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Header, Content, Footer } = Layout;


const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

type MenuItem = Required<MenuProps>["items"][number];


export default function Navbar2() {
  const t = useTranslations("Navbar");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>('en');

  useEffect(() => {
    // Get the current language from cookies when the component mounts
    const lang = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (lang) {
      setCurrentLang(lang);
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'th' : 'en';
    document.cookie = `lang=${newLang}; path=/;`;
    setCurrentLang(newLang);
    router.refresh();
  };


  const navItems: MenuItem[] = [
    {
      label: t("Products"),
      key: "1",
      // children: ["a1", "a2", "a3", "a4", "a5"].map((item, i) => ({
      //   key: `1-${i + 1}`,
      //   label: item,
      //   style: {
      //     color: "black",
      //   },
      // })),
    },
    {
      label: t("News"),
      key: "2",
      // children: ["b1", "b2", "b3", "b4", "b5"].map((item, i) => ({
      //   key: `2-${i + 1}`,
      //   label: item,
      //   style: {
      //     color: "black",
      //   },
      // })),
    },
    {
      label: t("About Us"),
      key: "3",
      onClick: () => router.push("/AboutUs"),
      // children: ["c1", "c2", "c3", "c4", "c5"].map((item, i) => ({
      //   key: `3-${i + 1}`,
      //   label: item,
      //   style: {
      //     color: "black",
      //   },
      // })),
    },
    {
      label: t("Join Us"),
      key: "4",
      // children: ["d1", "d2", "d3", "d4", "d5"].map((item, i) => ({
      //   key: `4-${i + 1}`,
      //   label: item,
      //   style: {
      //     color: "black",
      //   },
      // })),
    },
  
  ];


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
        <div className="flex items-center">
          <a href="/">
            <Image
              src="/brand-2023.png"
              alt="Logo"
              width={100}
              height={50}
              className="object-contain"
            />
          </a>
          <div className="text-white ml-4">ISO 9001:2015 Certified</div>
        </div>

        <div className="flex items-center space-x-4">
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
                Dropdown: {},
              },
              token: {
                colorText: "#000000",
              },
            }}
          >
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
            <Menu
              mode="horizontal"
              // defaultSelectedKeys={["1"]}
              items={navItems}
              disabledOverflow={true}
              style={{
                minWidth: 0,
                position: "sticky",
                background: "transparent",
              }}
            />


            <button className="text-white hover:text-gray-500"   onClick={toggleLanguage}>
            <GlobalOutlined />
            <span className="ml-2">{currentLang === 'en' ? 'EN' : 'TH'}</span>
            </button>
          </ConfigProvider>
        </div>
      </Header>
    </>
  );
}
