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
import {
  deleteNews,
  fetchNews,
} from "@/app/(Admin)/Admin/dashboard/ManageNews/articlefetch";
import { deleteGI, fetchGi } from "@/app/(Admin)/Admin/dashboard/ManageGeneralInquiry/generalinquiryfetch";
import { ViewGeneralInquiryModal } from "./ViewGeneralInquiryModal";

export default function ManageGeneralInquiryTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["inquiry_general", currentPage, searchQuery],
    queryFn: () => fetchGi(currentPage, pageSize, searchQuery),
  });

  const deleteMutation = useMutation({
    mutationFn: (giId: string) => deleteGI(giId),
    onSuccess: () => {
      toast.success("General Inquiry deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["inquiry_general"] });
    },
    onError: (error: any) => {
      // console.error("Error deleting news:", error);
      toast.error("Failed to delete General Inquiry.");
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
            <TableHead className="w-1">No.</TableHead>
            <TableHead className="w-1">Date</TableHead>

            <TableHead className="w-16">Name</TableHead>
            <TableHead className="w-10">Email</TableHead>
            <TableHead className="w-5">Phone</TableHead>
            <TableHead className="w-10">Subject</TableHead>
            <TableHead className="w-10">Message</TableHead>
            <TableHead className="w-10 text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.gi.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell className="w-1">{xx.id}</TableCell>
              <TableCell className="w-1">
                {new Date(xx.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="w-16">{xx.name}</TableCell>
              <TableCell className="w-10">{xx.email}</TableCell>
              <TableCell className="w-5">{xx.phone}</TableCell>
              <TableCell className="max-w-20 truncate">{xx.subject}</TableCell>
              <TableCell className="max-w-20 truncate">
                {xx.message}
              </TableCell>
              <TableCell className="w-20 text-right space-x-1">
                <ViewGeneralInquiryModal gi={xx}/>
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
