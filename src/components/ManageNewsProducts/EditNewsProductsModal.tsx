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
import {  EditFilled,  } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { NewsProductsType } from "./NewsProductsType";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  EditNewsProduct,
  uploadNewsFile,
} from "@/app/(Admin)/Admin/dashboard/ManageNewsProducts/newsproductsdatafetch";

interface EditNewsModalProps {
  news: NewsProductsType;
}

export function EditNewsProductModal({ news }: EditNewsModalProps) {
  const queryClient = useQueryClient();

  // State for controlling modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const [newsProductTitle, setNewsProductTitle] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [opath, setOpath] = useState<string>("");

  const [itemFile, setItemFile] = useState<File[]>([]); // State for selected file
  const [selectedPdf, setSelectedPdf] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (updateNews: any) => {
      if(!date)
        throw new Error('date req')
      const updatedData: any = {
        id: news.id,
        newp_title: newsProductTitle,
        created_at: format(date, 'y-LL-dd'),
      };
      

      if (itemFile.length > 0) {
        const file = itemFile[0];
        const filePath = await uploadNewsFile(file); // เรียกใช้งานฟังก์ชันใน server

        updatedData.path = filePath;
      } else {
        updatedData.path = opath;
      }
      const editing = await EditNewsProduct(updatedData);

      return editing;
    },
    onSuccess: async () => {
      toast.success("News updated successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["news_product"],
      });

      setIsOpen(false); 
      resetState(); 
    },
    onError: async (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (news) {
      setNewsProductTitle(news.newp_title); 
      setDate(new Date(news.created_at)); 
      setOpath(news.path);
    }
  }, [news]);

  const resetState = () => {
    setNewsProductTitle(news.newp_title);
    setDate(new Date(news.created_at));
    setOpath(news.path);
    setItemFile([]); 
    setSelectedPdf(""); 
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetState(); 
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
            Edit New Product
          </DialogTitle>
          <DialogDescription>
            Edit New Product to New Product Page here. Click Edit New Product when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newstitle" className="text-right col-span-4">
              New Product Title
            </Label>
            <Input
              id="newstitle"
              placeholder="News Title"
              value={newsProductTitle}
              onChange={(e) => setNewsProductTitle(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-1 items-center gap-4">
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
                  onSelect={setDate} // ทำการเลือกวันที่ใหม่
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newstitle" className="text-right col-span-4">
              Attach PDF File
            </Label>
            <div
              className={`w-full border rounded-md h-10 flex items-center justify-between px-3 col-span-4 lg:col-span-1 ${
                selectedPdf === opath ? "bg-red-50" : ""
              }`}
            >
              <a
                href={`${opath}`} // เปลี่ยนลิงก์ให้เป็นลิงก์จริงของไฟล์ PDF
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View
              </a>
              <Button
                variant="ghost"
                className="text-black hover:text-red-600"
                onClick={() => {
                  // ถ้า selectedPdf เท่ากับ opath แล้ว (คลิกครั้งที่สอง)
                  if (selectedPdf === opath) {
                    setSelectedPdf(""); // ลบการเลือก PDF
                  } else {
                    setSelectedPdf(opath); // ตั้งค่าเป็นการเลือก PDF ใหม่
                  }
                }}
              >
                x
              </Button>
            </div>
          </div>

          {selectedPdf && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uploadimage" className="col-span-4">
                Upload New PDF File
              </Label>
              <Input
                id="uploadimage"
                className="col-span-4 lg:col-span-1"
                type="file"
                accept="application/pdf"
                onChange={(e) => setItemFile(Array.from(e.target.files || []))}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={mutate}
            disabled={isPending}
          >
            {isPending ? "Editing News..." : "Edit New Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
