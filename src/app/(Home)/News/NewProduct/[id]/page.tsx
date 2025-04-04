"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/hook/supabase";
import { NewsType } from "@/components/ManageNews/NewsType";
import { use, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { fetchSingleNewProduct } from "./singlenewproductdata";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";

export default function NewsDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();
  const { id } = use(params);

const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news_article", id],
    queryFn: async () => {
      const fetchsinglenew = await fetchSingleNewProduct(id);
      return fetchsinglenew;

      // if (error) throw error;
      // return data as NewsType;
    },
    staleTime: 1000 * 60 * 5, // Cache ไว้ 5 นาที
    enabled: !!id, // ใช้ query ก็ต่อเมื่อมี id
  });


  return (
    <>

{isLoading && (
        <div className="w-full h-full fixed top-0 left-0 bg-white bg-opacity-50 z-50 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}

            
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[200px]  bg-black opacity-20" />

        <img
          src="/NewsBanner.png"
          alt="news"
          className="w-full h-[200px] lg:h-[200px]  object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
            New Product
          </h1>
          <p className="text-sm md:text-md lg:text-xl font-bold">
            {/* Discover how the TYC Smart Manufacturing Platform empowers your
    production process to achieve excellence, regardless of what you're
    creating */}
          </p>
        </div>
      </div>
      <div className="container mx-auto my-5">

      <div className="my-2 text-blue-500 hover:text-pink-500 text-2xl flex items-center cursor-pointer" onClick={() => router.back()}>
        <LeftOutlined className="" /> Back
      </div>


        <iframe
          src={`${article?.path}`}
          width="100%"
          height="800px"
        />
      </div>
    </>
  );
}
