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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteModal from "../ui/deletemodal";
import Image from "next/image";
import { Input } from "../ui/input";
import { deleteNews, fetchNews } from "@/app/(Admin)/Admin/dashboard/ManageNews/articlefetch";

export default function ManageGeneralInquiryTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news articles
  const { data, error, isLoading } = useQuery({
    queryKey: ["news_article", currentPage, searchQuery],
    queryFn: () => fetchNews(currentPage, pageSize, searchQuery),
  });

  // Delete news article
  const deleteMutation = useMutation({
    mutationFn: (newsId: string) => deleteNews(newsId),
    onSuccess: () => {
      toast.success("News and associated images deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["news_article"] });
    },
    onError: (error: any) => {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news.");
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / pageSize);
  const pageLimit = 5;

  // Pagination range logic
  const getPageRange = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <>
      <div className="flex flex-col  my-2 gap-2 md:flex-row md:justify-between md:items-center  md:gap-0">
        <Input
          type="text"
          placeholder="Search"
          className="w-full md:w-48"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <AddNewsModal /> */}
      </div>

      <Table>
        <TableCaption>Total Items : {data?.total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Date</TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
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
              <TableCell>
                {new Date(xx.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                messssage
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
                {/* <EditNewsModal news={xx} /> */}
                <DeleteModal
                  onDelete={() => deleteMutation.mutate(xx.id.toString())}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-5">
        <Pagination className="cursor-default">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isActive={currentPage !== 1}
              />
            </PaginationItem>
            {getPageRange().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
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
