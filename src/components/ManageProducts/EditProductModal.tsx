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
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ProductionType } from "../Production/ProductionType";
import Image from "next/image";
import { updateProduct } from "@/app/(Admin)/Admin/dashboard/ManageProducts/productdatafetchadmin";

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
    mutationFn: async () => {
      await updateProduct(
        product.id,
        {
          oemNumber,
          tycNumber,
          vehicleBrandShort,
          vehicleBrandFull,
          vehicleModelShort,
          vehicleModelFull,
          vehicleYear,
          side,
          productBrand,
          productType,
          fullspec,
          itemFile,
        },
        selectedImages.map(Number) // Convert selectedImages to numbers
      );
    },
    onSuccess: async () => {
      toast.success("Product updated successfully!");
      setIsOpen(false); // Close the modal
      resetState(); // Reset state
      await queryClient.invalidateQueries({ queryKey: ["item_product"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update product.");
      console.error("Update error:", error);
    },
  });


  const handleImageSelect = (imgPath: string) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imgPath)) {
        return prevSelected.filter((path) => path !== imgPath); // Unselect image
      } else {
        return [...prevSelected, imgPath]; // Select image
      }
    });
  };


 
const handleSubmit = () => {
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

    mutate(); // Trigger the mutation
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
      <DialogContent >
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Edit Product
          </DialogTitle>
          <DialogDescription>
            Edit Products to Product Page here. Click Edit Product when you&apos;re
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
                  className={`relative w-[100px] h-[100px] border rounded  flex items-center justify-center ${
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
