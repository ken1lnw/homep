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

export function AddProductModal() {
  const queryClient = useQueryClient();

  // State for form fields
  const [itemNumber, setItemNumber] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [itemFile, setItemFile] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newProduct: any) => {
      // ตรวจสอบข้อมูลให้ครบถ้วนก่อนการเพิ่ม
      if (
        !newProduct.item_number ||
        !newProduct.item_description ||
        !newProduct.brand ||
        !newProduct.model
      ) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      // ตรวจสอบว่า item_number นี้มีอยู่ในฐานข้อมูลหรือไม่
      const { data: existingItem, error: fetchError } = await supabase
        .from("item_product")
        .select("item_number")
        .eq("item_number", newProduct.item_number);

      if (fetchError) {
        toast.error("Error checking item number!");
        throw fetchError;
      }

      // หากพบ item_number ที่ซ้ำกัน ให้เรียก onError
      if (existingItem && existingItem.length > 0) {
        const error = new Error(
          `Item number ${newProduct.item_number} already exists!`
        );
        throw error; // เกิดข้อผิดพลาดและโยนไปที่ onError
      }

      // ถ้าไม่มีการซ้ำ ให้ดำเนินการแทรกข้อมูลใหม่
      const { data, error } = await supabase
        .from("item_product")
        .insert({
          item_number: newProduct.item_number,
          item_description: newProduct.item_description,
          brand: newProduct.brand,
          model: newProduct.model,
        })
        .select("id")
        .single();

      if (error) throw error;

      console.log("data", data);

      // ถ้ามีไฟล์ให้ทำการอัพโหลด
      if (newProduct.file && newProduct.file.length > 0) {
        const paths = await uploadFiles(newProduct.file);

        if (!paths) return; // หากการอัพโหลดล้มเหลว ให้หยุดการทำงาน

        const imagePaths = paths.map((path) => ({
          item_id: data.id,
          path,
        }));

        const { error: ImageError } = await supabase
          .from("item_image")
          .insert(imagePaths);

        if (ImageError) throw ImageError;
      }

      return data;
    },
    onSuccess: async () => {
      toast.success("Product added successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["item_product"],
      });
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <PlusSquareFilled /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            <Label htmlFor="itemno" className="text-right">
              Item No.
            </Label>
            <Input
              id="itemno"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="itemdescription" className="">
              Item Description
            </Label>
            <Input
              id="itemdescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Brand
            </Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uploadimage" className="text-right">
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
              if (!itemNumber || !itemDescription || !brand || !model) {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({
                  item_number: itemNumber,
                  item_description: itemDescription,
                  brand: brand,
                  model: model,
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                mutate({
                  item_number: itemNumber,
                  item_description: itemDescription,
                  brand: brand,
                  model: model,
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
