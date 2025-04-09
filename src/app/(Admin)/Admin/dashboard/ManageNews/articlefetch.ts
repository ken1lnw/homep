"use server";
import { supabase } from "@/hook/supabase";
import { NewsType } from "@/components/ManageNews/NewsType";

// Fetch news articles with pagination and search
export async function fetchNews(
  currentPage: number,
  pageSize: number,
  searchQuery: string
): Promise<{ news: NewsType[]; total: number }> {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize - 1;





    let query
      if (searchQuery) {
        query = supabase
          .rpc(
            "get_filtered_article_admin",
            {
              searcharticle: searchQuery || null,
            },
            { count: "exact" }
          ).range(start, end)
          .order("id", { ascending: false });
          console.log({start,end});
          
          
            
      }else{
        query = supabase
        .from("news_article")
    .select("*,news_image(*)", { count: "exact" })
    .order("id", { ascending: false })
    .range(start, end);
        
  
      }
    
      const { data, error, count } = await query;



    // console.log(data);
  if (error) {
    // console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news articles.");
  }

  return { news: data as NewsType[], total: count || 0 };
}

// Delete a news article by ID
export async function deleteNews(newsId: string): Promise<void> {
  const { error } = await supabase.from("news_article").delete().eq("id", newsId);

  if (error) {
    console.error("Error deleting news:", error);
    throw new Error("Failed to delete news.");
  }
}




// Upload files to Supabase storage
export async function uploadFiles(files: File[]): Promise<string[] | null> {
    const filePaths: string[] = [];
  
    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
  
      const { data, error } = await supabase.storage
        .from("news_image")
        .upload(filePath, file, {
          contentType: "image/jpeg",
          upsert: true,
        });
  
      if (error) {
        console.error("Upload error:", error);
        return null;
      }
  
      const publicURL = supabase.storage
        .from("news_image")
        .getPublicUrl(filePath).data.publicUrl;
  
      if (!publicURL) {
        console.error("Failed to get public URL!");
        return null;
      }
  
      filePaths.push(publicURL);
    }
  
    return filePaths;
  }
  
  // Add a news article
  export async function addNews(newNews: {
    news_title: string;
    news_description: string;
    file?: File[];
  }): Promise<void> {
    // Check for duplicate news_title
    const { data: existingItem, error: fetchError } = await supabase
      .from("news_article")
      .select("news_title")
      .eq("news_title", newNews.news_title);
  
    if (fetchError) {
      console.error("Error checking news title:", fetchError);
      throw new Error("Error checking news title!");
    }
  
    if (existingItem && existingItem.length > 0) {
      throw new Error(`News Title ${newNews.news_title} already exists!`);
    }
  
    // Insert new news article
    const { data, error } = await supabase
      .from("news_article")
      .insert({
        news_title: newNews.news_title,
        news_description: newNews.news_description,
      })
      .select("id")
      .single();
  
    if (error) {
      console.error("Error inserting news:", error);
      throw new Error("Failed to add news.");
    }
  
    // Upload files if provided
    if (newNews.file && newNews.file.length > 0) {
      const paths = await uploadFiles(newNews.file);
  
      if (!paths) {
        throw new Error("File upload failed.");
      }
  
      const imagePaths = paths.map((path) => ({
        news_id: data.id,
        path,
      }));
  
      const { error: imageError } = await supabase
        .from("news_image")
        .insert(imagePaths);
  
      if (imageError) {
        console.error("Error inserting image paths:", imageError);
        throw new Error("Failed to add news images.");
      }
    }
  }