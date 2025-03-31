"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "../Production/ProductionType";
import { ConfigProvider, Descriptions, InputNumberProps } from "antd";
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
import { toast } from "sonner";
import { fetchCartItems } from "@/app/(Home)/Cart/cartdata";

import { InputNumber } from "antd";

export default function CartComponent() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // จำนวนรายการต่อหน้า

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);
  }, []);

  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["item_product", cartItems],
  //   queryFn: async () => {
  //     if (cartItems.length === 0) return [];
  //     const { data, error } = await supabase
  //       .from("item_product")
  //       .select("*, item_image(*)")
  //       .in("id", cartItems);
  //     if (error) throw error;
  //     return data as ProductionType[];
  //   },
  // });

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["item_product", cartItems],
    queryFn: async () => {
      if (cartItems.length === 0) return [];
      const fetchedData = await fetchCartItems(cartItems); // เก็บค่าผลลัพธ์จากฟังก์ชัน fetchCartItems
      return fetchedData; // คืนค่าข้อมูลที่ดึงมา
    },
  });

  // console.log(error;)

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
    toast.success("Removed Product From Cart");
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
              toast.success("Removed All Products From Cart");
              router.refresh();
            }}
            className="hover:bg-red-500"
          >
            <span>
              <DeleteOutlined className="" /> Clear All
            </span>
          </Button>
        </div>

        {totalPages > 1 && (
          <div className="my-5 cursor-pointer">
            <Pagination className="md:justify-end">
              <PaginationContent>
                {/* ปุ่มก่อนหน้า */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="bg-white text-black hover:bg-transparent hover:text-black/50"
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
                    className="bg-white text-black hover:bg-transparent hover:text-black/50"
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
              // <div
              //   key={xx.id}
              //   className="flex flex-col  md:flex-row  border rounded-lg shadow-sm  p-4 lg:p-0 lg:py-2 lg:px-10"
              // >
              //   <div className="flex flex-col md:flex-row gap-5 items-center w-full">
              //     <div
              //       className="relative group cursor-pointer"
              //       onClick={() => router.push(`/Products/${xx.id}`)}
              //     >
              //       <img
              //         src={
              //           xx.item_image?.length > 0 && xx.item_image[0]?.path
              //             ? xx.item_image[0].path
              //             : "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
              //         }
              //         alt=""
              //         width={150}
              //         height={150}
              //         className="rounded-2xl transform transition-all duration-300 ease-in-out group-hover:scale-110"
              //       />
              //     </div>
              //     <div className="flex-1">
              //       <ConfigProvider
              //         theme={{
              //           token: {
              //             fontSize: 16,
              //             fontFamily: "Montserrat",
              //           },
              //           components: {
              //             Descriptions: {
              //               // labelColor: "black",
              //               // labelBg: "#000000"
              //             },
              //           },
              //         }}
              //       >
              //         <Descriptions
              //           column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 3 }}
              //           bordered
              //         >
              //           <Descriptions.Item label="OEM No." className="">
              //             {xx.oem_no}
              //           </Descriptions.Item>
              //           <Descriptions.Item label="TYC No.">
              //             {xx.tyc_no}
              //           </Descriptions.Item>
              //           <Descriptions.Item label="Vehicle Brand">
              //             {xx.vehicle_brand}
              //           </Descriptions.Item>
              //           <Descriptions.Item label="Vehicle Model">
              //             {xx.vehicle_model}
              //           </Descriptions.Item>

              //           <Descriptions.Item label="Product Brand">
              //             {xx.product_brand}
              //           </Descriptions.Item>

              //           <Descriptions.Item label="Vehicle Year">
              //             {xx.vehicle_year}
              //           </Descriptions.Item>
              //         </Descriptions>
              //       </ConfigProvider>
              //     </div>
              //   </div>
              //   <div className="flex flex-col justify-center gap-2 items-center my-4 md:my-0 ml-5">
              //     <ConfigProvider direction="ltr">
              //       <InputNumber
              //         suffix="QTY"
              //         min={1}
              //         max={999}
              //         defaultValue={1}
              //         style={{ width: "100%"}}
              //         className="center-num "
              //       />
              //     </ConfigProvider>

              //     <Button
              //       className="bg-gray-500 hover:bg-gray-400 w-full"
              //       onClick={() => router.push(`/Products/${xx.id}`)}
              //     >
              //       Detail
              //     </Button>

              //     <Button
              //       variant="destructive"
              //       onClick={() => removeFromCart(xx.id)}
              //       className="w-full  hover:bg-red-500"
              //     >
              //       <span>
              //         <DeleteOutlined className="mr-2" />
              //         Remove
              //       </span>
              //     </Button>
              //   </div>
              // </div>



 <div
                className="flex flex-col  md:flex-row  border rounded-lg shadow-sm my-4 p-4 lg:p-0 lg:py-2 lg:px-10 md:gap-5 lg:gap-0"
                key={xx.id}
              >
                <div className="flex flex-col md:flex-row gap-5 items-center w-full">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => router.push(`/Products/${xx.id}`)}
                  >
                    <img
                      src={
                        xx.item_image[0]?.path ||
                        "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                      }
                      alt={xx.tyc_no}
                      width={150}
                      height={100}
                      className="rounded-2xl transform transition-all duration-300 ease-in-out group-hover:scale-110 lg:w-[100px] xl:w-[120px] 2xl:w-[150px]"
                    />
                  </div>
                  <div className="flex-1 h-full w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                      <div className="grid grid-cols-2">
                        <div className="bg-gray-100 flex items-center p-4 rounded-tl-md border border-gray-300">
                          OEM No.
                        </div>
                        <div className="flex items-center p-4 border-r  rounded-tr lg:rounded-tr-none border-t border-b border-gray-300">
                          {xx.oem_no}
                        </div>

                        <div className="bg-gray-100 flex items-center p-4 lg:rounded-bl-md rounded-none border-l  border-b border-r border-gray-300">
                          TYC No.
                        </div>
                        <div className="flex items-center p-4  border-gray-300 border-r border-b ">
                          {xx.tyc_no}
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="bg-gray-100 flex items-center p-4 lg: border-l lg:border-l-0 border-r border-b lg:border-t border-gray-300">
                          Vehicle Brand
                        </div>
                        <div className="flex items-center p-4 border-r lg:border-r-0 lg:border-t border-b border-gray-300">
                          {xx.vehicle_brand}
                        </div>

                        <div className="bg-gray-100 flex items-center p-4 border-b border-l lg:border-l-0  border-r border-gray-300">
                          Vehicle Model
                        </div>
                        <div className="flex items-center p-4 border-r border-b lg:border-r-0 border-gray-300">
                          {xx.vehicle_model}
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="bg-gray-100 flex items-center p-4 lg:border border-l border-r border-b border-gray-300">
                          Product Brand
                        </div>
                        <div className="flex items-center p-4 lg:rounded-tr-md lg:border-t border-b border-r border-gray-300">
                          {xx.product_brand}
                        </div>

                        <div className="bg-gray-100 flex items-center p-4 border-l border-b border-r border-gray-300 rounded-bl-md lg:rounded-bl-none">
                          Vehicle Year
                        </div>
                        <div className="flex items-center p-4 rounded-br-md rounded-none border-b border-r border-gray-300">
                          {xx.vehicle_year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

       
                <div className="flex flex-col justify-center gap-2 items-center my-4 md:my-0 lg:ml-5">
                   <ConfigProvider direction="ltr">
                     <InputNumber
                      suffix="QTY"
                      min={1}
                      max={999}
                      defaultValue={1}
                      style={{ width: "100%"}}
                      className="center-num"
                    />
                  </ConfigProvider>

                  <Button
                    className="bg-gray-500 hover:bg-gray-400 w-full"
                    onClick={() => router.push(`/Products/${xx.id}`)}
                  >
                    Detail
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(xx.id)}
                    className="w-full  hover:bg-red-500"
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
