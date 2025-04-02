'use client'
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
import { PlusSquareFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { AddProduct } from "@/app/(Admin)/Admin/ManageProducts/productdatafetchadmin";

export function AddProductModal() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  // State for form fields
  const [itemNumber, setItemNumber] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [itemFile, setItemFile] = useState<File[]>([]);

  const [oemNumber, setOemNumber] = useState("");
  const [tycNumber, setTycNumber] = useState("");
  const [vehicleBrandShort, setVehicleBrandShort] = useState("");
  const [vehicleBrandFull, setVehicleBrandFull] = useState("");
  const [vehicleModelShort, setVehicleModelShort] = useState("");
  const [vehicleModelFull, setVehicleModelFull] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [side, setSide] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [fullspec, setFullspec] = useState("");

  const resetState = () => {
    setOemNumber(""); 
    setTycNumber(""); 
    setVehicleBrandShort(""); 
    setVehicleBrandFull(""); 
    setVehicleModelShort(""); 
    setVehicleModelFull(""); 
    setVehicleYear(""); 
    setSide(""); 
    setProductBrand("");  
    setProductType("");  
    setFullspec(""); 
    setItemFile([]);  
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (newProduct: any) => {
      try {
        if  (!oemNumber || !tycNumber || !vehicleBrandShort || !vehicleBrandFull
  || !vehicleModelShort || !vehicleModelFull || !vehicleYear || !side
  || !productBrand || !productType || !fullspec) {
          throw new Error("Please fill in all the required fields.");
        }

        const { data } = await AddProduct({
          oemNumber: newProduct.oem_no,  // Change from oem_no to oemNumber
          tycNumber: newProduct.tyc_no,  // Change from tyc_no to tycNumber
          vehicleBrandShort: newProduct.vehicle_brand,  // Change from vehicle_brand to vehicleBrandShort
          vehicleBrandFull: newProduct.vehicle_brand_full,  // Change from vehicle_brand_full to vehicleBrandFull
          vehicleModelShort: newProduct.vehicle_model,  // Change from vehicle_model to vehicleModelShort
          vehicleModelFull: newProduct.vehicle_model_full,  // Change from vehicle_model_full to vehicleModelFull
          vehicleYear: newProduct.vehicle_year,  // Change from vehicle_year to vehicleYear
          side: newProduct.left_right,  // Change from left_right to side
          productBrand: newProduct.product_brand,  // Change from product_brand to productBrand
          productType: newProduct.product_type,  // Change from product_type to productType
          fullspec: newProduct.full_specifications,  // Change from full_specifications to fullspec
          itemFile: newProduct.file,  // Keep the itemFile as is
        });

        
        await queryClient.invalidateQueries({
          queryKey: ["item_product"],
        });
        setIsOpen(false);
        toast.success("Product added successfully!");
        resetState();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  
  

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
        <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <PlusSquareFilled /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Add Product
          </DialogTitle>
          <DialogDescription>
            Add Products to Product Page here. Click Add Product when you're
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


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uploadimage" className="text-left">
              Upload Images
            </Label>
            <Input
              id="uploadimage"
              className="col-span-3"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setItemFile(Array.from(e.target.files || []))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={async () => {
              // ตรวจสอบว่า item_number, item_description, brand, model ถูกกรอกหรือไม่
              if (!oemNumber || !tycNumber || !vehicleBrandShort || !vehicleBrandFull
                || !vehicleModelShort|| !vehicleModelFull|| !vehicleYear|| !side
              || !productBrand|| !productType|| !fullspec)
                {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({

                  oem_no:oemNumber,
                  tyc_no:tycNumber,
                  vehicle_brand:vehicleBrandShort,  
                  vehicle_brand_full:vehicleBrandFull,
                  vehicle_model:vehicleModelShort,
                  vehicle_model_full:vehicleModelFull,
                  vehicle_year:vehicleYear,
                  left_right:side,
                  product_brand:productBrand,
                  product_type:productType,
                  full_specifications:fullspec,
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                mutate({
                  oem_no:oemNumber,
                  tyc_no:tycNumber,
                  vehicle_brand:vehicleBrandShort,
                  vehicle_brand_full:vehicleBrandFull,
                  vehicle_model:vehicleModelShort,
                  vehicle_model_full:vehicleModelFull,
                  vehicle_year:vehicleYear,
                  left_right:side,
                  product_brand:productBrand,
                  product_type:productType,
                  full_specifications:fullspec,
                });
              }
            }}
            disabled={isPending} // Disable button when mutation is in progress
          >
            {isPending ? "Adding Product..." : "Add Product"} {/* Loading text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
