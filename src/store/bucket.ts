import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const nameNewItemStore = "bucket-store";

export const useBucket = create<{
  data: { [key: number]: number };
  setData: (id: number, qty: number) => void;
  removeData: (id: number) => void;  // ฟังก์ชันใหม่สำหรับลบข้อมูลทีละชิ้น
  clearData: () => void;  // เพิ่มฟังก์ชันสำหรับเคลียร์ข้อมูล

}>()(
  devtools(
    persist(
      (set, get) => ({
        data: {},
        setData(id, qty) {
          set((dt) => ({ ...dt, data: { ...dt.data, [id]: qty } }));
        },
        clearData() {
          set(() => ({ data: {} }));  
        },
        removeData(id) {
          set((dt) => {
            const newData = { ...dt.data };
            delete newData[id];  
            return { data: newData };
          });
        },
      }),
      {
        name: nameNewItemStore,
      }
    )
  )
);
