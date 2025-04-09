"use server";
import { supabase } from "@/hook/supabase";
import { NewsProductsType } from "@/components/ManageNewsProducts/NewsProductsType";




// ฟังก์ชันอัปเดตข้อมูลข่าว
export async function EditNewsProduct(updatedData: any): Promise<{ data: NewsProductsType[] }> {
  const {id, newp_title, created_at, path, file } = updatedData;

  let updatedPath = path;

  if (file) {
    updatedPath = await uploadNewsFile(file);
  }

  // อัปเดตข้อมูลใหม่ในฐานข้อมูล
  const { data, error } = await supabase
    .from("news_product")
    .update({
      newp_title: newp_title,
      created_at: created_at,
      path: updatedPath, 
    })
    .eq("id", id)
    .select();
    

  if (error) {
    console.error("Error updating news product:", error.message);
    throw new Error(error.message);
  }


  if (!data) {
    throw new Error("No data returned from the update.");
  }


  return { data: data as NewsProductsType[] };
}

// ฟังก์ชันอัปโหลดไฟล์ PDF ไปยัง Supabase Storage
export async function uploadNewsFile(file: File): Promise<string | null> {
  const filePath = `/${Date.now()}_${file.name}`;

  try {
    // อัปโหลดไฟล์ไปยัง Supabase Storage
    const { data, error } = await supabase.storage
      .from("news.product.ebook")
      .upload(filePath, file, { contentType: "application/pdf", upsert: true });

    if (error) {
      console.error("File upload error:", error.message);
      return null;  // ถ้ามีข้อผิดพลาดในการอัปโหลด
    }

    // รับ public URL ของไฟล์
    const publicURL = supabase.storage.from("news.product.ebook").getPublicUrl(filePath).data.publicUrl;

    if (!publicURL) {
      console.error("Failed to get public URL for file:", file.name);
      return null;  // ถ้าไม่สามารถดึง public URL ได้
    }

    return publicURL;  // คืนค่าคิวอาร์ลของไฟล์ที่อัปโหลด
  } catch (err) {
    console.error("Error uploading file:", err);  // ล็อกข้อผิดพลาดที่ไม่ได้คาดคิด
    return null;
  }
}























export async function   fetchAllNewsProducts(
  start: number,
  end: number,
  filters?: string
): Promise<{ data: NewsProductsType[]; total: number }> {
  // let query = supabase
  //   .from("news_product")
  //   .select("*", { count: "exact" })
  //   .order("created_at", { ascending: false })
  //   .range(start, end); 

  // const { data, error, count } = await query;
let query
  if (filters) {
    query = supabase
      .rpc(
        "get_filtered_new_product",
        {
          searchnewp: filters || null,
        },
        { count: "exact" }
      ).range(start, end)
      .order("id", { ascending: false });
      console.log({start,end});
      
      
        
  }else{
    query = supabase
    .from("news_product")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, end); 
  }

  const { data, error, count } = await query;

  



  // console.log(data);
  if (error) {
    // console.error("Error fetching all news products:", error.message);
    console.log(error);
    throw new Error(error.message);
  }

  return { data: data as NewsProductsType[], total: count ?? 0 };
}




export async function addNewsProduct(newNews: { newp_title: string; created_at: string; file?: File[] }): Promise<void> {
  // Check for duplicate news_title
  const { data: existingItem, error: fetchError } = await supabase
    .from("news_product")
    .select("newp_title")
    .eq("newp_title", newNews.newp_title);

  if (fetchError) {
    throw new Error("Error checking new product title!");
  }

  if (existingItem && existingItem.length > 0) {
    throw new Error(`New Product Title ${newNews.newp_title} already exists!`);
  }

  let filePath = "default-path";  

  if (newNews.file && newNews.file.length > 0) {
    const paths = await uploadFiles(newNews.file);

    if (!paths) {
      throw new Error("File upload failed.");
    }

    filePath = paths[0];  // Use the first file's public URL as the path
  }

  // Insert new news product
  const { data, error } = await supabase
    .from("news_product")
    .insert({
      newp_title: newNews.newp_title,
      created_at: newNews.created_at,
      path: filePath,  // Ensure path is provided here
    })
    .select("id")
    .single();

  if (error) {
    // console.error("Error inserting news product:", error);
    throw new Error("Failed to add new product.");
  }
}


// Function to upload files to Supabase
async function uploadFiles(files: File[]): Promise<string[] | null> {
  const filePaths: string[] = [];

  for (const file of files) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `/${fileName}`; // Storage path should be more structured

    try {
      const { data, error } = await supabase.storage
        .from("news.product.ebook")
        .upload(filePath, file, { contentType: "application/pdf", upsert: true });

      if (error) {
        console.error("File upload error:", error); // Log the error from Supabase
        return null;
      }

      const publicURL = supabase.storage.from("news.product.ebook").getPublicUrl(filePath).data.publicUrl;

      if (!publicURL) {
        console.error("Failed to get public URL for file:", file.name);
        return null;
      }

      filePaths.push(publicURL);
    } catch (err) {
      console.error("Error uploading file:", err); // Log any unexpected errors during upload
      return null;
    }
  }

  return filePaths.length > 0 ? filePaths : null;
}




export async function deleteProductNews(id:number) {


  const { error } = await supabase
    .from("news_product")
    .delete()
    .eq("id", id);

    if (error) {
      console.error("Error fetching all products:", error.message);
      throw new Error(error.message);
    }

return { success: true }; 

}


