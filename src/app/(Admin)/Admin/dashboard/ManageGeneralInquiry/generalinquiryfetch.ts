"use server";
import { supabase } from "@/hook/supabase";
import { GeneralInquiryType } from "@/types/general-inquiry";

// Fetch news articles with pagination and search
export async function fetchGi(
  currentPage: number,
  pageSize: number,
  searchQuery: string
): Promise<{ gi: GeneralInquiryType[]; total: number }> {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize - 1;

  // const { data, error, count } = await supabase
  //   .from("inquiry_general")
  //   .select("*", { count: "exact" })
  //   .range(start, end)
  //   .or(
  //     `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%,subject.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`
  //   )
  //   .order("id", { ascending: false });



    let query

  if (searchQuery) {
    query = supabase
      .rpc(
        "get_filtered_general_inquiry",
        {
          searchGi: searchQuery || null,
        },
        { count: "exact" }
      ).range(start, end)
      .order("id", { ascending: false });
      
  }else{
    query = supabase
    .from("inquiry_general")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("id", { ascending: false });
  }

  const { data, error, count } = await query;


    // console.log(data);
  if (error) {
    // console.error("Error fetching news:", error);
    throw new Error("Failed to fetch general inquiry.");
  }

  return { gi: data as GeneralInquiryType[], total: count || 0 };
}


export async function deleteGI(giId: string): Promise<void> {
  const { error } = await supabase.from("inquiry_general").delete().eq("id", giId);

  if (error) {
    // console.error("Error deleting gi:", error);
    throw new Error("Failed to delete gi.");
  }
}



