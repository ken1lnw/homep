"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { NewsType } from "../ManageNews/NewsType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { fetchArticleData, PrefetchReadMore } from "./ArticlesData";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";
import { useTranslations } from "next-intl";

export default function Articles() {
  const t = useTranslations("Article");

  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

  const {
    data: articleData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["news_article", currentPage],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;
      const articlefetch = await fetchArticleData(start, end);

      if (error) throw error;

      return articlefetch;
    },
    staleTime: 10 * 60 * 1000,
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
      staleTime: 10 * 60 * 1000,
    });

    // Set Cache ทันทีเพื่อให้หน้าใหม่โหลดเร็วขึ้น
    queryClient.setQueryData(["news_article", article.id], article);

    // นำทางไปยังหน้า News/[id]
    router.push(`/News/${article.id}`);
  };

  const totalPages = Math.ceil((articleData?.total || 0) / pageSize);
  const pageLimit = 5;

  const getPageRange = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-500">
        {/* Latest Articles */}
        {t("subtitle")}
      </h1>

      {isLoading && (
        <div className=" w-full h-full bg-white  flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {articleData?.data.map((article: NewsType) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            {/* รูปภาพข่าว */}
            {/* {article.news_image?.length > 0 && ( */}
            <div className="relative w-full h-52">
              {/* <Image
                src={
                  article.news_image?.[0]?.path ||
                  "/TH-TYC_logo(Global Brand Guideline)_rgb-24.jpg"
                }
                alt={article.news_title}
                layout="fill"
                objectFit="cover "
              /> */}

              <img
                src={
                  article.news_image?.[0]?.path ||
                  "/TH-TYC_logo(Global Brand Guideline)_rgb-24.jpg"
                }
                alt={article.news_title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* )} */}

            {/* รายละเอียดข่าว */}
            <div className="p-4">
              <h2 className="text-2xl text-blue-500 font-bold truncate">
                {article.news_title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 line-clamp-3 min-h-[4.5rem]">
                {article.news_description}
              </p>

              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-500"
                // onClick={() => router.push(`/News/${article.id}`)}
                onClick={() => handleReadMore(article)}
              >
                {/* Read More */}
                {t("read")}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="my-5">
        <Pagination className="md:justify-end cursor-default">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // ลด currentPage เมื่อกด Previous
                isActive={currentPage !== 1}
                className="bg-white text-black hover:bg-transparent hover:text-black/50"
              />
            </PaginationItem>

            {getPageRange().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)} // เปลี่ยน currentPage เมื่อกดที่หน้า
                  isActive={page === currentPage}
                  className={`${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } hover:bg-blue-400 hover:text-white`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                } // เพิ่ม currentPage เมื่อกด Next
                isActive={currentPage !== totalPages}
                className="bg-white text-black hover:bg-transparent hover:text-black/50"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
