"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  // Button,
  Card,
  ConfigProvider,
  Descriptions,
  Input,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  SearchOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType, ProductionImageType } from "./ProductionType";
// import { Button } from "../atom/buttom";
import { toast } from "sonner";
import DeleteModal from "../ui/deletemodal";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// const ProductTypeOptions = [
//   { label: "ALL PRODUCTS", value: "allproducts" },
//   { label: "CAR LIGHT", value: "carlight" },
// ];

export default function Prodcuts() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [itemSearch, setItemSearch] = useState<string>("");

  const [productType, setProductType] = useState<string>(""); // Make sure this is undefined initially
  const [carMaker, setCarMaker] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [tycNo, setTycNo] = useState<string>("");
  const [oemNo, setOemNo] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [itemNumber, setItemNumber] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [itemFile, setItemFile] = useState<File[] | null>(null); // Change to an array of File

  // const [oemNo, setOemNo] = useState<string>("");
  const [searchOemNo, setSearchOemNo] = useState<string>("");
  const [searchMaterialNo, setSearchMaterialNo] = useState<string>("");
  const [searchVehicleBrand, setSearchVehicleBrand] = useState<string>("");
  const [searchVehicleModel, setSearchVehicleModel] = useState<string>("");
  const [searchSide, setSearchSide] = useState<string>("");
  const [searchProductBrand, setSearchProductBrand] = useState<string>("");

  const [searchSelectBrand, setSearchSelectProductBrand] = useState<string>("");
  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<
    string | null
  >(null);

  // Function to handle the clearing of all form fields
  const handleClear = () => {
    setSearchOemNo("");
    setSearchMaterialNo("");
    setSearchVehicleBrand("");
    setSearchVehicleModel(""); // ล้างค่า Vehicle Model
    setSelectedVehicleBrand(null); // ล้างค่า Vehicle Brand เพื่อ disable Model
    setSearchSide("");
    setSearchProductBrand("");
  };

  // Handle search when "Search" button is clicked
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "item_product",
      searchOemNo,
      searchMaterialNo,
      searchVehicleBrand,
      searchVehicleModel,
      searchSide,
      searchProductBrand,
      currentPage,
    ],
    queryFn: async () => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;

      // Build dynamic filter conditions based on input values
      let filters = [];
      if (searchOemNo) filters.push(`oem_no.ilike.%${searchOemNo}%`);
      if (searchMaterialNo)
        filters.push(`material_no.ilike.%${searchMaterialNo}%`);
      if (searchVehicleBrand) {
        filters.push(`vehicle_brand.ilike.%${searchVehicleBrand}%`);
        filters.push(`vehicle_brand_full.ilike.%${searchVehicleBrand}%`);
      }
      if (searchVehicleModel) {
        filters.push(`vehicle_model.ilike.%${searchVehicleModel}%`);
        filters.push(`vehicle_model_full.ilike.%${searchVehicleModel}%`);
      }
      if (searchSide) filters.push(`left_right.ilike.%${searchSide}%`);
      if (searchProductBrand)
        filters.push(`product_brand.ilike.%${searchProductBrand}%`);

      const query = supabase
        .from("item_product")
        .select("*,item_image(*)", { count: "exact" })
        .range(start, end);

      // Apply filters if any are present
      if (filters.length > 0) {
        query.or(filters.join(","));
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data, total: count || 0 };
    },
  });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (newProduct: any) => {
  //     // ตรวจสอบข้อมูลให้ครบถ้วนก่อนการเพิ่ม
  //     if (
  //       !newProduct.item_number ||
  //       !newProduct.item_description ||
  //       !newProduct.brand ||
  //       !newProduct.model
  //     ) {
  //       toast.error("Please fill in all the required fields.");
  //       throw new Error("Missing required fields");
  //     }

  //     // ตรวจสอบว่า item_number นี้มีอยู่ในฐานข้อมูลหรือไม่
  //     const { data: existingItem, error: fetchError } = await supabase
  //       .from("item_product")
  //       .select("item_number")
  //       .eq("item_number", newProduct.item_number);

  //     if (fetchError) {
  //       toast.error("Error checking item number!");
  //       throw fetchError;
  //     }

  //     // หากพบ item_number ที่ซ้ำกัน ให้เรียก onError
  //     if (existingItem && existingItem.length > 0) {
  //       const error = new Error(
  //         `Item number ${newProduct.item_number} already exists!`
  //       );
  //       throw error; // เกิดข้อผิดพลาดและโยนไปที่ onError
  //     }

  //     // ถ้าไม่มีการซ้ำ ให้ดำเนินการแทรกข้อมูลใหม่
  //     const { data, error } = await supabase
  //       .from("item_product")
  //       .insert({
  //         item_number: newProduct.item_number,
  //         item_description: newProduct.item_description,
  //         brand: newProduct.brand,
  //         model: newProduct.model,
  //       })
  //       .select("id")
  //       .single();

  //     if (error) throw error;

  //     console.log("data", data);

  //     // ถ้ามีไฟล์ให้ทำการอัพโหลด
  //     if (newProduct.file && newProduct.file.length > 0) {
  //       const paths = await uploadFiles(newProduct.file);

  //       if (!paths) return; // หากการอัพโหลดล้มเหลว ให้หยุดการทำงาน

  //       const imagePaths = paths.map((path) => ({
  //         item_id: data.id,
  //         path,
  //       }));

  //       const { error: ImageError } = await supabase
  //         .from("item_image")
  //         .insert(imagePaths);

  //       if (ImageError) throw ImageError;
  //     }

  //     return data;
  //   },
  //   onSuccess: async () => {
  //     toast.success("Success to Mutate");
  //     await queryClient.invalidateQueries({
  //       queryKey: ["item_product", itemSearch],
  //     });
  //   },
  //   onError: async (error) => {
  //     // แสดง error เมื่อเกิดข้อผิดพลาด
  //     toast.error(error.message);
  //   },
  // });

  const { data: vehicleBrands, isLoading: isLoadingVehicleBrands } = useQuery({
    queryKey: ["vehicle_brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("item_product")
        .select("vehicle_brand");

      if (error) throw error;

      // ใช้ Set กรองค่าไม่ให้ซ้ำ และแปลงกลับเป็น Array ที่มี label กับ value
      const uniqueVehicleBrands = Array.from(
        new Set(data.map((item) => item.vehicle_brand))
      )
        .filter((brand) => brand && brand.trim() !== "") // ลบค่า null, undefined, และค่าว่าง
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
    queryKey: ["vehicle_models", selectedVehicleBrand], // ดึงเฉพาะแบรนด์ที่เลือก
    queryFn: async () => {
      if (!selectedVehicleBrand) return []; // ถ้ายังไม่เลือก vehicle_brand ให้คืนค่าเป็น []

      const { data, error } = await supabase
        .from("item_product")
        .select("vehicle_model")
        .eq("vehicle_brand", selectedVehicleBrand); // ดึงเฉพาะ model ที่ตรงกับ brand ที่เลือก

      if (error) throw error;

      // ใช้ Set กรองค่าไม่ให้ซ้ำ และแปลงเป็น array
      const uniqueVehicleModels = Array.from(
        new Set(data.map((item) => item.vehicle_model))
      )
        .filter((model) => model && model.trim() !== "") // ลบค่า null, undefined, และค่าว่าง
        .sort((a, b) => a.localeCompare(b)) // เรียงตามตัวอักษร
        .map((model) => ({
          label: model,
          value: model,
        }));

      return uniqueVehicleModels;
    },
    enabled: !!selectedVehicleBrand, // ทำงานก็ต่อเมื่อเลือก brand แล้ว
    staleTime: 10 * 60 * 1000, // cache 10 นาที
  });

  // Upload file using standard upload
  async function uploadFiles(files: File[]) {
    const filePaths: string[] = []; // เก็บ paths ของไฟล์ทั้งหมด

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`; // ตั้งชื่อไฟล์ที่ไม่ซ้ำ
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("product_image")
        .upload(filePath, file, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        toast.error("Upload failed!");
        console.error("Upload error:", error);
        return null;
      }

      const publicURL = supabase.storage
        .from("product_image")
        .getPublicUrl(filePath).data.publicUrl;

      if (!publicURL) {
        toast.error("Failed to get public URL!");
        console.error("URL error:", publicURL);
        return null;
      }

      filePaths.push(publicURL); // เก็บ public URL ของแต่ละไฟล์

      toast.success("Upload successful!");
      console.log("File uploaded:", data);
    }

    return filePaths; // คืนค่า array ของ paths
  }

  async function deleteProduct(productId: string) {
    // Now, delete the item_product entry
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

    // Invalidate and refetch the queries to refresh the data
    await queryClient.invalidateQueries({
      queryKey: ["item_product", itemSearch],
    });
  }

  const handleAddToCart = (productId: string) => {
    // ดึงข้อมูลตระกร้าปัจจุบันจาก localStorage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // เช็คว่ามีสินค้ารายการนี้ในตระกร้าหรือไม่
    if (!cart.includes(productId)) {
      // ถ้าไม่มี ให้เพิ่ม id ของสินค้าลงไป
      cart.push(productId);
      // บันทึกข้อมูลกลับไปที่ localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!");
    } else {
      toast.info("Product is already in the cart.");
    }
    router.refresh();
  };

  const totalPages = Math.ceil((data?.total || 0) / pageSize);
  const pageLimit = 5;

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
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50" />

          <img
            src="https://www.tyc.com.tw/assets/images/ecatalog-banner.png"
            alt="TYC Building"
            className="w-full h-[300px] object-cover"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
            <h1 className="text-7xl font-bold">Products</h1>
            <p className="text-xl font-bold">Our Innovations , Our Products</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 ">
        <div className="bg-white p-6 rounded-lg shadow-md mt-2 relative z-10">
          <h1 className="text-3xl font-bold my-2 text-blue-500">
            Search Product
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ConfigProvider
              theme={{
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
                token: {
                  colorBorder: "black",
                  fontSize: 16,
                },
              }}
            >
              <Select
                showSearch
                placeholder="Vehicle Brand"
                style={{ width: "100%" }}
                options={vehicleBrands || []} // ใช้ข้อมูลที่ดึงมา หรือ [] ถ้ายังโหลดไม่เสร็จ
                loading={isLoadingVehicleBrands} // แสดงสถานะโหลด
                value={selectedVehicleBrand}
                onChange={(value) => {
                  setSelectedVehicleBrand(value); // บันทึกค่าที่เลือก
                  setSearchVehicleBrand(value); // อัปเดต state ค้นหา
                  setSearchVehicleModel(""); // ล้างค่า Vehicle Model ทุกครั้งที่เลือก Brand ใหม่
                }}
              />

              <Select
                showSearch
                placeholder="Vehicle Model"
                style={{ width: "100%" }}
                disabled={!selectedVehicleBrand} // ปิดถ้าไม่ได้เลือก Vehicle Brand
                options={vehicleModels || []} // ใช้ข้อมูล vehicle_model ที่โหลดมา
                loading={isLoadingVehicleModels}
                value={searchVehicleModel}
                onChange={setSearchVehicleModel}
              />

              <Input
                placeholder="OEM No."
                style={{ width: "100%" }}
                value={searchOemNo}
                onChange={(e) => setSearchOemNo(e.target.value)}
              />
              <Input
                placeholder="Material No"
                style={{ width: "100%" }}
                value={searchMaterialNo}
                onChange={(e) => setSearchMaterialNo(e.target.value)}
              />
              <Input
                placeholder="Vehicle Brand"
                style={{ width: "100%" }}
                value={searchVehicleBrand}
                onChange={(e) => setSearchVehicleBrand(e.target.value)}
              />
              <Input
                placeholder="Vehicle Model"
                style={{ width: "100%" }}
                value={searchVehicleModel}
                onChange={(e) => setSearchVehicleModel(e.target.value)}
              />
              <Input
                placeholder="Side"
                style={{ width: "100%" }}
                value={searchSide}
                onChange={(e) => setSearchSide(e.target.value)}
              />
            </ConfigProvider>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Search
            </Button>
            <Button
              onClick={handleClear}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="my-5">
          <Pagination className="md:justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  isActive={currentPage !== 1}
                  className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
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
                  className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="my-5">
          {data?.data?.map((product) => (
            <div
              className="flex flex-col  md:flex-row border rounded-lg shadow-sm my-4 p-4 lg:p-0 lg:py-2 lg:px-10"
              key={product.id}
            >
              <div className="flex flex-col md:flex-row gap-5 items-center">
                <img
                  src={
                    product.item_image[0]?.path ||
                    "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg"
                  } // ใช้ path จาก item_image หรือใช้รูปภาพดีฟอลต์
                  alt={product.material_no}
                  width={150}
                  height={100}
                  className="lg:mr-20"
                />
                <Descriptions
                  column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
                >
                  <Descriptions.Item label="OEM No.">
                    {product.oem_no}
                  </Descriptions.Item>
                  <Descriptions.Item label="Material No.">
                    {product.material_no}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vehicle Brand">
                    {product.vehicle_brand}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vehicle Model">
                    {product.vehicle_model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Side">
                    {product.left_right}
                  </Descriptions.Item>
                  <Descriptions.Item label="Product Brand">
                    {product.product_brand}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className="flex items-center my-4 md:my-0">
                <Button
                  className="bg-blue-500 hover:bg-blue-400 w-full md:w-auto"
                  onClick={() => handleAddToCart(product.id.toString())}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
