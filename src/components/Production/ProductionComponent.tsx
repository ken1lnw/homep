"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
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

const ProductTypeOptions = [
  { label: "ALL PRODUCTS", value: "allproducts" },
  { label: "CAR LIGHT", value: "carlight" },
];

export default function Prodcuts() {
  const [productType, setProductType] = useState<string | undefined>(undefined); // Make sure this is undefined initially
  const [carMaker, setCarMaker] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [tycNo, setTycNo] = useState<string>("");
  const [oemNo, setOemNo] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [itemSearch, setItemSearch] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter()
  const [itemNumber, setItemNumber] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [itemFile, setItemFile] = useState<File[] | null>(null); // Change to an array of File

  // Function to handle the clearing of all form fields
  const handleClear = () => {
    setProductType(undefined);
    setCarMaker("");
    setCarModel("");
    setTycNo("");
    setOemNo("");
    setYearFrom("");
    setYearTo("");
  };

  const products = [
    {
      carmaker: "AF",
      carmodel: "1-47 2001-2004	",
      product: "HEAD LAMP K TYPE",
      tycno: "20-A121/22-05,20-A121/22-C5",
      oemno: "RH: 46556565,LH: 46556564",
      image: "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg",
    },

    {
      carmaker: "AF",
      carmodel: "1-45 / 1-46 1994-2001",
      product: "HEAD LAMP K TYPE",
      tycno: "20-5437-08,20-5438-08",
      oemno: "60628721,60628720",
      image: "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg",
    },

    {
      carmaker: "AF",
      carmodel: "	1-47 2001-2004",
      product: "HEAD LAMP A TYPE BLACK GTA LOOK",
      tycno: "20-A121-B5,20-A122-B5",
      oemno: "60698931,60698927",
      image: "https://m.media-amazon.com/images/I/61dpPjdEaAL.jpg",
    },
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ["item_product", itemSearch],
    queryFn: async () => {
      if (itemSearch == "") {
        const { data, error } = await supabase
          .from("item_product")
          .select("*,item_image(*)");
        if (error) throw error;

        return data as ProductionType[];
      } else {
        const { data, error } = await supabase
          .from("item_product")
          .select("*,item_image(*)")
          .or(
            `item_number.ilike.%${itemSearch}%,item_description.ilike.%${itemSearch}%,brand.ilike.%${itemSearch}%,model.ilike.%${itemSearch}%`
          );
        if (error) throw error;
        return data as ProductionType[];
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (newProduct: any) => {
      // ตรวจสอบข้อมูลให้ครบถ้วนก่อนการเพิ่ม
      if (
        !newProduct.item_number ||
        !newProduct.item_description ||
        !newProduct.brand ||
        !newProduct.model
      ) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      // ตรวจสอบว่า item_number นี้มีอยู่ในฐานข้อมูลหรือไม่
      const { data: existingItem, error: fetchError } = await supabase
        .from("item_product")
        .select("item_number")
        .eq("item_number", newProduct.item_number);

      if (fetchError) {
        toast.error("Error checking item number!");
        throw fetchError;
      }

      // หากพบ item_number ที่ซ้ำกัน ให้เรียก onError
      if (existingItem && existingItem.length > 0) {
        const error = new Error(
          `Item number ${newProduct.item_number} already exists!`
        );
        throw error; // เกิดข้อผิดพลาดและโยนไปที่ onError
      }

      // ถ้าไม่มีการซ้ำ ให้ดำเนินการแทรกข้อมูลใหม่
      const { data, error } = await supabase
        .from("item_product")
        .insert({
          item_number: newProduct.item_number,
          item_description: newProduct.item_description,
          brand: newProduct.brand,
          model: newProduct.model,
        })
        .select("id")
        .single();

      if (error) throw error;

      console.log("data", data);

      // ถ้ามีไฟล์ให้ทำการอัพโหลด
      if (newProduct.file && newProduct.file.length > 0) {
        const paths = await uploadFiles(newProduct.file);

        if (!paths) return; // หากการอัพโหลดล้มเหลว ให้หยุดการทำงาน

        const imagePaths = paths.map((path) => ({
          item_id: data.id,
          path,
        }));

        const { error: ImageError } = await supabase
          .from("item_image")
          .insert(imagePaths);

        if (ImageError) throw ImageError;
      }

      return data;
    },
    onSuccess: async () => {
      toast.success("Success to Mutate");
      await queryClient.invalidateQueries({
        queryKey: ["item_product", itemSearch],
      });
    },
    onError: async (error) => {
      // แสดง error เมื่อเกิดข้อผิดพลาด
      toast.error(error.message);
    },
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
    router.refresh()
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                placeholder="Product Type"
                style={{ width: "100%" }}
                options={ProductTypeOptions}
                value={productType}
                onChange={setProductType}
              />
              <Input
                placeholder="CAR MAKER"
                style={{ width: "100%" }}
                value={carMaker}
                onChange={(e) => setCarMaker(e.target.value)}
              />
              <Input
                placeholder="CAR MODEL"
                style={{ width: "100%" }}
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
              <Input
                placeholder="TYC NO."
                style={{ width: "100%" }}
                value={tycNo}
                onChange={(e) => setTycNo(e.target.value)}
              />
              <Input
                placeholder="OEM NO."
                style={{ width: "100%" }}
                value={oemNo}
                onChange={(e) => setOemNo(e.target.value)}
              />
              <Input
                placeholder="YEAR (FROM)"
                style={{ width: "100%" }}
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
              />
              <Input
                placeholder="YEAR (TO)"
                style={{ width: "100%" }}
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              />
            </ConfigProvider>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex  items-center my-4 p-4 rounded-lg shadow gap-4 w-full">
          {/* <Input.Search
              className="!w-1/2"
              onSearch={(e) => {
                setItemSearch(e);
              }}
            /> */}

          <Input
            placeholder="Search"
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
          />

          {/* <Button onClick={() => mutate(
              {

                item_number: "12345",
                item_description: "New Head Lamp",
                brand: "Toyota",
                model: "Hilux",
              }

            )}>sss</Button> */}

          {/* <button
              onClick={() =>
                mutate({
                  item_number: "12345",
                  item_description: "New Head Lamp",
                  brand: "Toyota",
                  model: "Hilux",
                })
              }
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Product
            </button> */}

          <Input
            placeholder="item_number"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
          />
          <Input
            placeholder="item_description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <Input
            placeholder="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <Input
            placeholder="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label htmlFor="myfile">Select a file:</label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            multiple // Allow multiple files
            accept="image/*" // Only allow image files
            className="border-4 border-black"
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files); // Convert FileList to an array
                setItemFile(filesArray); // Store multiple files in state
              } else {
                setItemFile(null); // Reset if no files are selected
              }
            }}
          />

          <button
            onClick={async () => {
              // ตรวจสอบว่า item_number, item_description, brand, model ถูกกรอกหรือไม่
              if (!itemNumber || !itemDescription || !brand || !model) {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({
                  item_number: itemNumber,
                  item_description: itemDescription,
                  brand: brand,
                  model: model,
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                mutate({
                  item_number: itemNumber,
                  item_description: itemDescription,
                  brand: brand,
                  model: model,
                });
              }
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </div>

        {isLoading && <div>Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {data &&
            data.map((xx) => (
              <div
                key={xx.id}
                className="p-4 flex items-center gap-4  rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    {xx.item_image.length > 0 && xx.item_image[0].path && (
                      <Image
                        src={xx.item_image[0].path}
                        alt=""
                        width={150}
                        height={150}
                      />
                    )}
                    {/* <Image
                        src={xx.item_image[0].path}
                        alt=""
                        width={150}
                        height={150}
                      /> */}
                  </div>
                  <div className="col-span-2">
                    <Descriptions column={2}>
                      <Descriptions.Item label="Item no.">
                        {xx.item_number}
                      </Descriptions.Item>
                      <Descriptions.Item label="Desc.">
                        {xx.item_description}
                      </Descriptions.Item>
                      <Descriptions.Item label="Brand">
                        {xx.brand}
                      </Descriptions.Item>
                      <Descriptions.Item label="Model">
                        {xx.model}
                      </Descriptions.Item>
                    </Descriptions>
                    {/* <button
                      onClick={() => deleteProduct(xx.id.toString())}
                      className="bg-red-500 border h-10"
                    >
                      Delete
                    </button> */}
                    {/* <DeleteModal
                      onDelete={() => deleteProduct(xx.id.toString())}
                    /> */}
                  


                    <button
                      onClick={() => handleAddToCart(xx.id.toString())}
                      className="bg-blue-500 text-white rounded mx-2 p-3"
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product.tycno}
              className="p-4 flex items-center gap-4  rounded-lg shadow-sm"
            >
              <img
                src={product.image}
                alt={product.product}
                width={100}
                height={100}
                className="rounded"
              />
              <div className="flex-1">
                {/* <h2 className="text-lg font-bold">{product.id}</h2>
                  <p>{product.name}</p> */}
                <p className="text-gray-500">
                  Car MAKER:{" "}
                  <span className="text-black font-bold">
                    {product.carmaker}
                  </span>
                </p>
                <p className="text-gray-500">
                  Car Model:{" "}
                  <span className="text-black font-bold">
                    {product.carmodel}
                  </span>
                </p>
                <p className="text-gray-500">
                  Car Product:{" "}
                  <span className="text-black font-bold">
                    {product.product}
                  </span>
                </p>
                <p className="text-gray-500">
                  TYC No.:{" "}
                  <span className="text-black font-bold">{product.tycno}</span>
                </p>
                <p className="text-gray-500">
                  OEM No:{" "}
                  <span className="text-black font-bold">{product.oemno}</span>
                </p>

                {/* <p className="text-gray-500">Brand: {product.brand}</p>
                  <p className="text-gray-500">Model: {product.model}</p>
                  <p className="text-gray-500">OEM No: {product.oem}</p> */}
              </div>
              <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center min-w-[120px]">
                <span className="mr-2 text-white">
                  <ShoppingCartOutlined />
                </span>{" "}
                add to cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          <button className="px-3 py-1 border rounded bg-blue-500 hover:bg-blue-300 text-white">
            Prev
          </button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border rounded bg-blue-500 hover:bg-blue-300 text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
