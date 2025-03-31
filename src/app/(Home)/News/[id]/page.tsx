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

export default function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params); // ใช้ use() เพื่อดึงค่า params.id โดยไม่ต้องใช้ useEffect

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news_article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_article")
        .select("*,news_image(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as NewsType;
    },
    staleTime: 1000 * 60 * 5, // Cache ไว้ 5 นาที
    enabled: !!id, // ใช้ query ก็ต่อเมื่อมี id
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading article</p>;

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold text-blue-500">
        {article?.news_title}
      </h1>
      <div className="bg-blue-300 h-0.5 my-2"></div>
      <p className="text-md text-gray-500">
        {article?.created_at
          ? new Date(article.created_at).toLocaleDateString()
          : "No date available"}
      </p>

      <div className="my-2 text-blue-500 text-2xl">
        <LeftOutlined className="" onClick={() => router.back()} />
      </div>

      <div className="flex justify-center">
        <img
          src={
            article?.news_image?.[0]?.path ||
            "/TH-TYC_logoWhite.jpg"
          }
          alt={article?.news_title}
          className="w-[800px] h-[400px] mt-4 object-cover"
        />
      </div>

      {/* ใช้ dangerouslySetInnerHTML เพื่อแสดงเนื้อหาที่จัดรูปแบบจากฐานข้อมูล */}
      <div
        className="mt-8 text-gray-700"
        style={{ whiteSpace: "pre-wrap" }} // CSS เพื่อแสดงการเว้นวรรคในข้อความ
        dangerouslySetInnerHTML={{ __html: article?.news_description || "" }}
      />

{article?.news_image && article.news_image.length > 1 && (
  <div className="flex justify-center">
    <div className="my-5 max-w-2/3">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {article.news_image.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.path} alt={`image-${index}`} />
          </SwiperSlide>
        ))}
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
        {article.news_image.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.path} alt={`thumb-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
)}

    </div>
  );
}
