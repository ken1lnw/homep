"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";

export async function fetchAllProduct(
    start: number,
    end: number,
    filters: string[] = [] 
  ): Promise<{ data: ProductionType[], total: number }> {
    console.log("Fetching All products...");
  
    let query = supabase
      .from("item_product")
      .select("*, item_image(*)", { count: "exact" }) 
      .order("id", { ascending: true })
      .range(start, end); 
  

    //   const {data} = await supabase.rpc('get_filtered_component_lack_for_packing_progress' ,{
    //     p_customer : dlwqdwq,
    //     p_date: dadwqd
    //   }).select('*')
      




    filters.forEach((filter) => {
      const [column, operator, value] = filter.split("."); // แยกค่าสตริงให้เป็นคอลัมน์, operator และ value
  
      // การใช้ .ilike สำหรับกรองข้อมูลที่ตรงกับ pattern
      if (operator === "ilike") {
        query = query.ilike(column, `%${value}%`);
      }
      // การใช้ .gte สำหรับการกรองที่มากกว่าหรือเท่ากับ
      else if (operator === "gte") {
        query = query.gte(column, value);
      }
      // การใช้ .lte สำหรับการกรองที่น้อยกว่าหรือเท่ากับ
      else if (operator === "lte") {
        query = query.lte(column, value);
      }
      // สำหรับกรองทั่วไป
      else {
        query = query.filter(column, operator, value);
      }
    });
  
    // ดึงข้อมูลจากฐานข้อมูล
    const { data, error, count } = await query;
  
    if (error) {
      console.error("Error fetching all products:", error.message);
      throw new Error(error.message);
    }
  
    return { data: data as ProductionType[], total: count ?? 0 };
  }
  