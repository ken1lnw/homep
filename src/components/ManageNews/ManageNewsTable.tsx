"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { NewsType } from "./NewsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import DeleteModal from "../ui/deletemodal";
import Image from "next/image";
import { AddNewsModal } from "./AddNewsModal";
import { Input } from "../ui/input";
import { EditNewsModal } from "./EditNewsModal";

export default function ManageNewsTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState(""); // สร้างสถานะเก็บคำค้นหา

  const { data, error, isLoading } = useQuery({
    queryKey: ["news_article", currentPage, searchQuery],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;
      const { data, error, count } = await supabase
        .from("news_article")
        .select("*,news_image(*)", { count: "exact" })
        .range(start, end)
        .or(
          `news_title.ilike.%${searchQuery}%,news_description.ilike.%${searchQuery}%`
        )
        .order("id", { ascending: true });
      if (error) throw error;

      return { news: data as NewsType[], total: count || 0 };
    },
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading products</div>;

  async function deleteNews(newsId: string) {
    const { error: deleteNewsError } = await supabase
      .from("news_article")
      .delete()
      .eq("id", newsId);

    if (deleteNewsError) {
      console.error("Error deleting news:", deleteNewsError);
      toast.error("Failed to delete news.");
      return;
    }

    toast.success("News and associated images deleted successfully!");
    await queryClient.invalidateQueries({ queryKey: ["news_article"] });
  }

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <Input
          type="text"
          placeholder="Search"
          className="w-48"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <AddProductModal /> */}
        <AddNewsModal />
      </div>

      <Table>
        <TableCaption>A list of your recent News.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">News No.</TableHead>
            <TableHead>News Title</TableHead>
            <TableHead>News Description</TableHead>
            <TableHead>News Date</TableHead>
            <TableHead>Image</TableHead>

            <TableHead className="text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.news.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell>{xx.id}</TableCell>
              <TableCell className="font-medium">{xx.news_title}</TableCell>
              <TableCell
                className="max-w-5 truncate"
                title={xx.news_description}
              >
                {xx.news_description}
              </TableCell>
              <TableCell className="">
                {/* {xx.created_at} */}
                {new Date(xx.created_at).toLocaleDateString()}

              </TableCell>
              <TableCell>
                {xx.news_image.length > 0 && xx.news_image[0].path && (
                  <Image
                    src={xx.news_image[0].path}
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
              </TableCell>

              <TableCell className="text-right space-x-1">
                <EditNewsModal news={xx} />
                <DeleteModal onDelete={() => deleteNews(xx.id.toString())} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isActive={currentPage !== 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                isActive={currentPage !== totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
