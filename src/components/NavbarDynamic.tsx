import React, { Children, useEffect, useState } from "react";
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
import { useBucket } from "@/store/bucket";

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
  const cartBucket = useBucket();

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
    {
      label: t("News"),
      key: "News",
      children: [
        { label: "Article", key: "/" },
        { label: "New Prdocut", key: "NewProduct" },
      ],
    },
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

  const fontFamily =
    currentLang === "th" ? "IBM Plex Sans Thai " : "Montserrat";

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
              // fontFamily: "Montserrat",
              // fontFamily: "Noto Sans Thai Looped",
              fontFamily: fontFamily, // Change fontFamily based on language
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
                      // itemSelectedBg: "#55b4ff",
                      itemSelectedColor: "#ffffff", // Set the text color to white when selected
                      itemActiveBg: "#ffffff",
                      popupBg: "#55b4ff",
                      // subMenuItemBg:"#E81F76",
                      subMenuItemSelectedColor: "#ffffff",
                      subMenuItemBg: "#E81F76",
                      controlItemBgActive: "#E81F76",
                    },
                  },
                  token: {
                    colorText: "#00000",
                    fontSize: 18,
                  },
                }}
              >
                <Menu
                  mode="horizontal"
                  selectedKeys={[activeKey]}
                  items={navItems.map((item) => {
                    // Check if item has children
                    if (item.children) {
                      return {
                        label: item.label,
                        key: item.key,
                        children: item.children.map((child) => ({
                          label: child.label,
                          key: child.key,
                          onClick: () =>
                            router.push(`/${item.key}/${child.key}`), // Navigate to the child route
                        })),
                      };
                    } else {
                      return {
                        label: item.label,
                        key: item.key,
                        onClick: () => router.push(`/${item.key}`),
                      };
                    }
                  })}
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
                  <div className="relative w-full flex ">
                    <Select
                      allowClear
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
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                item.item_image[0]?.path ||
                                "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                              }
                              alt={item.tyc_no || item.oem_no}
                              width={30}
                              height={30}
                              className="rounded-2xl"
                            />

                            {item.oem_no || item.tyc_no}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/Cart")}
                  className="hidden lg:flex relative "
                >
                  <span>
                    <Badge
                      count={Object.keys(cartBucket.data).length}
                      className="absolute"
                    >
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
                                  src="/TH-TYC_logoWhitesmall.png"
                                  alt="Logo"
                                  width={150}
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
                            // { label: "News", href: "/News" },
                            { label: "Article", href: "/News" },
                            { label: "New Product", href: "/NewProduct" },


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
                              Cart ( {Object.keys(cartBucket.data).length} Items)
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
