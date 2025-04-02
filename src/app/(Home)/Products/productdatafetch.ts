"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";

export async function fetchAllProduct(
  start: number,
  end: number,
  filters?: {
    searchOemNo?: string;
    searchTycNo?: string;
    searchVehicleBrand?: string;
    searchVehicleModel?: string;
    searchSide?: string;
    searchProductBrand?: string;
    searchProductType?: string;
    searchYearFrom?: string;
    searchYearTo?: string;
  }
): Promise<{ data: ProductionType[]; total: number }> {
  const hasFilter = filters && Object.values(filters).some((v) => v !== "");

  if (hasFilter) {

    
    const { data, error , count } = await supabase
    .rpc("get_filtered_products", {
      search_oem_no: filters?.searchOemNo || null,
      search_tyc_no: filters?.searchTycNo || null,
      search_vehicle_brand: filters?.searchVehicleBrand || null,
      search_vehicle_model: filters?.searchVehicleModel || null,
      search_side: filters?.searchSide || null,
      search_product_brand: filters?.searchProductBrand || null,
      search_product_type: filters?.searchProductType || null,
      search_year_from: filters?.searchYearFrom || null,
      search_year_to: filters?.searchYearTo || null,
      // start_row: start,
      // end_row: end,
    },
  
    {
      count : 'exact'
    },
  
  // ).limit(5);
)
.range(0,10);
    if (error) {
      console.error("Error fetching filtered products:", error.message);
      throw new Error(error.message);
    }

    
    // console.log({count});

    return { data: data as ProductionType[], total: count || 0 };
  } else {
    const query = supabase
      .from("item_product")
      .select("*, item_image(*)", { count: "exact" })
      .order("id", { ascending: true })
      .range(start, end);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching all products:", error.message);
      throw new Error(error.message);
    }

    return { data: data as ProductionType[], total: count ?? 0 };
  }
}



export async function fetchTypeProdcut(): Promise<ProductionType[]> {
  // console.log("Fetching type products...");

const { data, error } = await supabase
        .from("item_product")
        .select("product_type");
  if (error) {
    console.error("Error fetching type products:", error.message);
    throw new Error(error.message);
  }
  // console.log("fetched type data");
  return data as ProductionType[];
}


export async function fetchVehicleBrand(): Promise<ProductionType[]> {
  // console.log("Fetching type products...");

 const { data, error } = await supabase
        .from("item_product")
        .select("vehicle_brand_full");
  if (error) {
    console.error("Error fetching vehicle brand :", error.message);
    throw new Error(error.message);
  }
  // console.log("fetched type data");
  return data as ProductionType[];
}


export async function fetchVehicleModel(searchVehicleBrand: string): Promise<ProductionType[]> {
  const { data, error } = await supabase
    .from("item_product")
    .select("vehicle_model_full")
    .eq("vehicle_brand_full", searchVehicleBrand); // ✅ ใช้พารามิเตอร์ที่รับเข้ามา

  if (error) {
    console.error("Error fetching vehicle model:", error.message);
    throw new Error(error.message);
  }

  return data as ProductionType[];
}
