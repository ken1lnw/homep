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
import { Input } from "../ui/input";

import { deletePI, fetchPi } from "@/app/(Admin)/Admin/dashboard/ManageProductInquiry/productinquiryfetch";
import { ViewProductInquiryModal } from "./ViewProductInquiryModal";

// import { ViewGeneralInquiryModal } from "./ViewGeneralInquiryModal";

export default function ManageProductInquiryTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["inquiry_product", currentPage, searchQuery],
    queryFn: () => fetchPi(currentPage, pageSize, searchQuery),
  });

  const deleteMutation = useMutation({
    mutationFn: (giId: string) => deletePI(giId),
    onSuccess: () => {
      toast.success("Product Inquiry deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["inquiry_product"] });
    },
    onError: (error: any) => {
      // console.error("Error deleting news:", error);
      toast.error("Failed to delete Product Inquiry.");
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

      <Table className=" w-full">
        <TableCaption>Total Items : {data?.total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1">ID</TableHead>
            <TableHead className="w-1">Date</TableHead>
            <TableHead className="w-16">Comapny</TableHead>
            <TableHead className="w-16">Country</TableHead>
            <TableHead className="w-16">Name</TableHead>
            <TableHead className="w-10">Email</TableHead>
            <TableHead className="w-5">Mobile</TableHead>
            {/* <TableHead className="w-5">Phone</TableHead> */}
            {/* <TableHead className="w-5">Fax</TableHead> */}
            {/* <TableHead className="w-16">Address</TableHead> */}
            <TableHead className="w-16">Inquiry</TableHead>
            {/* <TableHead className="w-16">Product Detail</TableHead> */}
            <TableHead className="w-10 text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pi.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell className="w-1">{xx.id}</TableCell>

              <TableCell className="w-1">
                {new Date(xx.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell className="w-16">{xx.company}</TableCell>

              <TableCell className="w-10">{xx.country}</TableCell>

              <TableCell className="w-16">{xx.name}</TableCell>

              <TableCell className="w-10">{xx.email}</TableCell>

              <TableCell className="w-5">{xx.mobile}</TableCell>

              {/* <TableCell className="w-5">{xx.phone}</TableCell> */}

              {/* <TableCell className="w-5">{xx.fax}</TableCell> */}

              {/* <TableCell className="w-16 max-w-[200px] truncate">
                {xx.address}
              </TableCell> */}

              <TableCell className="w-16 max-w-[200px] truncate">
                {xx.inquiry}
              </TableCell>

              {/* <TableCell className="w-16 max-w-[200px] truncate">
                {xx.product_detail}
              </TableCell> */}

              <TableCell className="w-10 text-right space-x-1">
                <ViewProductInquiryModal pi={xx} />
                {/* หรือถ้ามีปุ่มแก้ไขก็ใส่ตรงนี้ */}
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
