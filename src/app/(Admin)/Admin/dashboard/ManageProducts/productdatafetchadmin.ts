  "use server"; 
  import { supabase } from "@/hook/supabase"; 
  import { ProductionType } from "@/components/Production/ProductionType";

  export async function fetchAllProduct(
    start: number,
    end: number,
    filters?: string,
  ): Promise<{ data: ProductionType[]; total: number }> {

    const hasFilter = filters && filters !== "";  // Check if filters are provided
    
    let query = supabase
      .from("item_product")
      .select("*, item_image(*)", { count: "exact" })
      .order("id", { ascending: false })
      .range(start, end);  // Always apply range for pagination

    if (hasFilter) {
      query = query.or(
        `oem_no.ilike.%${filters}%,tyc_no.ilike.%${filters}%,vehicle_brand_full.ilike.%${filters}%,vehicle_model_full.ilike.%${filters}%,full_specifications.ilike.%${filters}%,vehicle_year.ilike.%${filters}%
        ,vehicle_brand.ilike.%${filters}%.ilike.%${filters}%,vehicle_model.ilike.%${filters}%
        `
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching all products:", error.message);
      throw new Error(error.message);
    }

    return { data: data as ProductionType[], total: count ?? 0 };
  }


  // Add product function
  export async function AddProduct(newProduct: {
    oemNumber: string;
    tycNumber: string;
    vehicleBrandShort: string;
    vehicleBrandFull: string;
    vehicleModelShort: string;
    vehicleModelFull: string;
    vehicleYear: string;
    side: string;
    productBrand: string;
    productType: string;
    fullspec: string;
    itemFile?: File[];
  }): Promise<{ data: ProductionType[] }> {

    if (!newProduct.oemNumber || !newProduct.tycNumber || !newProduct.vehicleBrandShort || !newProduct.vehicleBrandFull
      || !newProduct.vehicleModelShort || !newProduct.vehicleModelFull || !newProduct.vehicleYear || !newProduct.side
      || !newProduct.productBrand || !newProduct.productType || !newProduct.fullspec) {
      throw new Error("Please fill in all the required fields.");
    }

    // Check if the item number already exists
    const { data: existingItem, error: fetchError } = await supabase
      .from("item_product")
      .select("tyc_no") // Use tyc_no here to check for duplicates
      .eq("tyc_no", newProduct.tycNumber);  // Compare with tycNumber from new product

    if (fetchError) {
      throw fetchError;
    }

    if (existingItem && existingItem.length > 0) {
      throw new Error(`TYC number ${newProduct.tycNumber} already exists!`);
    }

    // Insert the new product
    const { data, error } = await supabase
      .from("item_product")
      .insert({
        oem_no: newProduct.oemNumber, 
        tyc_no: newProduct.tycNumber,
        vehicle_brand: newProduct.vehicleBrandShort,
        vehicle_brand_full: newProduct.vehicleBrandFull,
        vehicle_model: newProduct.vehicleModelShort,
        vehicle_model_full: newProduct.vehicleModelFull,
        vehicle_year: newProduct.vehicleYear,
        left_right: newProduct.side,
        product_brand: newProduct.productBrand,
        product_type: newProduct.productType,
        full_specifications: newProduct.fullspec,
      })
      .select("id")
      .single();

    if (error) throw error;

    // If there are files, upload them
    if (newProduct.itemFile && newProduct.itemFile.length > 0) {
      const paths = await uploadFiles(newProduct.itemFile);

      if (!paths) {
        throw new Error("File upload failed.");
      }

      // Insert image paths into the database
      const imagePaths = paths.map((path) => ({
        item_id: data.id,
        path,
      }));

      const { error: ImageError } = await supabase
        .from("item_image")
        .insert(imagePaths);

      if (ImageError) throw ImageError;
    }

    return { data: [data] as ProductionType[] }; // Return the inserted product data
  }










  // Function to upload files to Supabase
 export async function uploadFiles(files: File[]): Promise<string[] | null> {
    const filePaths: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`; // Unique file name
      const filePath = `${fileName}`;

      const {  error } = await supabase.storage
        .from("product_image")
        .upload(filePath, file, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.error("Upload error:", error);
        return null;
      }

      const publicURL = supabase.storage
        .from("product_image")
        .getPublicUrl(filePath).data.publicUrl;

      if (!publicURL) {
        console.error("URL error:", publicURL);
        return null;
      }

      filePaths.push(publicURL); // Store the public URL of the file
    }

    return filePaths; // Return the file paths
  }



  export async function deleteProduct(id:number) {


      const { error } = await supabase
        .from("item_product")
        .delete()
        .eq("id", id);

        if (error) {
          console.error("Error fetching all products:", error.message);
          throw new Error(error.message);
        }

  return { success: true }; // ส่งค่าผลลัพธ์ว่าไม่มี error
  
  }





  // Delete selected images from the database
export async function deleteImages(imageIds: number[]): Promise<void> {
  for (const id of imageIds) {
    const { error } = await supabase.from("item_image").delete().eq("id", id);
    if (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}




  
// Update product details in the database
export async function updateProduct(
  productId: number,
  updatedProduct: {
    oemNumber: string;
    tycNumber: string;
    vehicleBrandShort: string;
    vehicleBrandFull: string;
    vehicleModelShort: string;
    vehicleModelFull: string;
    vehicleYear: string;
    side: string;
    productBrand: string;
    productType: string;
    fullspec: string;
    itemFile?: File[];
  },
  selectedImageIds: number[]
): Promise<void> {
  // Delete selected images
  if (selectedImageIds.length > 0) {
    await deleteImages(selectedImageIds);
  }

  // Check for duplicate TYC number
  const { data: existingItem, error: fetchError } = await supabase
    .from("item_product")
    .select("tyc_no")
    .eq("tyc_no", updatedProduct.tycNumber)
    .neq("id", productId);

  if (fetchError) {
    throw fetchError;
  }

  if (existingItem && existingItem.length > 0) {
    throw new Error(`TYC Number ${updatedProduct.tycNumber} already exists!`);
  }

  // Upload new files if provided
  let imagePaths: { item_id: number; path: string }[] = [];
  if (updatedProduct.itemFile && updatedProduct.itemFile.length > 0) {
    const paths = await uploadFiles(updatedProduct.itemFile);
    if (!paths) {
      throw new Error("File upload failed.");
    }

    imagePaths = paths.map((path) => ({
      item_id: productId,
      path,
    }));

    const { error: imageError } = await supabase
      .from("item_image")
      .insert(imagePaths);

    if (imageError) {
      throw imageError;
    }
  }

  // Update product details
  const { error } = await supabase
    .from("item_product")
    .update({
      oem_no: updatedProduct.oemNumber,
      tyc_no: updatedProduct.tycNumber,
      vehicle_brand: updatedProduct.vehicleBrandShort,
      vehicle_brand_full: updatedProduct.vehicleBrandFull,
      vehicle_model: updatedProduct.vehicleModelShort,
      vehicle_model_full: updatedProduct.vehicleModelFull,
      vehicle_year: updatedProduct.vehicleYear,
      left_right: updatedProduct.side,
      product_brand: updatedProduct.productBrand,
      product_type: updatedProduct.productType,
      full_specifications: updatedProduct.fullspec,
    })
    .eq("id", productId);

  if (error) {
    throw error;
  }
}