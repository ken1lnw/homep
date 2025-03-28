"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";

export async function fetchNavbarData(searchQuery: string): Promise<ProductionType[]> {
   const { data, error, count } = await supabase
          .from("item_product")
          .select("*,item_image(*)", { count: "exact" })
          .or(
            `full_specifications.ilike.%${searchQuery}%,oem_no.ilike.%${searchQuery}%,tyc_no.ilike.%${searchQuery}%`
          )
          .order("id", { ascending: true })
          .limit(5);
  if (error) {
    console.error("Error fetching vehicle model:", error.message);
    throw new Error(error.message);
  }

  return data as ProductionType[];
}
