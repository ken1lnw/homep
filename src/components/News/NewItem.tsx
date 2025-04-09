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

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { fetchArticleData, PrefetchReadMore } from "./ArticlesData";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";
import { Button } from "../atom/buttom";
import { fetchAllNewsProducts } from "@/app/(Admin)/Admin/dashboard/ManageNewsProducts/newsproductsdatafetch";
import { NewsProductsType } from "../ManageNewsProducts/NewsProductsType";
import { useTranslations } from "next-intl";

export default function NewItems() {
  const t = useTranslations("NewProduct");
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const {
    data: newsProductsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["news_product", currentPage],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;
      const newProduct = await fetchAllNewsProducts(start, end);

      if (error) throw error;

      return newProduct;
    },
    // staleTime: 10 * 60 * 1000,
  });

  const totalPages = Math.ceil((newsProductsData?.total || 0) / pageSize);
  const pageLimit = 5;

  const getPageRange = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", options); // จะได้ผลลัพธ์เป็น 'Feb 2025'
  };

  return (
    <div className="container mx-auto p-4">
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

      <div className="grid grid-cols-1 gap-4 mb-5">
        {newsProductsData?.data.map((item: NewsProductsType) => (
          <div
            key={item.id}
            className="bg-white grid grid-cols-1 md:flex items-center gap-4 border-blue-500 border-2 rounded-md text-xl md:h-16"
          >
            <div className="bg-blue-500 h-full w-full flex items-center text-white px-5 md:w-36">
              {formatDate(item.created_at)} {/* แสดงเดือนและปีจาก created_at */}
            </div>
            <div className="text-black truncate overflow-hidden pl-2 md:pl-0 md:max-w-[400px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]">
              {item.newp_title}
            </div>{" "}
            <div className="md:ml-auto p-2">
              <Button
                className="bg-gray-500 text-white text-base rounded-md md:w-32 hover:bg-pink-500 md:ml-auto mr-4 w-full"
                // onClick={() => router.push(`/News/NewProduct/${item.id}`)} // เปลี่ยนเป็นส่ง id ไปใน URL
                onClick={() => router.push(`/News/NewProduct/${item.id}`)}
              >
                {/* Detail */}
                {t("detail")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
