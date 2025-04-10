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
async function uploadFiles(files: File[]): Promise<string[]> {
  const filePaths: string[] = [];

  for (const file of files) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("news_image")
      .upload(filePath, file, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      throw new Error("Upload failed!");
    }

    const publicURL = supabase.storage
      .from("news_image")
      .getPublicUrl(filePath).data.publicUrl;

    if (!publicURL) {
      throw new Error("Failed to get public URL!");
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

  
  
export async function EditNews({
  newsId,
  newsTitle,
  newsDescription,
  createdAt,
  files,
  selectedImages,
}: {
  newsId: number;
  newsTitle: string;
  newsDescription: string;
  createdAt: string;
  files: File[];
  selectedImages: string[];
}) {
  // Check for duplicates
  const { data: existingItem, error: fetchError } = await supabase
    .from("news_article")
    .select("news_title")
    .eq("news_title", newsTitle)
    .neq("id", newsId);

  if (fetchError) {
    throw new Error("Error checking item number!");
  }

  if (existingItem && existingItem.length > 0) {
    throw new Error(`News title ${newsTitle} already exists!`);
  }

  // Handle file upload if there are files
  let uploadedFiles: string[] = [];
  if (files && files.length > 0) {
    uploadedFiles = await uploadFiles(files);
  }

  // Delete previously selected images
  if (selectedImages.length > 0) {
    await handleImageDelete(selectedImages);
  }

  // Proceed with the update
  const { data, error } = await supabase
    .from("news_article")
    .update({
      news_title: newsTitle,
      news_description: newsDescription,
      created_at: createdAt,
    })
    .eq("id", newsId)
    .select("id")
    .single();

  if (error) {
    throw new Error("Error updating news article!");
  }

  // Insert new images if any were uploaded
  if (uploadedFiles.length > 0) {
    const imagePaths = uploadedFiles.map((path) => ({
      news_id: newsId,
      path,
    }));

    const { error: imageError } = await supabase
      .from("news_image")
      .insert(imagePaths);

    if (imageError) {
      throw new Error("Error inserting image data!");
    }
  }

  return data;
}


async function handleImageDelete(selectedImages: string[]) {
  const deletePromises = selectedImages.map(async (imagePath) => {
    await supabase.from("news_image").delete().eq("id", imagePath);
  });

  await Promise.all(deletePromises);
}