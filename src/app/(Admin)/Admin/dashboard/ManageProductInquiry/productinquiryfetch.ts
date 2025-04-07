"use server";
import { supabase } from "@/hook/supabase";
import { ProductInquiryType } from "@/types/product-inquiry";
// Fetch news articles with pagination and search
export async function fetchPi(
  currentPage: number,
  pageSize: number,
  searchQuery: string
): Promise<{ pi: ProductInquiryType[]; total: number }> {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize - 1;

  let query

  if (searchQuery) {
    query = supabase
      .rpc(
        "get_filtered_product_inquiry",
        {
          searchpi: searchQuery || null,
        },
        { count: "exact" }
      ).range(start, end)
      .order("id", { ascending: false });
      
  }else{
    query = supabase
    .from("inquiry_product")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("id", { ascending: false });
  }

  const { data, error, count } = await query;

  if (error) {
    // console.log(error);
    
    throw new Error("Failed to fetch product inquiry.", error);
  }

  return { pi: data as ProductInquiryType[], total: count || 0 };
}

export async function deletePI(giId: string): Promise<void> {
  const { error } = await supabase
    .from("inquiry_product")
    .delete()
    .eq("id", giId);

  if (error) {
    // console.error("Error deleting pi:", error);
    throw new Error("Failed to delete pi.");
  }
}
