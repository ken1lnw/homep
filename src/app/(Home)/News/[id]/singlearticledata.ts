"use server"; 
import { supabase } from "@/hook/supabase"; 
import { ProductionType } from "@/components/Production/ProductionType";
import { NewsType } from "@/components/ManageNews/NewsType";




export async function fetchSingleArticle(id:  string | number): Promise<NewsType[]> {
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
  
  
  
