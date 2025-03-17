"use client";
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
import { Textarea } from "@/components/ui/textarea"
import { PlusSquareFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { NewsType } from "./NewsType";

export function AddNewsModal() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  // State for form fields
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [itemFile, setItemFile] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newNews: any) => {
      // ตรวจสอบข้อมูลให้ครบถ้วนก่อนการเพิ่ม
      if (
        !newNews.news_title ||
        !newNews.news_description 
  
      ) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      // ตรวจสอบว่า news_title นี้มีอยู่ในฐานข้อมูลหรือไม่
      const { data: existingItem, error: fetchError } = await supabase
        .from("news_article")
        .select("news_title")
        .eq("news_title", newNews.news_title);

      if (fetchError) {
        toast.error("Error checking news title!");
        throw fetchError;
      }

      // หากพบ news_title ที่ซ้ำกัน ให้เรียก onError
      if (existingItem && existingItem.length > 0) {
        const error = new Error(
          `News Title ${newNews.news_title} already exists!`
        );
        throw error; // เกิดข้อผิดพลาดและโยนไปที่ onError
      }

      // ถ้าไม่มีการซ้ำ ให้ดำเนินการแทรกข้อมูลใหม่
      const { data, error } = await supabase
        .from("news_article")
        .insert({
          news_title: newNews.news_title,
          news_description: newNews.news_description
        })
        .select("id")
        .single();

      if (error) throw error;

      console.log("data", data);

      // ถ้ามีไฟล์ให้ทำการอัพโหลด
      if (newNews.file && newNews.file.length > 0) {
        const paths = await uploadFiles(newNews.file);

        if (!paths) return; // หากการอัพโหลดล้มเหลว ให้หยุดการทำงาน

        const imagePaths = paths.map((path) => ({
          news_id: data.id,
          path,
        }));

        const { error: ImageError } = await supabase
          .from("news_image")
          .insert(imagePaths);

        if (ImageError) throw ImageError;
      }

      return data;
    },
    onSuccess: async () => {
      toast.success("News added successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["news_article"],
      });
      setIsOpen(false);
      resetState();
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
        .from("news_image")
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
        .from("news_image")
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

  const resetState = () => {
    setNewsTitle(""); // Reset the item number
    setNewsDescription(""); // Reset the item description
    setItemFile([]); // Reset the file input (clear selected files)
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
        <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <PlusSquareFilled /> Add News
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Add News
          </DialogTitle>
          <DialogDescription>
            Add News to News Page here. Click Add News when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="itemno" className="text-right">
              Item No.
            </Label>
            <Input
              id="itemno"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
              className="col-span-3"
            />
          </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newstitle" className="col-span-4">
              News Title
            </Label>
            <Input
              id="newstitle"
              placeholder="News Title"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="col-span-4"
            />
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Brand
            </Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="col-span-3"
            />
          </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newsdes" className="text-left col-span-4">
              News Description
            </Label>
            {/* <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
            /> */}

            <Textarea 
            id='newsdes'
            placeholder="Type your news description here." 
            className="col-span-4 resize-none overflow-auto max-h-[150px] min-h-[150px]"
            onChange={(e) => setNewsDescription(e.target.value)}
            rows={2}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uploadimage" className="text-right">
              Attach Images
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
              if (!newsTitle || !newsDescription ) {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({
                  news_title: newsTitle,
                  news_description: newsDescription,
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                mutate({
                  news_title: newsTitle,
                  news_description: newsDescription,
                });
              }
            }}
            disabled={isPending} // Disable button when mutation is in progress
          >
            {isPending ? "Adding News..." : "Add News"}{" "}
            {/* Loading text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
