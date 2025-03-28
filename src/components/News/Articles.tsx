"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { NewsType } from "../ManageNews/NewsType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { fetchArticleData, PrefetchReadMore } from "./ArticlesData";

export default function Articles() {
    const router = useRouter();
    const queryClient = useQueryClient();


  const { data : articleData, error, isLoading } = useQuery({
    queryKey: ["news_article"],
    queryFn: async () => {
      const articlefetch = await fetchArticleData();

      if (error) throw error;

      return articlefetch;
    },
  });



  const handleReadMore = async (article: NewsType) => {
    // Prefetch ข้อมูลของบทความที่กำลังจะเปิด
    await queryClient.prefetchQuery({
        queryKey: ["news_article", article.id],
        queryFn: async () => {
            const prefetchData = await PrefetchReadMore(article.id);

            if (error) throw error;
            return prefetchData;
        },
    });

    // Set Cache ทันทีเพื่อให้หน้าใหม่โหลดเร็วขึ้น
    queryClient.setQueryData(["news_article", article.id], article);

    // นำทางไปยังหน้า News/[id]
    router.push(`/News/${article.id}`);
};



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-500">Latest Articles</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {articleData?.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            {/* รูปภาพข่าว */}
            {/* {article.news_image?.length > 0 && ( */}
            <div className="relative w-full h-52">
              <Image
                src={article.news_image?.[0]?.path || "/TYC_thailand_logo_01LBLUE.png"}
                alt={article.news_title}
                layout="fill"
                objectFit="cover "
              />
            </div>
            {/* )} */}

            {/* รายละเอียดข่าว */}
            <div className="p-4">
              <h2 className="text-2xl text-blue-500 font-bold truncate">{article.news_title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 line-clamp-3 min-h-[4.5rem]">
                {article.news_description}
              </p>

              <button 
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              // onClick={() => router.push(`/News/${article.id}`)}
              onClick={() => handleReadMore(article)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="my-5">
        <Pagination className="">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white"/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
