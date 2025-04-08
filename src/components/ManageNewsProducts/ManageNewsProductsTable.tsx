"use client";

import React, { useEffect, useState } from "react";
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
import { Input } from "../ui/input";
import { deleteProductNews, fetchAllNewsProducts } from "@/app/(Admin)/Admin/dashboard/ManageNewsProducts/newsproductsdatafetch";
import { AddNewsProductModal } from "./AddNewsProductsModal";
import { EditNewsProductModal } from "./EditNewsProductsModal";
import debounce from "lodash.debounce";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ManageNewsTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(0); // Pagination starting from 0
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
 const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery); 


 useEffect(() => {
      const handler = debounce(() => {
        setDebouncedSearchQuery(searchQuery); 
      }, 500); 
  
      handler(); 
  
      return () => {
        handler.cancel(); 
      };
    }, [searchQuery]);



  // Fetch news articles
  const { data, error, isLoading } = useQuery({
    queryKey: ["news_product", currentPage, debouncedSearchQuery],
    queryFn: () => fetchAllNewsProducts(currentPage * pageSize, (currentPage + 1) * pageSize - 1, debouncedSearchQuery),
  });

  async function CalldeleteProduct(productId: number) {
    const deleteFromDB = await deleteProductNews(productId);
    toast.success("New Product and associated file deleted successfully!");
    await queryClient.invalidateQueries({ queryKey: ["news_product"] });
  }

  const totalPages = Math.ceil((data?.total || 0) / pageSize);
  const pageLimit = 5;

  // Pagination range logic
  const getPageRange = () => {
    const startPage = Math.max(0, currentPage - Math.floor(pageLimit / 2)); // Corrected starting page
    const endPage = Math.min(totalPages - 1, startPage + pageLimit - 1); // Corrected ending page
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <>
      <div className="flex flex-col my-2 gap-2 md:flex-row md:justify-between md:items-center md:gap-0">
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
            <TableHead className="">No.</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Ebook</TableHead>
            <TableHead className="text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell className="max-w-[100px] truncate">{xx.id}</TableCell>
              <TableCell className="max-w-[200px] truncate">
              <Tooltip>
                  <TooltipTrigger> {xx.newp_title}</TooltipTrigger>
                  <TooltipContent>
                    <p>   {xx.newp_title}</p>
                  </TooltipContent>
                </Tooltip>
                



              </TableCell>
              <TableCell className="max-w-[100px] truncate">{new Date(xx.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="max-w-[100px] truncate">
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} // Page 0 is the first page
                isActive={currentPage !== 0}
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
                  {page + 1} {/* Displaying page number starting from 1 */}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                isActive={currentPage !== totalPages - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
