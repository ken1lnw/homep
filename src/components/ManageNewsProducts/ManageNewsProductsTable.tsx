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

import { NewsProductsType } from "./NewsProductsType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteModal from "../ui/deletemodal";
import Image from "next/image";
// import { AddNewsModal } from "./AddNewsModal";
import { Input } from "../ui/input";
// import { EditNewsModal } from "./EditNewsModal";
import { deleteNews } from "@/app/(Admin)/Admin/dashboard/ManageNews/articlefetch";
import { deleteProductNews, fetchAllNewsProducts } from "@/app/(Admin)/Admin/dashboard/ManageNewsProducts/newsproductsdatafetch";
import { AddNewsProductModal } from "./AddNewsProductsModal";
import { EditNewsProductModal } from "./EditNewsProductsModal";

export default function ManageNewsTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news articles
  const { data, error, isLoading } = useQuery({
    queryKey: ["news_product", currentPage, searchQuery],
    queryFn: () => fetchAllNewsProducts(currentPage, pageSize, searchQuery),
   
  });







    async function CalldeleteProduct(productId: number) {
  
      const deleteFromDB = await deleteProductNews(productId);
      toast.success("News Product and associated file deleted successfully!");
      await queryClient.invalidateQueries({ queryKey: ["news_product"] });
    }


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
        <AddNewsProductModal />
      </div>

      <Table>
        <TableCaption>Total Items : {data?.total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Ebook</TableHead>

            <TableHead className="text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell>{xx.id}</TableCell>
              <TableCell
                className="max-w-5 truncate"
              >
                {xx.newp_title}
              </TableCell>
              <TableCell>
                {new Date(xx.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
              <a href={xx.path} target="_blank" className="text-blue-500 hover:underline">
          View
        </a>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <EditNewsProductModal news={xx} />
                <DeleteModal onDelete={() => CalldeleteProduct(xx.id)} />

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
