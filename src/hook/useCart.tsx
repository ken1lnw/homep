import { useState, useEffect } from "react";

// Custom hook สำหรับดึงข้อมูลตะกร้าและจำนวนสินค้า
export const useCart = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [qty, setQty] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);
  
    const savedQty = JSON.parse(localStorage.getItem("qty") || "{}");
    setQty(savedQty);
  }, []);
  // ฟังก์ชันสำหรับเปลี่ยนแปลงจำนวนสินค้าต่อรายการในตะกร้า
  const handleQtyChange = (id: number, value: number | null) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: value ?? 1,  // ถ้า value เป็น null ให้ใช้ค่าเริ่มต้นเป็น 1
    }));
  };

  return { cartItems, qty, handleQtyChange };
};
