"use client";

import { useRouter, usePathname } from "next/navigation";

export default function ProductItem() {
  const router = useRouter();
  const pathname = usePathname();

  // ดึงค่าจาก URL ที่เป็น dynamic path เช่น '/products/[id]'
  const id = pathname.split("/").pop(); // ดึงค่าจากชื่อโฟลเดอร์ที่เป็น ID

  return (
    <>
      <p>Current Path: {pathname}</p>
      <p>Product ID: {id}</p> {/* แสดงค่า ID ที่ได้จากชื่อโฟลเดอร์ */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-300 ">Description</div>
          <div className="h-[300px] flex justify-center">
            <img
              src="https://travelinlite-transporters.co.uk/cdn/shop/products/image_33d838f2-855d-4e2b-b772-9f79c728d9d2_large.heic?v=1666793257"
              alt=""
              className="h-[300px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
