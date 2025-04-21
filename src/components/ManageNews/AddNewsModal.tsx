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
import { Textarea } from "@/components/ui/textarea";
import { PlusSquareFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { addNews } from "@/app/(Admin)/Admin/dashboard/ManageNews/articlefetch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AddNewsModal() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  // State for form fields
  const [newsTitleTh, setNewsTitleTh] = useState("");
  const [newsDescriptionTh, setNewsDescriptionTh] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [itemFile, setItemFile] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newNews: {
      news_title: string;
      news_description: string;
      news_title_th: string;
      news_description_th: string;
      file?: File[];
    }) => {
      await addNews(newNews);
    },
    onSuccess: async () => {
      toast.success("News added successfully!");
      await queryClient.invalidateQueries({ queryKey: ["news_article"] });
      setIsOpen(false);
      resetState();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add news.");
    },
  });

  const resetState = () => {
    setNewsTitle(""); // Reset the item number
    setNewsDescription(""); // Reset the item description
    setNewsTitleTh(""); // Reset the item number
    setNewsDescriptionTh(""); // Reset the item description
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
          <PlusSquareFilled /> Add Article
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Add Article
          </DialogTitle>
          <DialogDescription>
            Add Article to Article Page here. Click Add Article when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="en">
          <TabsList className="grid w-full grid-cols-2 bg-blue-500">
            <TabsTrigger value="en">English <div className="text-red-500">*</div></TabsTrigger>
            <TabsTrigger value="th">Thai</TabsTrigger>
          </TabsList>


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
           <TabsContent value="en">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newstitle" className="col-span-4">
                Article Title
              </Label>
              <Input
                id="newstitle"
                placeholder="Article Title"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="col-span-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mt-5">
              <Label htmlFor="newsdes" className="text-left col-span-4">
                Article Description
              </Label>

              <Textarea
                id="newsdes"
                placeholder="Type your Article description here."
                className="col-span-4 resize-none overflow-auto max-h-[150px] min-h-[150px]"
                value={newsDescription}
                onChange={(e) => setNewsDescription(e.target.value)}
                rows={2}
              />
            </div>
            </TabsContent>



            <TabsContent value="th">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newstitle" className="col-span-4">
                Article Thai Title 
              </Label>
              <Input
                id="newstitle"
                placeholder="Article Thai Title"
                value={newsTitleTh}
                onChange={(e) => setNewsTitleTh(e.target.value)}
                className="col-span-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mt-5">
              <Label htmlFor="newsdes" className="text-left col-span-4">
                Article Thai Description
              </Label>

              <Textarea
                id="newsdes"
                placeholder="Type your Article Thai description here."
                className="col-span-4 resize-none overflow-auto max-h-[150px] min-h-[150px]"
                value={newsDescriptionTh}
                onChange={(e) => setNewsDescriptionTh(e.target.value)}
                rows={2}
              />
            </div>
            </TabsContent>
















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
        </Tabs>






        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={async () => {
              // ตรวจสอบว่า item_number, item_description, brand, model ถูกกรอกหรือไม่
              if (!newsTitle || !newsDescription) {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({
                  news_title: newsTitle,
                  news_description: newsDescription,
                  news_title_th: newsTitleTh,
                  news_description_th: newsDescriptionTh,
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                mutate({
                  news_title: newsTitle,
                  news_description: newsDescription,
                  news_title_th: newsTitleTh,
                  news_description_th: newsDescriptionTh,
                });
              }
            }}
            disabled={isPending} // Disable button when mutation is in progress
          >
            {isPending ? "Adding Article..." : "Add Article"}{" "}
            {/* Loading text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
