"use server"; // ใช้ directive 'use server' สำหรับทำงานฝั่งเซิร์ฟเวอร์

import { supabase } from "@/hook/supabase"; // แหล่งข้อมูลจาก Supabase
import { ProductionType } from "@/components/Production/ProductionType";

// ฟังก์ชันดึงข้อมูลสินค้าจากตะกร้า
export async function fetchCartItems(
  cartItems: number[]
): Promise<ProductionType[]> {
  console.log("Fetching cart items on the server...");

  if (cartItems.length === 0) {
    console.log("No items in the cart.");
    return []; // ถ้าไม่มีสินค้าในตะกร้าให้คืนค่าว่าง
  }

  const { data, error } = await supabase
    .from("item_product")
    .select("*, item_image(*)")
    .in("id", cartItems);

  if (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched data:", data);
  return data as ProductionType[];
}

// ฟังก์ชันดึงข้อมูลสินค้าล่าสุด
export async function fetchRecentProducts(): Promise<ProductionType[]> {
  console.log("Fetching recent products...");

  const { data, error } = await supabase
    .from("item_product")
    .select("*, item_image(*)")
    .order("id", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching recent products:", error.message);
    throw new Error(error.message);
  }
  //   console.log("Recent Prodcut data:", data);
  console.log("fetched data");
  return data as ProductionType[];
}

// export async function fetchProductId(id: number[]): Promise<ProductionType[]> {
//     console.log("Fetching cart items on the server...");

//     if (id.length === 0) {
//       console.log("No items in the cart.");
//       return []; // ถ้าไม่มีสินค้าในตะกร้าให้คืนค่าว่าง
//     }

//    const { data, error } = await supabase
//            .from("item_product")
//            .select("*,item_image(*)")
//            .eq("id", id)
//            .single();

//     if (error) {
//       console.error("Error fetching data:", error.message);
//       throw new Error(error.message);
//     }

//     console.log("Fetched data:", data);
//     return data as ProductionType[];
//   }

export async function fetchProductId(
  id: number
): Promise<ProductionType | null> {
  console.log("Fetching product item on the server...");

  if (!id) {
    console.log("No item id provided.");
    return null; // ถ้าไม่มี id ให้คืนค่า null
  }

  const { data, error } = await supabase
    .from("item_product")
    .select("*,item_image(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched data:", data);
  return data as ProductionType;
}
