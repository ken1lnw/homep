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
import { PlusSquareFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/hook/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { addNewsProduct } from "@/app/(Admin)/Admin/dashboard/ManageNewsProducts/newsproductsdatafetch";

export function AddNewsProductModal() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false); // Control dialog visibility
  const [date, setDate] = useState<Date>();

  // State for form fields
  const [newsProductTitle, setNewsProductTitle] = useState("");
  const [itemFile, setItemFile] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newNews: {
      newp_title: string;
      created_at: string;
      file?: File[];
    }) => {
      await addNewsProduct(newNews);
    },
    onSuccess: async () => {
      toast.success("New Product added successfully!");
      await queryClient.invalidateQueries({ queryKey: ["news_product"] });
      setIsOpen(false);
      resetState();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add new product.");
    },
  });

  const resetState = () => {
    setNewsProductTitle(""); // Reset the item number
    setDate(undefined); // Reset the item description
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
          <PlusSquareFilled /> Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            Add News Product
          </DialogTitle>
          <DialogDescription>
            Add New Product to New Product Page here. Click Add New Product when
            you're done.
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
            <Label htmlFor="newstitle" className="">
              New Product Title
            </Label>
            <Input
              id="newstitle"
              placeholder="News Title"
              value={newsProductTitle}
              onChange={(e) => setNewsProductTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="uploadimage" className="">
              Date
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uploadimage" className="">
              Attach PDF File
            </Label>
            <Input
              id="uploadimage"
              className="col-span-3"
              type="file"
              // multiple
              accept="application/pdf"
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
              if (!newsProductTitle || !date) {
                toast.error("Please fill in all the required fields.");
                return; // ไม่ทำการเรียก mutate ถ้าข้อมูลไม่ครบ
              }

              if (itemFile && itemFile.length > 0) {
                mutate({
                  newp_title: newsProductTitle,
                  created_at: format(date, 'y-LL-dd').toString(),
                  file: itemFile, // ส่งไฟล์ที่เลือก
                });
              } else {
                toast.error("Please select file.");
                return;
              }
            }}
            disabled={isPending} // Disable button when mutation is in progress
          >
            {isPending ? "Adding New Product..." : "Add New Product"} {/* Loading text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
