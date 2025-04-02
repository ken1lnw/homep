import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ProductionType } from "../Production/ProductionType";
import ImgPreviewUpload from "./ImgPreviewUpload";
import Image from "next/image";

interface EditProductModalProps {
  product: ProductionType;
}

export function EditProductModal({ product }: EditProductModalProps) {
  const queryClient = useQueryClient();

  // State for controlling modal visibility
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  // const [itemNumber, setItemNumber] = useState(product.item_number || "");
  // const [itemDescription, setItemDescription] = useState(
  //   product.item_description || ""
  // );
  // const [brand, setBrand] = useState(product.brand || "");
  // const [model, setModel] = useState(product.model || "");
  const [itemFile, setItemFile] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);


  const [oemNumber, setOemNumber] = useState(product.oem_no || "");
  const [tycNumber, setTycNumber] = useState(product.tyc_no|| "");
  const [vehicleBrandShort, setVehicleBrandShort] = useState(product.vehicle_brand|| "");
  const [vehicleBrandFull, setVehicleBrandFull] = useState(product.vehicle_brand_full|| "");
  const [vehicleModelShort, setVehicleModelShort] = useState(product.vehicle_model|| "");
  const [vehicleModelFull, setVehicleModelFull] = useState(product.vehicle_model_full|| "");
  const [vehicleYear, setVehicleYear] = useState(product.vehicle_year|| "");
  const [side, setSide] = useState(product.left_right|| "");
  const [productBrand, setProductBrand] = useState(product.product_brand|| "");
  const [productType, setProductType] = useState(product.product_type|| "");
  const [fullspec, setFullspec] = useState(product.full_specifications|| "");

  // Update state if product prop changes
  useEffect(() => {
    // setItemNumber(product.item_number);
    // setItemDescription(product.item_description);
    // setBrand(product.brand);
    // setModel(product.model);


    setOemNumber(product.oem_no); 
    setTycNumber(product.tyc_no); 
    setVehicleBrandShort(product.vehicle_brand); 
    setVehicleBrandFull(product.vehicle_brand_full); 
    setVehicleModelShort(product.vehicle_model); 
    setVehicleModelFull(product.vehicle_model_full); 
    setVehicleYear(product.vehicle_year); 
    setSide(product.left_right); 
    setProductBrand(product.product_brand);  
    setProductType(product.product_type);  
    setFullspec(product.full_specifications); 
    setSelectedImages([]); 
  }, [product]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (updateProduct: any) => {
      // Validate fields before updating
      if (
        !oemNumber ||
        !tycNumber ||
        !vehicleBrandShort ||
        !vehicleBrandFull ||
        !vehicleModelShort ||
        !vehicleModelFull ||
        !vehicleYear ||
        !side ||
        !productBrand ||
        !productType ||
        !fullspec
      ) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      const { data: existingItem, error: fetchError } = await supabase
        // .from("item_product")
        // .select("item_number")
        // .eq("item_number", updateProduct.item_number)
        // .neq("id", product.id);

        .from("item_product")
        .select("tyc_no") 
        .eq("tyc_no", tycNumber) 
        .neq("id",product.id)

      if (fetchError) {
        toast.error("Error checking item number!");
        throw fetchError;
      }

      // Check for duplicates
      if (existingItem && existingItem.length > 0) {
        const error = new Error(
          `TYC Number ${tycNumber} already exists!`
        );
        throw error;
      }

      // If there are selected files, upload them
      if (itemFile && itemFile.length > 0) {
        const paths = await uploadFiles(itemFile); // Upload the selected files

        if (!paths) return; // If the upload failed, stop the process

        const imagePaths = paths.map((path) => ({
          item_id: product.id, // Use the current product's ID
          path,
        }));

        const { error: imageError } = await supabase
          .from("item_image")
          .insert(imagePaths);

        if (imageError) {
          toast.error("Error inserting image data!");
          console.error("Image Insert Error:", imageError);
          throw imageError;
        }
      }

      // Proceed with the update if no duplicates found
      const { data, error } = await supabase
        .from("item_product")
        .update({
          // item_number: updateProduct.item_number,
          // item_description: updateProduct.item_description,
          // brand: updateProduct.brand,
          // model: updateProduct.model,

          oem_no: oemNumber, // ใช้ค่า oemNumber จาก state
        tyc_no: tycNumber, // ใช้ค่า tycNumber จาก state
        vehicle_brand: vehicleBrandShort, // ใช้ค่า vehicleBrandShort จาก state
        vehicle_brand_full: vehicleBrandFull, // ใช้ค่า vehicleBrandFull จาก state
        vehicle_model: vehicleModelShort, // ใช้ค่า vehicleModelShort จาก state
        vehicle_model_full: vehicleModelFull, // ใช้ค่า vehicleModelFull จาก state
        vehicle_year: vehicleYear, // ใช้ค่า vehicleYear จาก state
        left_right: side, // ใช้ค่า side จาก state
        product_brand: productBrand, // ใช้ค่า productBrand จาก state
        product_type: productType, // ใช้ค่า productType จาก state
        full_specifications: fullspec, // ใช้ค่า fullspec จาก state
        
        })
        .eq("id", product.id) // Use product ID to update
        .select("id")
        .single();

      if (error) throw error;

      return data;
    },
    onSuccess: async () => {
      toast.success("Product updated successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["item_product"],
      });

      setIsOpen(false); // Close the modal on success
      resetState(); // Reset state after closing the modal
    },
    onError: async (error) => {
      toast.error(error.message);
    },
  });

  // Upload file using standard upload
  async function uploadFiles(files: File[]) {
    const filePaths: string[] = []; // เก็บ paths ของไฟล์ทั้งหมด

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`; // ตั้งชื่อไฟล์ที่ไม่ซ้ำ
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("product_image")
        .upload(filePath, file, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        toast.error("Upload failed!");
        console.error("Upload error:", error);
        return null;
      }

      const publicURL = supabase.storage
        .from("product_image")
        .getPublicUrl(filePath).data.publicUrl;

      if (!publicURL) {
        toast.error("Failed to get public URL!");
        console.error("URL error:", publicURL);
        return null;
      }

      filePaths.push(publicURL); // เก็บ public URL ของแต่ละไฟล์

      toast.success("Upload successful!");
      console.log("File uploaded:", data);
    }

    return filePaths; // คืนค่า array ของ paths
  }

 
  const handleImageDelete = () => {
    if (selectedImages.length > 0) {
      Promise.all(
        selectedImages.map(async (xx) => {
          await supabase.from("item_image").delete().eq("id", xx);
        })
      );
    }
  };


  const handleImageSelect = (imgPath: string) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imgPath)) {
        return prevSelected.filter((path) => path !== imgPath); // Unselect image
      } else {
        return [...prevSelected, imgPath]; // Select image
      }
    });
  };


  const handleSubmit = async () => {
    if (
      !oemNumber ||
      !tycNumber ||
      !vehicleBrandShort ||
      !vehicleBrandFull ||
      !vehicleModelShort ||
      !vehicleModelFull ||
      !vehicleYear ||
      !side ||
      !productBrand ||
      !productType ||
      !fullspec
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }
  
    await handleImageDelete(); // Delete selected images
  
    mutate({
      oem_number: oemNumber,
      tyc_number: tycNumber,
      vehicle_brand_short: vehicleBrandShort,
      vehicle_brand_full: vehicleBrandFull,
      vehicle_model_short: vehicleModelShort,
      vehicle_model_full: vehicleModelFull,
      vehicle_year: vehicleYear,
      side: side,
      product_brand: productBrand,
      product_type: productType,
      fullspec: fullspec,
    });
  };

  // const handleSubmit = async () => {
  //   if (!itemNumber || !itemDescription || !brand || !model) {
  //     toast.error("Please fill in all the required fields.");
  //     return;
  //   }

  //   await handleImageDelete(); // Delete selected images

  //   mutate({
  //     item_number: itemNumber,
  //     item_description: itemDescription,
  //     brand: brand,
  //     model: model,
  //   });
  // };

  // const resetState = () => {
  //   setItemNumber(product.item_number || "");
  //   setItemDescription(product.item_description || "");
  //   setBrand(product.brand || "");
  //   setModel(product.model || "");
  //   setItemFile([]);
  //   setSelectedImages([]);
  // };

  // const resetState = () => {
  //   setOemNumber(""); 
  //   setTycNumber(""); 
  //   setVehicleBrandShort(""); 
  //   setVehicleBrandFull(""); 
  //   setVehicleModelShort(""); 
  //   setVehicleModelFull(""); 
  //   setVehicleYear(""); 
  //   setSide(""); 
  //   setProductBrand("");  
  //   setProductType("");  
  //   setFullspec(""); 
  //   setSelectedImages([]);  
  // };

  const resetState = () => {
    setOemNumber(product.oem_no); 
    setTycNumber(product.tyc_no); 
    setVehicleBrandShort(product.vehicle_brand); 
    setVehicleBrandFull(product.vehicle_brand_full); 
    setVehicleModelShort(product.vehicle_model); 
    setVehicleModelFull(product.vehicle_model_full); 
    setVehicleYear(product.vehicle_year); 
    setSide(product.left_right); 
    setProductBrand(product.product_brand);  
    setProductType(product.product_type);  
    setFullspec(product.full_specifications); 
    setSelectedImages([]); 
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
         resetState(); // Reset state when the modal is closed
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-yellow-500 hover:bg-yellow-400"
          onClick={() => setIsOpen(true)} // Open dialog
        >
          <EditFilled style={{ fontSize: "20px", fontWeight: "bold" }} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Edit Product
          </DialogTitle>
          <DialogDescription>
            Edit Products to Product Page here. Click Edit Product when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oemNumber" className="text-left">
              OEM No.
            </Label>
            <Input
              id="oemNumber"
              value={oemNumber}
              onChange={(e) => setOemNumber(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tycNumber" className="text-left">
              TYC No.
            </Label>
            <Input
              id="tycNumber"
              value={tycNumber}
              onChange={(e) => setTycNumber(e.target.value)}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleBrandShort" className="text-left">
              Vehicle Brand Short
            </Label>
            <Input
              id="vehicleBrandShort"
              value={vehicleBrandShort}
              onChange={(e) => setVehicleBrandShort(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleBrandFull" className="text-left">
              Vehicle Brand Full
            </Label>
            <Input
              id="vehicleBrandFull"
              value={vehicleBrandFull}
              onChange={(e) => setVehicleBrandFull(e.target.value)}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleModelShort" className="text-left">
              Vehicle Model Short
            </Label>
            <Input
              id="vehicleModelShort"
              value={vehicleModelShort}
              onChange={(e) => setVehicleModelShort(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleModelFull" className="text-left">
              Vehicle Model Full
            </Label>
            <Input
              id="vehicleModelFull"
              value={vehicleModelFull}
              onChange={(e) => setVehicleModelFull(e.target.value)}
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleYear" className="text-left">
              Vehicle Year
            </Label>
            <Input
              id="vehicleYear"
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="side" className="text-left">
              Side
            </Label>
            <Input
              id="side"
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="col-span-3"
            />
          </div>
          


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productBrand" className="text-left">
              Product Brand
            </Label>
            <Input
              id="productBrand"
              value={productBrand}
              onChange={(e) => setProductBrand(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productType" className="text-left">
              Product Type
            </Label>
            <Input
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="col-span-3"
            />
          </div>
          

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullspec" className="">
              Full Specifications
            </Label>
            <Input
              id="fullspec"
              value={fullspec}
              onChange={(e) => setFullspec(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* Display Item Images */}
          {/* {product.item_image && product.item_image.length > 0 && ( */}
          <div className="py-4">
            <h3 className="font-bold text-lg mb-5">Product Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {product.item_image.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-[100px] h-[100px] border rounded ${
                    selectedImages.includes(img.id) ? "border-red-500" : ""
                  }`}
                >
                  <Image
                    src={img.path}
                    alt={`Product Image ${index + 1}`}
                    width={100}
                    height={100}
                  />
                  <div
                    className={`absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white ${
                      selectedImages.includes(img.id)
                        ? "bg-red-500/50"
                        : "bg-black/50"
                    }`}
                  >
                    <Button
                      onClick={() => handleImageSelect(img.id)}
                      className="text-2xl"
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="w-[100px] h-[100px] border flex flex-col items-center justify-center hover:bg-black/20">
                <label htmlFor="uploadimage" className="cursor-pointer">
                  <Input
                    id="uploadimage"
                    className="hidden" // Hide the input element but keep it functional
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setItemFile(Array.from(e.target.files || []))
                    }
                  />
                  <PlusOutlined /> Upload
                </label>

                {/* Display number of selected images */}
                {itemFile.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {itemFile.length} {itemFile.length > 1 ? "images" : "image"}{" "}
                    selected
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Editing Product..." : "Edit Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
