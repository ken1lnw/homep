"use server"; 
import { supabase } from "@/hook/supabase"; 
import { NewsProductsType } from "@/components/ManageNewsProducts/NewsProductsType";




export async function fetchSingleNewProduct(id:number): Promise<NewsProductsType> {  
   const { data, error } = await supabase
                 .from("news_product")
                 .select("*")
                 .eq("id", id)
                 .single();

                //  console.log({id});
                 
    if (error) {
      // console.error(error);
      throw new Error(error.message);
    }
    // console.log(data);
    return data as NewsProductsType;
  }
  
  
  
