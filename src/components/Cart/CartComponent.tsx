"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { ProductionType } from "../Production/ProductionType";
import { Descriptions } from "antd";
import Image from "next/image";

export default function CartComponent() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(cartData); // Log to check cart data
    setCartItems(cartData);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["item_product", cartItems], // Pass cartItems as part of the query key to ensure the query runs again if cartItems change
    queryFn: async () => {
      if (cartItems.length === 0) return []; // No items to fetch if cart is empty

      const { data, error } = await supabase
        .from("item_product")
        .select("*, item_image(*)")
        .in("id", cartItems); // Filter by ids in cartItems array
      if (error) throw error;

      return data as ProductionType[];
    },
  });

  return (
    <>
      <div>
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
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
