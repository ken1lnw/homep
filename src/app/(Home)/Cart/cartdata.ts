// 'use server'

// export const getData = async() => {
//        const { data, error } = await supabase
//             .from("item_product")
//             .select("*, item_image(*)")
//             .in("id", cartItems);
//           if (error) throw error;
//           return data as ProductionType[];
// }

"use server"; // ใช้ directive 'use server' สำหรับทำงานฝั่งเซิร์ฟเวอร์

import { supabase } from "@/hook/supabase"; // แหล่งข้อมูลจาก Supabase
import { ProductionType } from "@/components/Production/ProductionType";
import { ProductInquiryType } from "@/types/product-inquiry";



export async function addProductInquiry(cartData: Omit<ProductInquiryType, 'id' | 'created_at'>[]): Promise<ProductInquiryType[]> {


  const { data, error } = await supabase
    .from("inquiry_product")
    .insert(cartData) 
    .select();
  
  if (error) throw new Error(error.message); 
  
  return data as ProductInquiryType[]; 
  
  }
  
  

  
  

export async function fetchCartItems(cartItems: number[]): Promise<ProductionType[]> {


    // console.log("Fetching cart items on the server..."); // เช็คว่าเข้าไปในฟังก์ชันนี้
    // if (cartItems.length === 0) {
    //     console.log("No items in the cart.");
    //     return []; // ถ้าไม่มีสินค้าในตะกร้าให้คืนค่าว่าง
    //   }

  if (cartItems.length === 0) return []; // ถ้าไม่มีสินค้าในตะกร้าให้คืนค่าว่าง

  const { data, error } = await supabase
    .from("item_product")
    .select("*, item_image(*)")
    .in("id", cartItems);

  if (error) throw new Error(error.message); // ถ้ามีข้อผิดพลาดให้ throw error

//   if (error) {
//     console.error("Error fetching data:", error.message); // เช็คข้อผิดพลาด
//     throw new Error(error.message); // ถ้ามีข้อผิดพลาดให้ throw error
//   }

// console.log("Fetched data:", data); // เช็คข้อมูลที่ได้จากฐานข้อมูล
  return data as ProductionType[]; // คืนข้อมูลที่ได้จาก Supabase
}



