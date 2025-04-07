"use server"; 
import { supabase } from "@/hook/supabase"; 
import { NewsProductsType } from "@/components/ManageNewsProducts/NewsProductsType";




export async function fetchSingleNewProduct(id:number): Promise<NewsProductsType> {  
   const { data, error } = await supabase
                 .from("news_product")
                 .select("*")
                 .eq("id", id)
                 .single();
    if (error) {
    //   console.error("Error fetching type :", error.message);
      throw new Error(error.message);
    }
    // console.log(data);
    return data as NewsProductsType;
  }
  
  
  
