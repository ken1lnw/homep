"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";

export async function fetchNavbarData(searchQuery: string): Promise<ProductionType[]> {
   const { data, error } = await supabase
          .from("item_product")
          .select("*,item_image(*)", { count: "exact" })
          .or(
            `full_specifications.ilike.%${searchQuery}%,oem_no.ilike.%${searchQuery}%,tyc_no.ilike.%${searchQuery}%,vehicle_brand.ilike.%${searchQuery}%,vehicle_brand_full.ilike.%${searchQuery}%,vehicle_model.ilike.%${searchQuery}%,vehicle_model_full.ilike.%${searchQuery}%,vehicle_year.ilike.%${searchQuery}%,product_type.ilike.%${searchQuery}%,left_right.ilike.%${searchQuery}%,product_brand.ilike.%${searchQuery}%`
          )
          .order("id", { ascending: true })
          .limit(5);
  if (error) {
    console.error("Error fetching vehicle model:", error.message);
    throw new Error(error.message);
  }

  return data as ProductionType[];
}
