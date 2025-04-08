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
import { Textarea } from "@/components/ui/textarea";
import { DeleteOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NewsType } from "./NewsType";

interface EditNewsModalProps {
  news: NewsType;
}

export function EditNewsModal({ news }: EditNewsModalProps) {
  const queryClient = useQueryClient();

  // State for controlling modal visibility
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  const [newsTilte, setNewsTitle] = useState(news.news_title || "");
  const [newsDescription, setNewsDescription] = useState(news.news_title || "");

  const [itemFile, setItemFile] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Update state if product prop changes
  useEffect(() => {
    setNewsTitle(news.news_title);
    setNewsDescription(news.news_description);
  }, [news]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (updateNews: any) => {
      // Validate fields before updating
      if (!updateNews.news_title || !updateNews.news_description) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      const { data: existingItem, error: fetchError } = await supabase
        .from("news_article")
        .select("news_title")
        .eq("news_title", updateNews.news_title)
        .neq("id", news.id);

      if (fetchError) {
        toast.error("Error checking item number!");
        throw fetchError;
      }

      // Check for duplicates
      if (existingItem && existingItem.length > 0) {
        const error = new Error(
          `News title ${updateNews.news_title} already exists!`
        );
        throw error;
      }

      // If there are selected files, upload them
      if (itemFile && itemFile.length > 0) {
        const paths = await uploadFiles(itemFile); // Upload the selected files

        if (!paths) return; // If the upload failed, stop the process

        const imagePaths = paths.map((path) => ({
          news_id: news.id, // Use the current product's ID
          path,
        }));

        const { error: imageError } = await supabase
          .from("news_image")
          .insert(imagePaths);

        if (imageError) {
          toast.error("Error inserting image data!");
          console.error("Image Insert Error:", imageError);
          throw imageError;
        }
      }

      // Proceed with the update if no duplicates found
      const { data, error } = await supabase
        .from("news_article")
        .update({
          news_title: updateNews.news_title,
          news_description: updateNews.news_description,
        })
        .eq("id", news.id) // Use product ID to update
        .select("id")
        .single();

      if (error) throw error;

      return data;
    },
    onSuccess: async () => {
      toast.success("News updated successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["news_article"],
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
      // console.log("File uploaded:", data);
    }

    return filePaths; // คืนค่า array ของ paths
  }

  const handleImageSelect = (imgPath: string) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imgPath)) {
        return prevSelected.filter((path) => path !== imgPath); // Unselect image
      } else {
        return [...prevSelected, imgPath]; // Select image
      }
    });
  };

  const handleImageDelete = () => {
    if (selectedImages.length > 0) {
      Promise.all(
        selectedImages.map(async (xx) => {
          await supabase.from("news_image").delete().eq("id", xx);
        })
      );
    }
  };

  const handleSubmit = async () => {
    if (!newsTilte || !newsDescription) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    await handleImageDelete(); // Delete selected images

    mutate({
      news_title: newsTilte,
      news_description: newsDescription,
    });
  };

  const resetState = () => {
    setNewsTitle(news.news_title || "");
    setNewsDescription(news.news_description || "");
    setItemFile([]);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Edit Article
          </DialogTitle>
          <DialogDescription>
            Edit Article to Article Page here. Click Edit Article when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newstitle" className="text-right col-span-4">
            Article Title
            </Label>
            <Input
              id="newstitle"
              placeholder="Article Title"
              value={newsTilte}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newsdes" className="col-span-4">
              Item Description
            </Label>
            <Textarea
              id="newsdes"
              placeholder="Type your Article description here."
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
              // rows={2}
              // className="col-span-4 resize-none overflow-auto max-h-[150px] min-h-[150px]"
              className="col-span-4 "

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
          </div> */}

          {/* Display Item Images */}
          {/* {product.item_image && product.item_image.length > 0 && ( */}
          <div className="py-4">
            <h3 className="font-bold text-lg mb-5">Article Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {news.news_image.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-[100px] h-[100px] border rounded  flex items-center justify-center ${
                    selectedImages.includes(img.id) ? "border-red-500" : ""
                  }`}
                >
                  <Image
                    src={img.path}
                    alt={`News Image ${index + 1}`}
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
            {isPending ? "Editing Article..." : "Edit Article"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
