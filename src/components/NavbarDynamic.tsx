import React, { useEffect, useState } from "react";
import {
  Menu,
  ConfigProvider,
  Layout,
  Select,
  // Button,
  Badge,
} from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "./Production/ProductionType";
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
import { GlobalOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "./ui/button";
import {
  Geist,
  Geist_Mono,
  Merriweather_Sans,
  Slabo_13px,
} from "next/font/google";
import { motion } from "framer-motion";
import { fetchNavbarData } from "@/app/(Home)/navsearch";

const { Header } = Layout;

export default function NavbarDynamic() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = React.useState(false);
  const [lastScrollY, setLastScrollY] = useState(Number);

  const [searchQuery, setSearchQuery] = useState(""); // For server query trigger
  const [selectedValue, setSelectedValue] = useState<string | undefined>(); // For user selection (if needed)
  const [currentLang, setCurrentLang] = useState<string>("en");
  const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length;

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        setHidden(true); // เลื่อนลง → ซ่อน Navbar
      } else {
        setHidden(false); // เลื่อนขึ้น → แสดง Navbar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Update language from cookie
  useEffect(() => {
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

  const navItems = [
    { label: t("Home"), key: "" },
    { label: t("Products"), key: "Products" },
    { label: t("News"), key: "News" },
    { label: t("About Us"), key: "AboutUs" },
    { label: t("Contact Us"), key: "ContactUs" },
  ];

  const activeKey = pathname.split("/")[1];

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["item_product", searchQuery],
    queryFn: async () => {
      // ดึงข้อมูลจาก fetchNavbarData
      const searchData = await fetchNavbarData(searchQuery);

      // ส่งกลับ searchData โดยตรง
      return searchData;
    },
    enabled: searchQuery !== "", // เมื่อมีการค้นหาจะเรียกใช้งาน query
  });

  const dropdownItems = data?.slice(0, 5).map((item) => ({
    key: item.id,
    label: item.oem_no || item.tyc_no || item.full_specifications,
    onClick: () => {
      console.log(`Selected item: ${item.id}`);
    },
  }));

  return (
    <>
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? -100 : 0 }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-full space-x-0 bg-white border-b h-[56px]  z-50 transition-all"
      >
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Montserrat",
            },
          }}
        >
          <Header
            style={{
              display: "flex",
              // position: "sticky",
              top: 0,
              width: "100%",
              zIndex: 1000,
              backgroundColor: "#0172E5",
              backdropFilter: "blur(10px)",
            }}
            className="relative flex justify-between"
          >
            <div className="flex items-center">
              <a href="/">
                <Image
                  src="/TYCTHlogoWhite.png"
                  alt="Logo"
                  width={140}
                  height={0}
                  className="object-contain"
                />
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <ConfigProvider
                theme={{
                  components: {
                    Menu: {
                      itemBg: "transparent",
                      itemHoverColor: "#ffffff",
                      itemColor: "#ffffff",
                      horizontalItemSelectedBg: "#E81F76", // Background color of the selected item
                      horizontalItemSelectedColor: "#ffffff", // Text color for the selected item
                      itemSelectedBg: "#55b4ff",
                      itemSelectedColor: "#ffffff", // Set the text color to white when selected
                    },
                  },
                  token: {
                    colorText: "#00000",
                    fontSize: 16,
                  },
                }}
              >
                <Menu
                  mode="horizontal"
                  selectedKeys={[activeKey]}
                  items={navItems.map((item) => ({
                    label: item.label,
                    key: item.key,
                    onClick: () => router.push(`/${item.key}`),
                  }))}
                  disabledOverflow={true}
                  style={
                    {
                      // minWidth: 0,
                      // position: "sticky",
                      // background: "transparent",
                    }
                  }
                  className="hidden lg:flex font-medium"
                />

                <div className="hidden lg:flex !text-black gap-4">
                  <div className="relative w-full">
                    <Select
                      showSearch
                      placeholder="Search..."
                      onSearch={(value) => setSearchQuery(value)}
                      onChange={(value) => {
                        // Find the selected item based on the selected value (oem_no)
                        const selectedItem = data?.find(
                          (item) => item.oem_no === value
                        );
                        if (selectedItem) {
                          // Navigate to the product page for the selected item using its id
                          router.push(`/Products/${selectedItem.id}`);
                        }
                      }}
                      style={{ width: 200, color: "black" }} // Set the color of the text inside the select box
                      loading={isFetching}
                      filterOption={false}
                      suffixIcon={null}
                      className="!text-black"
                    >
                      {data?.map((item) => (
                        <Select.Option
                          key={item.id}
                          value={item.oem_no} // Use the oem_no as the value
                          className="!text-black"
                        >
                          {item.oem_no}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/Cart")}
                  className="hidden lg:flex "
                >
                  <span>
                    <Badge count={cartCount}>
                      <ShoppingCartOutlined
                        className="hover:!text-blue-400"
                        style={{ fontSize: "18px", color: "white" }}
                      />
                    </Badge>
                  </span>
                </button>

                <button
                  className="text-white hover:text-gray-500 flex"
                  onClick={toggleLanguage}
                >
                  <GlobalOutlined className="hover:!text-blue-400" />
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
                                  src="/TYC_thailand_logo_01LBLUE.png"
                                  alt="Logo"
                                  width={100}
                                  height={50}
                                  className="object-contain"
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
                        <div>
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
                              Cart (Items)
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button className="w-full h-10 text-xl rounded-none shadow-none hover:bg-transparent bg-transparent text-black">
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
      </motion.div>
    </>
  );
}
