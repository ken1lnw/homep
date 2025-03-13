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

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "@/components/Production/ProductionType";
import { Button } from "../ui/button";
import { EditFilled } from "@ant-design/icons";
import { toast } from "sonner";
import DeleteModal from "../ui/deletemodal";
import Image from "next/image";

export default function ManageProductsTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { data, error, isLoading } = useQuery({
    queryKey: ["item_product", currentPage],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;
      const { data, error, count } = await supabase
        .from("item_product")
        .select("*,item_image(*)", { count: "exact" })
        .range(start, end);

      if (error) throw error;

      return { products: data as ProductionType[], total: count || 0 };
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  async function deleteProduct(productId: string) {
    const { error: deleteProductError } = await supabase
      .from("item_product")
      .delete()
      .eq("id", productId);

    if (deleteProductError) {
      console.error("Error deleting product:", deleteProductError);
      toast.error("Failed to delete product.");
      return;
    }

    toast.success("Product and associated images deleted successfully!");
    await queryClient.invalidateQueries({ queryKey: ["item_product"] });
  }

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Item No.</TableHead>
            <TableHead>Item Description</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Image</TableHead>

            <TableHead className="text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell className="font-medium">{xx.item_number}</TableCell>
              <TableCell>{xx.item_description}</TableCell>
              <TableCell>{xx.brand}</TableCell>
              <TableCell>{xx.model}</TableCell>
              <TableCell>
                {xx.item_image.length > 0 && xx.item_image[0].path && (
                  <Image
                    src={xx.item_image[0].path}
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
              </TableCell>

              <TableCell className="text-right space-x-1">
                <Button className="bg-yellow-500 hover:bg-yellow-400">
                  <EditFilled
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  />
                </Button>
                <DeleteModal onDelete={() => deleteProduct(xx.id.toString())} />
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
