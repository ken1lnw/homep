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
import { EditProductModal } from "./EditProductModal";
import { AddProductModal } from "./AddProductModal";
import { Input } from "../ui/input";
import { fetchAllProduct,deleteProduct } from "@/app/(Admin)/Admin/ManageProducts/productdatafetchadmin";

export default function ManageProductsTable() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState(""); // สร้างสถานะเก็บคำค้นหา


  const { data : allData, error, isLoading } = useQuery({
    queryKey: ["item_product", currentPage , searchQuery],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;

      const fetchAllItem = await fetchAllProduct(start,end,searchQuery);
      return { products: fetchAllItem.data, total: fetchAllItem.total };//       const { data, error, count } = await supabase
//         .from("item_product")
//         .select("*,item_image(*)", { count: "exact" })
//         .range(start, end)
//         .or(
//           `item_number.ilike.%${searchQuery}%,item_description.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`
//         )
//         .order("id", { ascending: true })
// ;

      // if (error) throw error;

      // return { products: data as ProductionType[], total: count || 0 };
    },
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading products</div>;

  async function CalldeleteProduct(productId: number) {


    
    // const { error: deleteProductError } = await supabase
    //   .from("item_product")
    //   .delete()
    //   .eq("id", productId);
    const deleteFromDB = await deleteProduct(productId);

    // if (deleteFromDB.error) {
    //   console.error("Error deleting product:", deleteFromDB.error);
    //   toast.error("Failed to delete product.");
    //   return;
    // }

    toast.success("Product and associated images deleted successfully!");
    await queryClient.invalidateQueries({ queryKey: ["item_product"] });
  }

  const totalPages = Math.ceil((allData?.total || 0) / pageSize);
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
    <>
      <div className="flex justify-between items-center my-2">
      <Input
          type="text"
          placeholder="Search"
          className="w-48"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddProductModal />
      </div>

      <Table>
        <TableCaption>Total Items : {allData?.total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>OEM No.</TableHead>
            <TableHead>TYC No.</TableHead>
            <TableHead>Item Description</TableHead>
            <TableHead>VBrand</TableHead>
            <TableHead>VModel</TableHead>
            <TableHead>Image</TableHead>

            <TableHead className="text-right">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allData?.products.map((xx) => (
            <TableRow key={xx.id}>
              <TableCell>{xx.oem_no}</TableCell>
              <TableCell>{xx.tyc_no}</TableCell>
              <TableCell>{xx.full_specifications}</TableCell>
              <TableCell>{xx.vehicle_brand_full}</TableCell>
              <TableCell>{xx.vehicle_model_full}</TableCell>
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
                <EditProductModal product={xx} />
                <DeleteModal onDelete={() => CalldeleteProduct(xx.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-5">
       <Pagination className="md:justify-end cursor-default">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        } // ลด currentPage เมื่อกด Previous
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
    </>
  );
}
