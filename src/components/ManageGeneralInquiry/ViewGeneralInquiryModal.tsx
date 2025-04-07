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
import {
  DeleteOutlined,
  EditFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GeneralInquiryType } from "@/types/general-inquiry";
import { Textarea } from "../ui/textarea";

interface ViewGIModalProps {
  gi: GeneralInquiryType;
}

export function ViewGeneralInquiryModal({ gi }: ViewGIModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const [gId, setGId] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (gi) {
      setGId(gi.id);
      setCreatedAt(gi.created_at);
      setName(gi.name);
      setEmail(gi.email);
      setPhone(gi.phone);
      setSubject(gi.subject);
      setMessage(gi.message);
    }
  }, [gi]);

  // ฟังก์ชันไว้รีเซต State กลับเป็นค่าตั้งต้น
  const resetState = () => {
    setGId(gi.id);
    setCreatedAt(gi.created_at);
    setName(gi.name);
    setEmail(gi.email);
    setPhone(gi.phone);
    setSubject(gi.subject);
    setMessage(gi.message);
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
          className="bg-green-500 hover:bg-green-400"
          onClick={() => setIsOpen(true)} // Open dialog
        >
          {/* <EditFilled style={{ fontSize: "20px", fontWeight: "bold" }} /> */}
          <InfoCircleFilled style={{ fontSize: "20px", fontWeight: "bold" }} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-bold">
            General Inquiry
          </DialogTitle>
          <DialogDescription>Detail from General Inquiry.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right col-span-4">
              Date
            </Label>
            <Input
              id="date"
              placeholder="Date"
              readOnly
              value={
                createdAt ? new Date(createdAt).toLocaleDateString("th-TH") : ""
              }
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-4">
              Name
            </Label>
            <Input
              id="name"
              placeholder="name"
              readOnly
              value={name}
              className="col-span-4"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right col-span-4">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              readOnly
              value={email}
              className="col-span-4"
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right col-span-4">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="Phone"
              readOnly
              value={phone}
              className="col-span-4"
            />
          </div>

          {/* Subject */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right col-span-4">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Subject"
              readOnly
              value={subject}
              className="col-span-4"
            />
          </div>

          {/* Message */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right col-span-4">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Message"
              readOnly
              value={message}
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setIsOpen(false)} // ใช้ฟังก์ชัน anonymous
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
