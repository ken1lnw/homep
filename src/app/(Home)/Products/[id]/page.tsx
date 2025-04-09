"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "@/components/Production/ProductionType";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// import "@/style/swiper-button-productid.css"; // นำเข้า CSS ที่สร้างขึ้น

import { ConfigProvider, Descriptions } from "antd";

import { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { LeftOutlined } from "@ant-design/icons";
import { LoadingSpinner } from "./spinload";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

import {
  fetchProductId,
  fetchRecentProducts,
} from "@/app/(Home)/Products/[id]/productidfetch";
import { useBucket } from "@/store/bucket";
import { useTranslations } from "next-intl";

export default function ProdcutsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("Product");
  const router = useRouter();
  const { id } = use(params);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const store = useBucket();
  // const {
  //   data: product,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["item_product", id],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("item_product")
  //       .select("*,item_image(*)")
  //       .eq("id", id)
  //       .single();

  //     if (error) throw error;
  //     return data as ProductionType;
  //   },
  //   staleTime: 1000 * 60 * 5, // Cache ไว้ 5 นาที
  //   enabled: !!id, // ใช้ query ก็ต่อเมื่อมี id
  // });

  //   if (isLoading) return <p>Loading...</p>;
  //   if (error) return <p>Error loading Product</p>;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["item_product", id],
    queryFn: async () => {
      const fetchedData = await fetchProductId(parseInt(id));
      return fetchedData;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  // const { data: recentProducts } = useQuery({
  //   queryKey: ["recent_item_products"],
  //   queryFn: async () => {
  //     const { data, error, count } = await supabase
  //       .from("item_product")
  //       .select("*,item_image(*)")
  //       .order("id", { ascending: true })
  //       .limit(5);
  //     if (error) throw error;

  //     return { recentproducts: data as ProductionType[] };
  //   },
  // });

  const { data: recentProducts } = useQuery({
    queryKey: ["recent_item_products"],
    queryFn: async () => {
      const fetch5 = await fetchRecentProducts();
      return fetch5;
    },
  });

  const handleAddToCart = (productId: string) => {
    // ดึงข้อมูลตระกร้าปัจจุบันจาก localStorage
    // let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // // เช็คว่ามีสินค้ารายการนี้ในตระกร้าหรือไม่
    // if (!cart.includes(productId)) {
    //   // ถ้าไม่มี ให้เพิ่ม id ของสินค้าลงไป
    //   cart.push(productId);
    //   // บันทึกข้อมูลกลับไปที่ localStorage
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   toast.success("Product added to cart!");
    // } else {
    //   toast.warning("Product is already in the cart.");
    // }

    if (store.data[+productId]) {
      // ถ้ามีสินค้าในตะกร้าแล้ว ให้แสดง toast error
      toast.info("Product is already in the cart.");
    } else {
      // ถ้ายังไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าใหม่
      store.setData(+productId, 1); // เพิ่มสินค้าใหม่ไปยัง store
      toast.success("Product added to cart!");
    }

    router.refresh();
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
          <LoadingSpinner />
        </div>
      )}

      <div className="container mx-auto my-10">
        {/* <div className="mb-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {product?.oem_no || product?.tyc_no || "No data available"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div> */}

        <h1 className="text-4xl font-bold text-blue-500">
          {/* Product Details */}
          {t("pdetail")}
          
          </h1>
        <div className="bg-blue-300 h-0.5 my-2"></div>
        <p className="text-md text-gray-500">
          {product?.oem_no || product?.tyc_no || "No data available"}
        </p>

        <div
          className="my-2 text-blue-500 hover:text-pink-500 text-2xl flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <LeftOutlined className="" /> 
          {/* Back */}
          {t("back")}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 my-10 mx-2">
          <div className="lg:w-1/2">
            {/* <Swiper
              //   spaceBetween={50}
              //   slidesPerView={1}
              //   onSlideChange={() => console.log("slide change")}
              //   onSwiper={(swiper) => console.log(swiper)}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996641.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996666.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996683.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996698.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996746.jpg"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={"auto"}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996641.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996666.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996683.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996698.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  src="https://www.tyc.com.tw/assets/uploads/products/cate1684996746.jpg"
                  alt=""
                />
              </SwiperSlide>
            </Swiper> */}

            {/* Swiper สำหรับแสดงรูปหลัก */}
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {product &&
              product.item_image &&
              product.item_image.length > 0 ? (
                product.item_image.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img src={img.path} alt={`Product Image ${img.id}`} />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="/TH-TYC_logoWhite.jpg"
                    alt="Default Product Image"
                  />
                </SwiperSlide>
              )}
            </Swiper>

            {/* Swiper สำหรับแสดงรูป thumbnail */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={"auto"}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {product &&
              product.item_image &&
              product.item_image.length > 0 ? (
                product.item_image.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img src={img.path} alt={`Product Thumbnail ${img.id}`} />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="/TH-TYC_logoWhite.jpg"
                    alt="Default Thumbnail Image"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className="lg:w-1/2 flex ">
            <div className="flex flex-col flex-1 gap-5">
              {product && (
                <div className="" key={product.id}>
                  <div className="">
                    <div className="flex-1">
                      <ConfigProvider
                        theme={{
                          token: {
                            fontSize: 16,
                            fontFamily: "Montserrat",
                          },
                        }}
                      >
                        <Descriptions
                          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                          bordered
                        >
                          <Descriptions.Item label="OEM No.">
                            {product.oem_no}
                          </Descriptions.Item>
                          <Descriptions.Item label="TYC No.">
                            {product.tyc_no}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vehicle Brand">
                            {product.vehicle_brand}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vehicle Model">
                            {product.vehicle_model}
                          </Descriptions.Item>
                          <Descriptions.Item label="Product Brand">
                            {product.product_brand}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vehicle Year">
                            {product.vehicle_year}
                          </Descriptions.Item>
                          <Descriptions.Item label="Side">
                            {product.left_right}
                          </Descriptions.Item>
                          <Descriptions.Item label="Product Type">
                            {product.product_type}
                          </Descriptions.Item>
                          <Descriptions.Item label="Full Specifications">
                            {product.full_specifications}
                          </Descriptions.Item>
                        </Descriptions>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="bg-[#E81F76] hover:bg-blue-400 w-full md:w-auto h-16 text-2xl  "
                onClick={() => handleAddToCart(id.toString())}
              >
                {/* Add to Cart */}
                {t("add")}
              </Button>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-blue-500 mt-20">
          {/* Recent Products */}
          {t("recentp")}
        </h1>
        <div className="bg-blue-300 h-0.5 my-2 mb-10"></div>

        <div className="md:mx-2">
          <Swiper
            slidesPerView={5}
            spaceBetween={100}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper3"
            breakpoints={{
              // When the screen width is less than 768px (md and below), show 1 slide
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              // For larger screens (above 768px), show 5 slides
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 4,
              },

              1440: {
                slidesPerView: 5,
              },
            }}
          >
            {recentProducts && recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <SwiperSlide>
                  <div
                    className="flex flex-col items-center relative group"
                    key={product.id}
                  >
                    <img
                      className=""
                      src={
                        product.item_image[0]?.path ||
                        // "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                        "/TH-TYC_logoWhite.jpg"
                      } // ใช้ URL ของภาพที่ได้จาก API
                      alt={product.oem_no || product.tyc_no || "Product Image"} // ใช้ชื่อสินค้าหรือข้อมูลที่เหมาะสม
                    />
                    <div className="absolute h-full items-end flex">
                      {`OEM.NO : ${product.oem_no}` ||
                        `TYC.NO : ${product.tyc_no}`}
                    </div>
                    <div
                      className="absolute top-0  h-full w-full flex flex-col items-center justify-center bg-black/80  
                    text-[#0172E5] font-semibold p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded"
                      onClick={() => router.push(`/Products/${product.id}`)}
                    >
                      <div className="text-left">
                        <div>
                          OEM.NO :
                          {product.oem_no || `TYC.NO : ${product.tyc_no}`}{" "}
                        </div>

                        <div>Vehicle Brand :{product.vehicle_brand}</div>

                        <div>Vehicle Model :{product.vehicle_model}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No recent products available</p> // กรณีที่ไม่มีสินค้ามาแสดง
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
}
