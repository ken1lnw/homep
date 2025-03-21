"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "../Production/ProductionType";
import { Descriptions } from "antd";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CartComponent() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // จำนวนรายการต่อหน้า

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);
  }, []);

 
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["item_product", cartItems],
    queryFn: async () => {
      if (cartItems.length === 0) return [];
      const { data, error } = await supabase
        .from("item_product")
        .select("*, item_image(*)")
        .in("id", cartItems);
      if (error) throw error;
      return data as ProductionType[];
    },
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData.map((item: string) => Number(item))); // แปลง string เป็น number
  }, []);

  // ฟังก์ชันลบสินค้า
  const removeFromCart = (id: number) => {
    const updatedCart = cartItems
      .filter((item) => item !== id) // ลบ id ที่เลือกออก
      .map(String); // แปลงเป็น string ก่อนเก็บใน localStorage

    setCartItems(updatedCart.map(Number)); // อัปเดต state โดยแปลงกลับเป็น number
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    refetch(); // อัปเดตข้อมูลใหม่
    router.refresh();
  };



   // คำนวณจำนวนหน้าทั้งหมด
   const totalPages = Math.ceil(cartItems.length / itemsPerPage);

   // ดึงข้อมูลเฉพาะหน้าที่เลือก
   const currentItems = data?.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );
 
   // ฟังก์ชันสร้างช่วงหมายเลขหน้า (แสดงไม่เกิน 5 หน้า)
   const getPageRange = () => {
     const maxPagesToShow = 5;
     let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
     let end = Math.min(totalPages, start + maxPagesToShow - 1);
 
     if (end - start + 1 < maxPagesToShow) {
       start = Math.max(1, end - maxPagesToShow + 1);
     }
 
     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
   };

   

  return (
    <>
      <div>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[150px] bg-black opacity-50" />

          <img
            src="https://www.tyc.com.tw/assets/images/ecatalog-banner.png"
            alt="TYC Building"
            className="w-full h-[150px] object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
            <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
              Shopping Cart
            </h1>
            <p className="text-xl font-bold mt-2">Pick your choice</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-5 px-2 lg:px-0">
        <div className="flex justify-between items-center text-2xl md:text-4xl mt-5">
          <div className="flex gap-2 font-bold">
            <h1>Total Items :</h1>
            <h2 className="text-blue-500">{cartItems.length}</h2>
            <h2>items</h2>
          </div>

          <Button
            variant="destructive"
            onClick={() => {
              setCartItems([]);
              localStorage.setItem("cart", "[]");
              router.refresh();
            }}
          >
            <span>
              <DeleteOutlined className="" /> Clear All
            </span>
          </Button>
        </div>

        {totalPages > 1 && (
  <div className="my-5">
    <Pagination className="md:justify-end">
      <PaginationContent>
        {/* ปุ่มก่อนหน้า */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
          />
        </PaginationItem>

        {/* หมายเลขหน้า */}
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

        {/* ปุ่มถัดไป */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)}

        <div className="grid grid-cols-1 gap-4 mt-6">
          {isLoading && <div>Loading...</div>}
          {currentItems &&
            currentItems.map((xx) => (
              <div
                key={xx.id}
                className="flex flex-col md:flex-row border rounded-lg shadow-sm p-4 lg:p-0 lg:py-2 lg:px-10"
              >
                <div className="flex flex-col md:flex-row gap-5 items-center">
                  <img
                    src={
                      xx.item_image?.length > 0 && xx.item_image[0]?.path
                        ? xx.item_image[0].path
                        : "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                    }
                    alt=""
                    width={150}
                    height={150}
                  />
                  <Descriptions
                    column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
                  >
                    <Descriptions.Item label="OEM No.">
                      {xx.oem_no}
                    </Descriptions.Item>
                    <Descriptions.Item label="Material No.">
                      {xx.material_no}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vehicle Brand">
                      {xx.vehicle_brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vehicle Model">
                      {xx.vehicle_model}
                    </Descriptions.Item>
                    <Descriptions.Item label="Side">
                      {xx.left_right}
                    </Descriptions.Item>
                    <Descriptions.Item label="Product Brand">
                      {xx.product_brand}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="flex items-center my-4 md:my-0">
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(xx.id)}
                    className="w-full md:w-auto"
                  >
                    <span>
                      <DeleteOutlined className="mr-2" />
                      Remove
                    </span>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div>
        {cartItems.length === 0 ? (
          <p>ไม่มีข้อมูลในตะกร้า</p>
        ) : (
          <div>
            <h2>สินค้าที่อยู่ในตะกร้า:</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <p>จำนวน: {cartItems.length}</p>
            <p>สินค้าทั้งหมด {cartItems.join(", ")}</p>
          </div>
        )}
      </div>

      {isLoading && <div>Loading...</div>} */}
    </>
  );
}
