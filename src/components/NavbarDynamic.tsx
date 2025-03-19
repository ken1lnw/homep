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
  // Input,
  Space,
} from "antd";
import Image from "next/image";
import type { MenuProps, GetProps } from "antd";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { GiHamburgerMenu } from "react-icons/gi";

// type SearchProps = GetProps<typeof Input.Search>;
// const { Search } = Input;
const { Header, Content, Footer } = Layout;

// const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//   console.log(info?.source, value);

type MenuItem = Required<MenuProps>["items"][number];

export default function NavbarDynamic() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>("en");
  const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length;

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
      label: t("Home"),
      key: "1",
      onClick: () => router.push("/"),
    },

    {
      label: t("Products"),
      key: "2",
      onClick: () => router.push("/Products"),
    },
    {
      label: t("News"),
      key: "3",
      onClick: () => router.push("/News"),
    },
    {
      label: t("About Us"),
      key: "4",
      onClick: () => router.push("/AboutUs"),
    },

    {
      label: t("Contact Us"),
      key: "5",
      onClick: () => router.push("/ContactUs"),
    },
  ];

  // const [showSearch, setShowSearch] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

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
          className="relative flex justify-between"
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
            {/* <div className="text-white ml-4 hidden xl:flex">
              ISO 9001:2015 Certified
            </div> */}
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
                className="hidden lg:flex"
              />

              <div className="hidden lg:flex text-white gap-4">
                {/* <Search
                  placeholder="VIN,OEM,PART NUMBER,KEYWORDS"
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 200 }}
                /> */}

                {/* <SearchOutlined
                  className="text-white"
                  onClick={() => setShowSearch((prev) => !prev)}
                /> */}

                <div className="hidden lg:flex relative w-full">
                  <Input
                    type="text"
                    placeholder="OEM,PART NUMBER"
                    className="pl-3 pr-10 py-2 rounded-md border border-gray-300 text-white"
                  />
                  <SearchOutlined className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                </div>
              </div>

              <button
                onClick={() => router.push("/Cart")}
                className="hidden lg:flex "
              >
                <span>
                  <Badge count={cartCount}>
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px", color: "white" }}
                    />
                  </Badge>
                </span>
              </button>

              <button
                className="text-white hover:text-gray-500 "
                onClick={toggleLanguage}
              >
                <GlobalOutlined />
                <span className="ml-2">
                  {currentLang === "en" ? "EN" : "TH"}
                </span>
              </button>

              <div className="flex lg:hidden">
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button className="bg-transparent">
                      <GiHamburgerMenu />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="z-[1000]">
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>
                          <div className="flex items-center justify-center">
                            <a href="/">
                              <Image
                                src="/brand-2023.png"
                                alt="Logo"
                                width={100}
                                height={50}
                                className="object-contain "
                              />
                            </a>
                          </div>
                        </DrawerTitle>
                        <div className="text-center">
                          <DrawerDescription>
                            Light. Intelligence. Safety.
                          </DrawerDescription>
                        </div>
                      </DrawerHeader>

                      <div className="">
                        {[
                          { label: "Home", href: "/" },
                          { label: "Products", href: "/Products" },
                          { label: "News", href: "/News" },
                          { label: "About Us", href: "/AboutUs" },
                          { label: "Contact Us", href: "/ContactUs" },
                        ].map((item) => (
                          <DrawerClose asChild key={item.href}>
                            <Button
                              onClick={() => router.push(item.href)}
                              className={`w-full h-20 text-3xl rounded-none border-b-1 transition-all ${
                                pathname === item.href
                                  ? "bg-blue-500 text-white"
                                  : "bg-transparent text-black hover:bg-blue-500 hover:text-white"
                              }`}
                            >
                              {item.label}
                            </Button>
                          </DrawerClose>
                        ))}

                        <DrawerClose asChild>
                          <Button
                            onClick={() => router.push("/Cart")}
                            className={`w-full h-20 text-3xl rounded-none border-b-1 transition-all ${
                              pathname === "/Cart"
                                ? "bg-blue-500 text-white"
                                : "bg-transparent text-black hover:bg-blue-500 hover:text-white"
                            }`}
                          >
                            Cart ({cartCount} Items)
                          </Button>
                        </DrawerClose>
                      </div>
                    </div>

                    <DrawerFooter>
                      {/* <Button>Submit</Button> */}
                      <DrawerClose asChild>
                        <Button className="w-full h-10 text-xl rounded-none shadow-none hover:bg-transparent bg-transparent text-black ">
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </ConfigProvider>
          </div>
        </Header>
      </ConfigProvider>

      {/* Search Bar (แสดงเฉพาะเมื่อโหลดเสร็จสมบูรณ์) */}
      {/* {isMounted && showSearch && (
  <motion.div 
  initial={{ opacity: 0, x: 0 }}
  whileInView={{ opacity: 1, x: 0 }}
  // transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
  className="w-full p-5 sticky top-[64px] z-[1000] bg-black/70 shadow-md">
          <Search
            placeholder="VIN,OEM,PART NUMBER,KEYWORD"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </motion.div>
      )} */}
    </>
  );
}
