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

export default function CartComponent() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<number[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);
  }, []);

  const { data, error, isLoading, refetch } = useQuery({
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
            <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">Shopping Cart</h1>
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
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          {isLoading && <div>Loading...</div>}
          {data &&
            data.map((xx) => (
              <div
                key={xx.id}
                className="p-4 flex items-center gap-4  rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-4">
                  <div className="col-span-1">
                    {xx.item_image.length > 0 && xx.item_image[0].path && (
                      <Image
                        src={xx.item_image[0].path}
                        alt=""
                        width={150}
                        height={150}
                      />
                    )}
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    <Descriptions column={4}>
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
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <Button
                      variant="destructive"
                      onClick={() => removeFromCart(xx.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
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
