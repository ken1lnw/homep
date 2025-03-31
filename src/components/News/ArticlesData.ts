"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";
import { NewsType } from "../ManageNews/NewsType";


export async function fetchArticleData(start: number, end: number): Promise<{ data: NewsType[]; total: number }> {

 const { data, error ,count} = await supabase
        .from("news_article")
        .select("*,news_image(*)", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(start, end);
        
        
  if (error) {
    console.error("Error fetching type products:", error.message);
    throw new Error(error.message);
  }
  // console.log("fetched type data");
  return { data: data as NewsType[], total: count || 0 };
}



export async function PrefetchReadMore(id:  string | number): Promise<NewsType[]> {
    // console.log("Fetching type products...");
  
   const { data, error } = await supabase
                 .from("news_article")
                 .select("*,news_image(*)")
                 .eq("id", id)
                 .single();
    if (error) {
      console.error("Error fetching type products:", error.message);
      throw new Error(error.message);
    }
    // console.log("fetched type data");
    return data as NewsType[];
  }
  
  
  
