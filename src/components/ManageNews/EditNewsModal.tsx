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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { EditNews } from "@/app/(Admin)/Admin/dashboard/ManageNews/articlefetch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditNewsModalProps {
  news: NewsType;
}

export function EditNewsModal({ news }: EditNewsModalProps) {
  const queryClient = useQueryClient();

  // State for controlling modal visibility
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility

  const [newsTilte, setNewsTitle] = useState(news.news_title || "");
  const [newsDescription, setNewsDescription] = useState(news.news_title || "");
  const [newsTilteTh, setNewsTitleTh] = useState(news.news_title_th || "");
  const [newsDescriptionTh, setNewsDescriptionTh] = useState(news.news_title_th || "");
  const [date, setDate] = useState<Date>();

  const [itemFile, setItemFile] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Update state if product prop changes
  useEffect(() => {
    setNewsTitle(news.news_title);
    setNewsDescription(news.news_description);
    setNewsTitleTh(news.news_title_th);
    setNewsDescriptionTh(news.news_description_th);
    setDate(new Date(news.created_at));
  }, [news]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (updateNews: any) => {
      // Validate fields before updating
      if (
        !updateNews.news_title ||
        !updateNews.news_description ||
        !updateNews.created_at
      ) {
        toast.error("Please fill in all the required fields.");
        throw new Error("Missing required fields");
      }

      await EditNews({
        newsId: news.id,
        newsTitle: updateNews.news_title,
        newsDescription: updateNews.news_description,
        newsTitleTh: updateNews.news_title_th,
        newsDescriptionTh: updateNews.news_description_th,
        createdAt: format(updateNews.created_at, "y-LL-dd"),
        files: itemFile,
        selectedImages: selectedImages,
      });

      setIsOpen(false);
      resetState();
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
    if (!newsTilte || !newsDescription) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    mutate({
      news_title: newsTilte,
      news_description: newsDescription,
      news_title_th: newsTilteTh,
      news_description_th: newsDescriptionTh,
      created_at: format(date ?? new Date(), "y-LL-dd"),
    });
  };

  const resetState = () => {
    setNewsTitle(news.news_title || "");
    setNewsDescription(news.news_description || "");
    setNewsTitleTh(news.news_title || "");
    setNewsDescriptionTh(news.news_description || "");
    setDate(new Date(news.created_at));
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
            Edit Article to Article Page here. Click Edit Article when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Tabs defaultValue="en" className="gap-4">
            <TabsList className="grid w-full grid-cols-2 bg-blue-500">
              <TabsTrigger value="en">
                English <div className="text-red-500">*</div>
              </TabsTrigger>
              <TabsTrigger value="th">Thai</TabsTrigger>
            </TabsList>

            <TabsContent value="en">
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
            </TabsContent>

            <TabsContent value="th">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newstitle" className="text-right col-span-4">
                  Article Thai Title
                </Label>
                <Input
                  id="newstitle"
                  placeholder="Article Title"
                  value={newsTilteTh}
                  onChange={(e) => setNewsTitleTh(e.target.value)}
                  className="col-span-4"
                />
              </div>
            </TabsContent>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newstitle" className="text-right col-span-4">
                Article Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] md:w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate} // ทำการเลือกวันที่ใหม่
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <TabsContent value="en">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newsdes" className="col-span-4">
                  Article Description
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
            </TabsContent>

            <TabsContent value="th">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newsdes" className="col-span-4">
                  Article Thai Description
                </Label>
                <Textarea
                  id="newsdes"
                  placeholder="Type your Article description here."
                  value={newsDescriptionTh}
                  onChange={(e) => setNewsDescriptionTh(e.target.value)}
                  // rows={2}
                  // className="col-span-4 resize-none overflow-auto max-h-[150px] min-h-[150px]"
                  className="col-span-4 "
                />
              </div>
            </TabsContent>
          </Tabs>
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
