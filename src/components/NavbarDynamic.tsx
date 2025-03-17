/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
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
import {
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Header, Content, Footer } = Layout;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

type MenuItem = Required<MenuProps>["items"][number];

export default function NavbarDynamic() {
  const t = useTranslations("Navbar");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>("en");
  const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length

 
  useEffect(() => {
    // Get the current language from cookies when the component mounts
    const lang = document.cookie.replace(
      /(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (lang) {
      setCurrentLang(lang);
    }

  }, []);


  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "th" : "en";
    document.cookie = `lang=${newLang}; path=/;`;
    setCurrentLang(newLang);
    router.refresh();
  };

  const navItems: MenuItem[] = [
    {
      label: t("Products"),
      key: "1",
      onClick: () => router.push("/Products"),
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
      onClick: () => router.push("/News"),

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
    // {
    //   label: t("Join Us"),
    //   key: "4",
    //   // children: ["d1", "d2", "d3", "d4", "d5"].map((item, i) => ({
    //   //   key: `4-${i + 1}`,
    //   //   label: item,
    //   //   style: {
    //   //     color: "black",
    //   //   },
    //   // })),
    // },

    {
      label: t("Contact Us"),
      key: "5",
      onClick: () => router.push("/ContactUs"),

      // children: ["d1", "d2", "d3", "d4", "d5"].map((item, i) => ({
      //   key: `4-${i + 1}`,
      //   label: item,
      //   style: {
      //     color: "black",
      //   },
      // })),
    },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              /* here is your component tokens */
            },
          },
        }}
      >
        <Header
          style={{
            display: "flex",
            // alignItems: "center",
            position: "sticky",
            top: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 1)",
            backdropFilter: "blur(10px)",
            // justifyContent: "space-between",
          }}
          className="relative flex lg:justify-between"
        >
          <div className="flex items-center">
            <a href="/">
              <Image
                src="/brand-2023.png"
                alt="Logo"
                width={100}
                height={50}
                className="object-contain "
              />
            </a>
            <div className="text-white ml-4 hidden xl:flex">
              ISO 9001:2015 Certified
            </div>
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
                className="hidden xl:flex"
              />

              <div className="hidden xl:flex text-white gap-4">
                {/* <Search
                  placeholder="VIN,OEM,PART NUMBER,KEYWORDS"
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 200 }}
                /> */}

                <SearchOutlined
                  className="text-white"
                  onClick={() => setShowSearch((prev) => !prev)}
                />

                <Badge count={cartCount}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "24px", color: "white" }}
                    onClick={() => router.push("/Cart")}
                  />
                </Badge>
              </div>

              <button
                className="text-white hover:text-gray-500 "
                onClick={toggleLanguage}
              >
                <GlobalOutlined />
                <span className="ml-2">
                  {currentLang === "en" ? "EN" : "TH"}
                </span>
              </button>
            </ConfigProvider>
          </div>
        </Header>
      </ConfigProvider>

      {/* Search Bar (แสดงเฉพาะเมื่อโหลดเสร็จสมบูรณ์) */}
      {isMounted && showSearch && (
        <div className="w-full p-5">
          <Search
            placeholder="VIN,OEM,PART NUMBER,KEYWORD"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
      )}
    </>
  );
}
