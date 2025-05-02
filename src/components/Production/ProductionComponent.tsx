"use client";
import React, { useState } from "react";
import {
  // Button,

  ConfigProvider,
  Input,
  Select,
} from "antd";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useQuery } from "@tanstack/react-query";
import { ProductionType } from "./ProductionType";
// import { Button } from "../atom/buttom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";
import {
  fetchAllProduct,
  fetchTypeProdcut,
  fetchVehicleBrand,
  fetchVehicleModel,
} from "@/app/(Home)/Products/productdatafetch";
import { useBucket } from "@/store/bucket";
import {useDebounce} from "use-debounce"
import { useTranslations } from "next-intl";

export default function Prodcuts() {
    const t = useTranslations("Product");
  
  const store = useBucket();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;
  // const [oemNo, setOemNo] = useState<string>("");
  const [searchOemNo, setSearchOemNo] = useState<string | null>(null);
  const [searchTycNo, setSearchTycNo] = useState<string | null>(null);
  const [searchVehicleBrand, setSearchVehicleBrand] = useState<string | null>(
    null
  );
  const [searchVehicleModel, setSearchVehicleModel] = useState<string | null>(
    null
  );
  const [searchSide, setSearchSide] = useState<string | null>(null);
  const [searchProductBrand, setSearchProductBrand] = useState<string | null>(
    null
  );
  const [searchProductType, setSearchProductType] = useState<string[]>([]);

  const [searchYearFrom, setSearchYearFrom] = useState<string | null>(null);
  const [searchYearTo, setSearchYearTo] = useState<string | null>(null);




  const [debouncedSearchOemNo] = useDebounce(searchOemNo, 500);
  const [debouncedSearchTycNo] = useDebounce(searchTycNo, 500);
  const [debouncedSearchVehicleBrand] = useDebounce(searchVehicleBrand, 500);
  const [debouncedSearchVehicleModel] = useDebounce(searchVehicleModel, 500);
  const [debouncedSearchSide] = useDebounce(searchSide, 500);
  const [debouncedSearchProductBrand] = useDebounce(searchProductBrand, 500);
  const [debouncedSearchProductType] = useDebounce(searchProductType, 500);
  const [debouncedSearchYearFrom] = useDebounce(searchYearFrom, 500);
  const [debouncedSearchYearTo] = useDebounce(searchYearTo, 500);
  

  // Function to handle the clearing of all form fields
  const handleClear = () => {
    setSearchOemNo("");
    setSearchTycNo("");
    setSearchVehicleBrand("");
    setSearchVehicleModel(""); // ล้างค่า Vehicle Model
    setSearchSide("");
    setSearchProductBrand("");
    setSearchProductType([]);
    setSearchYearFrom("");
    setSearchYearTo("");
  };

  const { data: alldata, isLoading: isLoadingAllProduct } = useQuery({
    queryKey: [
      "product_type",
      currentPage,
      // searchOemNo,
      // searchTycNo,
      // searchVehicleBrand,
      // searchVehicleModel,
      // searchSide,
      // searchProductBrand,
      // searchProductType,
      // searchYearFrom,
      // searchYearTo,

      debouncedSearchOemNo,
      debouncedSearchTycNo,
      debouncedSearchVehicleBrand,
      debouncedSearchVehicleModel,
      debouncedSearchSide,
      debouncedSearchProductBrand,
      debouncedSearchProductType,
      debouncedSearchYearFrom,
      debouncedSearchYearTo,


    ],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;

    //   return await fetchAllProduct(start, end, {
    //   searchOemNo: searchOemNo || undefined,
    //   searchTycNo: searchTycNo || undefined,
    //   searchVehicleBrand: searchVehicleBrand || undefined,
    //   searchVehicleModel: searchVehicleModel || undefined,
    //   searchSide: searchSide || undefined,
    //   searchProductBrand: searchProductBrand || undefined,
    //   searchProductType: searchProductType.length ? searchProductType : undefined,
    //   searchYearFrom: searchYearFrom || undefined,
    //   searchYearTo: searchYearTo || undefined,
    // });



    return await fetchAllProduct(start, end, {
      searchOemNo: debouncedSearchOemNo || undefined,
      searchTycNo: debouncedSearchTycNo || undefined,
      searchVehicleBrand: debouncedSearchVehicleBrand || undefined,
      searchVehicleModel: debouncedSearchVehicleModel || undefined,
      searchSide: debouncedSearchSide || undefined,
      searchProductBrand: debouncedSearchProductBrand || undefined,
      searchProductType: debouncedSearchProductType.length ? debouncedSearchProductType : undefined,
      searchYearFrom: debouncedSearchYearFrom || undefined,
      searchYearTo: debouncedSearchYearTo || undefined,
    });

    
    },
    // staleTime: 10 * 60 * 1000,
  });

  const { data: productType, isLoading: isLoadingProductType } = useQuery({
    queryKey: ["product_type"],
    queryFn: async () => {
      const fetchtype = await fetchTypeProdcut(); // ได้ข้อมูลเลย ไม่ต้องเช็ค error แล้ว

      const uniqueProductType = Array.from(
        new Set(fetchtype.map((item) => item.product_type))
      )
        .filter((type) => type && type.trim() !== "" && type !== "#N/A")
        .sort((a, b) => a.localeCompare(b))
        .map((type) => ({
          label: type,
          value: type,
        }));

      return uniqueProductType;
    },

    staleTime: 10 * 60 * 1000, // 10 นาที
  });

  const { data: vehicleBrands, isLoading: isLoadingVehicleBrands } = useQuery({
    queryKey: ["vehicle_brands"],
    queryFn: async () => {
      const fetchvbrand = await fetchVehicleBrand();
      const uniqueVehicleBrands = Array.from(
        new Set(fetchvbrand.map((item) => item.vehicle_brand_full))
      )
        .filter((brand) => brand && brand.trim() !== "" && brand !== "#N/A") // ลบค่า null, undefined, และค่าว่าง
        .sort((a, b) => a.localeCompare(b)) // เรียงตามตัวอักษร
        .map((brand) => ({
          label: brand,
          value: brand,
        }));

      return uniqueVehicleBrands;
    },
    staleTime: 10 * 60 * 1000, // 10 นาที
  });

  const { data: vehicleModels, isLoading: isLoadingVehicleModels } = useQuery({
    queryKey: ["vehicle_models", searchVehicleBrand],
    queryFn: async () => {
      if (!searchVehicleBrand) return [];

      const fetchvmodel = await fetchVehicleModel(searchVehicleBrand); // ส่งเข้าไปตรงนี้

      const uniqueVehicleModels = Array.from(
        new Set(fetchvmodel.map((item) => item.vehicle_model_full))
      )
        .filter(
          (model) =>
            model && model.trim() !== "" && model !== "0.00" && model !== "#N/A"
        )
        .sort((a, b) => a.localeCompare(b))
        .map((model) => ({
          label: model,
          value: model,
        }));

      return uniqueVehicleModels;
    },
    enabled: !!searchVehicleBrand,
    staleTime: 10 * 60 * 1000,
  });

  const handleAddToCart = (productId: string) => {
    // store.setData(+productId, 1)

    // เช็คว่ามีสินค้าในตะกร้าหรือไม่
    if (store.data[+productId]) {
      // ถ้ามีสินค้าในตะกร้าแล้ว ให้แสดง toast error
      toast.info("Product is already in the cart.");
    } else {
      // ถ้ายังไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าใหม่
      store.setData(+productId, 1); // เพิ่มสินค้าใหม่ไปยัง store
      toast.success("Product added to cart!");
    }

    // ดึงข้อมูลตระกร้าปัจจุบันจาก localStorage
    // let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // // เช็คว่ามีสินค้ารายการนี้ในตระกร้าหรือไม่
    // if (!cart.includes(productId)) {
    //   // ถ้าไม่มี ให้เพิ่ม id ของสินค้าลงไป
    //   cart.push(productId);
    //   // บันทึกข้อมูลกลับไปที่ localStorage
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   toast.success("Product added to cart!");
    // } else {
    //   toast.info("Product is already in the cart.");
    // }
    router.refresh();
  };

  const totalPages = Math.ceil((alldata?.total || 0) / pageSize);
  const pageLimit = 5;
  // console.log("Filtered total:", alldata?.total);
  // console.log("Filtered data:", alldata?.data);
  // Calculate the range of pages to display
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
      <div>
      {(isLoadingAllProduct && isLoadingProductType && isLoadingVehicleBrands ) && (
        <div className="w-full h-full fixed top-0 left-0 bg-white bg-opacity-50 z-50 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-40" />

          <img
            src="https://www.tyc.com.tw/assets/images/ecatalog-banner.png"
            alt="TYC Building"
            className="w-full h-[300px] object-cover"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
            <h1 className="text-7xl font-bold">{t("title")}
              {/* Products */}

            </h1>
            <p className="text-xl font-bold">
              {/* Our Innovations , Our Products */}
              {t("des")}
              
              </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 ">
        <div className="bg-white p-6 rounded-lg shadow-md mt-2 relative z-10">
          <h1 className="text-3xl font-bold my-2 text-blue-500">
            {/* Search Product */}
            {t("search")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: "black",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                },

                components: {
                  Select: {
                    /* here is your component tokens */
                    // optionActiveBg	: "#1677ff",
                    controlHeight: 40,
                  },
                  Input: {
                    controlHeight: 40,
                  },
                },
              }}
            >
              <Select
                mode="multiple"
                showSearch
                placeholder="Product Type"
                style={{ width: "100%" }}
                options={productType || []} // ใช้ข้อมูลที่ดึงมา หรือ [] ถ้ายังโหลดไม่เสร็จ
                loading={isLoadingProductType} // แสดงสถานะโหลด
                allowClear
                // value={searchProductType == "" ? null : searchProductType}
                value={searchProductType} // Make sure it's an array for multiple selection
                onChange={(value) => {
                  setSearchProductType(value); // อัปเดต state ค้นหา
                  // setSearchVehicleBrand("");
                  // setSearchVehicleModel(""); // ล้างค่า Vehicle Model ทุกครั้งที่เลือก Brand ใหม่
                }}
              />

              <Select
                showSearch
                placeholder="Vehicle Brand"
                style={{ width: "100%" }}
                options={vehicleBrands || []} // ใช้ข้อมูลที่ดึงมา หรือ [] ถ้ายังโหลดไม่เสร็จ
                loading={isLoadingVehicleBrands} // แสดงสถานะโหลด
                allowClear
                value={searchVehicleBrand == "" ? null : searchVehicleBrand}
                onChange={(value) => {
                  setSearchVehicleBrand(value); // อัปเดต state ค้นหา
                  // setSearchVehicleModel(""); // ล้างค่า Vehicle Model ทุกครั้งที่เลือก Brand ใหม่
                }}
              />

              <Select
                showSearch
                placeholder="Vehicle Model"
                style={{ width: "100%" }}
                disabled={!searchVehicleBrand} // ปิดถ้าไม่ได้เลือก Vehicle Brand
                options={vehicleModels || []} // ใช้ข้อมูล vehicle_model ที่โหลดมา
                allowClear
                loading={isLoadingVehicleModels}
                value={searchVehicleModel == "" ? "null" : searchVehicleModel}
                onChange={setSearchVehicleModel}
              />

              <Input
                placeholder="OEM No."
                style={{ width: "100%" }}
                value={searchOemNo ?? ""}
                onChange={(e) => setSearchOemNo(e.target.value)}
              />

              <Input
                placeholder="TYC No"
                style={{ width: "100%" }}
                value={searchTycNo ?? ""}
                onChange={(e) => setSearchTycNo(e.target.value)}
              />

              <Input
                placeholder="Year From"
                style={{ width: "100%" }}
                value={searchYearFrom ?? ""}
                onChange={(e) => setSearchYearFrom(e.target.value)}
              />

              <Input
                placeholder="Year To"
                style={{ width: "100%" }}
                value={searchYearTo ?? ""}
                onChange={(e) => setSearchYearTo(e.target.value)}
              />
            </ConfigProvider>
          </div>
          <div className="flex justify-end mt-4 gap-4 items-center">
            {/* <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Search
            </Button> */}
            <div>
              {/* Total Items:  */}
              {t("total")}
              
              
              {alldata?.total}</div>

            <Button
              onClick={handleClear}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {/* Clear */}
              {t("clear")}
            </Button>
          </div>
        </div>

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

        <div className="my-5">
          {isLoadingAllProduct && (
            <div className=" w-full h-full bg-white  flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.isArray(alldata?.data) &&
              alldata.data.map((allproducts: ProductionType) => (
                // <div
                //   className="flex flex-col  md:flex-row  border rounded-lg shadow-sm my-4 p-4 lg:p-0 lg:py-2 lg:px-10 md:gap-5 lg:gap-0"
                //   key={allproducts.id}
                // >
                //   <div className="flex flex-col md:flex-row gap-5 items-center w-full">
                //     <div
                //       className="relative group cursor-pointer"
                //       onClick={() => router.push(`/Products/${allproducts.id}`)}
                //     >
                //       <img
                //         src={
                //           allproducts.item_image[0]?.path ||
                //           // "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                //           "/TH-TYC_logoWhite.jpg"
                //         }
                //         alt={allproducts.tyc_no}
                //         width={150}
                //         height={100}
                //         className="rounded-2xl transform transition-all duration-300 ease-in-out group-hover:scale-110 lg:w-[100px] xl:w-[120px] 2xl:w-[150px]"
                //       />
                //     </div>
                //     <div className="flex-1 h-full w-full">
                //       <div className="grid grid-cols-1 lg:grid-cols-3 h-full  items-stretch">
                //         <div className="grid grid-cols-2">
                //           <div className="bg-gray-100 flex items-center p-4 rounded-tl-md border border-gray-300 h-full">
                //             OEM No.
                //           </div>
                //           <div className="flex items-center p-4 border-r  rounded-tr lg:rounded-tr-none border-t border-b border-gray-300 h-full">
                //             {allproducts.oem_no}
                //           </div>

                //           <div className="bg-gray-100 flex items-center p-4 lg:rounded-bl-md rounded-none border-l  border-b border-r border-gray-300 h-full">
                //             TYC No.
                //           </div>
                //           <div className="flex items-center p-4  border-gray-300 border-r border-b h-full">
                //             {allproducts.tyc_no}
                //           </div>
                //         </div>

                //         <div className="grid grid-cols-2">
                //           <div className="bg-gray-100 flex items-center p-4 lg: border-l lg:border-l-0 border-r border-b lg:border-t border-gray-300 h-full">
                //             Vehicle Brand
                //           </div>
                //           <div className="flex items-center p-4 border-r lg:border-r-0 lg:border-t border-b border-gray-300 h-full">
                //             {allproducts.vehicle_brand}
                //           </div>

                //           <div className="bg-gray-100 flex items-center p-4 border-b border-l lg:border-l-0  border-r border-gray-300 h-full">
                //             Vehicle Model
                //           </div>
                //           <div className="flex items-center p-4 border-r border-b lg:border-r-0 border-gray-300 h-full">
                //             {allproducts.vehicle_model}
                //           </div>
                //         </div>

                //         <div className="grid grid-cols-2">
                //           <div className="bg-gray-100 flex items-center p-4 lg:border border-l border-r border-b border-gray-300 h-full">
                //             Product Brand
                //           </div>
                //           <div className="flex items-center p-4 lg:rounded-tr-md lg:border-t border-b border-r border-gray-300 h-full">
                //             {allproducts.product_brand}
                //           </div>

                //           <div className="bg-gray-100 flex items-center p-4 border-l border-b border-r border-gray-300 rounded-bl-md lg:rounded-bl-none h-full">
                //             Vehicle Year
                //           </div>
                //           <div className="flex items-center p-4 rounded-br-md rounded-none border-b border-r border-gray-300 h-full">
                //             {allproducts.vehicle_year}
                //           </div>
                //         </div>
                //       </div>
                //     </div>

                //   </div>

                //   <div className="flex flex-col justify-center gap-5 items-center my-4 md:my-0 lg:ml-5">
                //     <Button
                //       className="bg-[#E81F76] hover:bg-blue-400 w-full md:w-auto  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                //       onClick={() => handleAddToCart(allproducts.id.toString())}
                //     >
                //       Add to Cart
                //     </Button>

                //     <Button
                //       className="bg-gray-500 hover:bg-gray-400 w-full"
                //       onClick={() => router.push(`/Products/${allproducts.id}`)}
                //     >
                //       Detail
                //     </Button>
                //   </div>

                // </div>
                <div className="flex flex-col border rounded-lg shadow-sm" key={allproducts.id}>
                  <div className="flex border-b-2 gap-2 bg-gray-50 p-2">
                    <div
                      className="relative group cursor-pointer w-[120px] h-[120px] md:w-[150px] md:h-[150px] 2xl:w-[200px] 2xl:h-[200px] "
                      onClick={() => router.push(`/Products/${allproducts.id}`)}
                    >
                      <img
                        src={
                          allproducts.item_image[0]?.path ||
                          // "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                          "/TH-TYC_logoWhite.jpg"
                        }
                        alt={allproducts.tyc_no}
                        // width={150}
                        // height={100}
                        className="rounded-2xl transform transition-all duration-300 ease-in-out group-hover:scale-110 w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col justify-center text-lg">
                      <div className="flex gap-2">
                        <div className="text-gray-600">TYC No. :</div>{" "}
                        <div> {allproducts.tyc_no}</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-gray-600">OEM No. :</div>{" "}
                        <div> {allproducts.oem_no}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex gap-2">
                      <div className="text-gray-600">Vehicle Brand :</div>
                      <div className="">{allproducts.vehicle_brand}</div>
                    </div>

                    <div className="flex gap-2">
                      <div className="text-gray-600">Vehicle Model :</div>
                      <div className="">{allproducts.vehicle_model}</div>
                    </div>

                    <div className="flex gap-2">
                      <div className="text-gray-600">Vehicle Year :</div>
                      <div className="">{allproducts.vehicle_year}</div>
                    </div>


                    <div className="flex gap-2">
                      <div className="text-gray-600">ProductType :</div>
                      <div className="">{allproducts.product_type}</div>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 border-t-2 bg-gray-100 flex flex-col lg:flex-row lg:justify-between">
                    <Button
                      className="bg-[#E81F76] hover:bg-blue-400  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-full md:w-auto"
                      onClick={() => handleAddToCart(allproducts.id.toString())}
                    >
                      {/* Add to Cart */}
                      {t("add")}
                    </Button>

                    <Button
                      className="bg-gray-500 hover:bg-gray-400 w-full md:w-auto"
                      onClick={() => router.push(`/Products/${allproducts.id}`)}
                    >
                      {/* Detail */}
                      {t("detail")}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
