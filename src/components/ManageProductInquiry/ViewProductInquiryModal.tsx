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
import { Textarea } from "../ui/textarea";
import { ProductInquiryType } from "@/types/product-inquiry";
interface ViewPIModalProps {
  pi: ProductInquiryType;
}

export function ViewProductInquiryModal({ pi }: ViewPIModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const [pId, setPId] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fax, setFax] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [inquiry, setInquiry] = useState<string>("");
  const [productDetail, setProductDetail] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (pi) {
      setPId(pi.id);
      setCreatedAt(pi.created_at);
      setName(pi.name);
      setCompany(pi.company);
      setEmail(pi.email);
      setMobile(pi.mobile);
      setPhone(pi.phone);
      setFax(pi.fax);
      setAddress(pi.address);
      setInquiry(pi.inquiry);
      setProductDetail(pi.product_detail);
      setCountry(pi.country);
    }
  }, [pi]);

  // ฟังก์ชันไว้รีเซต State กลับเป็นค่าตั้งต้น
  const resetState = () => {
    if (pi) {
      setPId(pi.id);
      setCreatedAt(pi.created_at);
      setName(pi.name);
      setCompany(pi.company);
      setEmail(pi.email);
      setMobile(pi.mobile);
      setPhone(pi.phone);
      setFax(pi.fax);
      setAddress(pi.address);
      setInquiry(pi.inquiry);
      setProductDetail(pi.product_detail);
      setCountry(pi.country);
    }
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
          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right col-span-4">
              Date
            </Label>
            <Input
              id="date"
              placeholder="Date"
              readOnly
              // แปลง createdAt จากรูปแบบ ISO string ให้เป็นวันที่ตาม Locale ที่ต้องการ
              value={
                createdAt ? new Date(createdAt).toLocaleDateString("th-TH") : ""
              }
              className="col-span-4"
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-4">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              readOnly // ถ้าไม่ต้องให้แก้ไขใน Modal ก็ใส่ readOnly
              className="col-span-4"
            />
          </div>

          {/* Company */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right col-span-4">
              Company
            </Label>
            <Input
              id="company"
              placeholder="Company"
              value={company}
              readOnly
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

          {/* Mobile */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mobile" className="text-right col-span-4">
              Mobile
            </Label>
            <Input
              id="mobile"
              placeholder="Mobile"
              readOnly
              value={mobile}
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

          {/* Fax */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fax" className="text-right col-span-4">
              Fax
            </Label>
            <Input
              id="fax"
              placeholder="Fax"
              readOnly
              value={fax}
              className="col-span-4"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right col-span-4">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Address"
              readOnly
              value={address}
              className="col-span-4"
            />
          </div>

          {/* Country */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right col-span-4">
              Country
            </Label>
            <Input
              id="country"
              placeholder="Country"
              readOnly
              value={country}
              className="col-span-4"
            />
          </div>

          {/* Inquiry */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inquiry" className="text-right col-span-4">
              Inquiry
            </Label>
            <Textarea
              id="inquiry"
              placeholder="Inquiry"
              readOnly
              value={inquiry}
              className="col-span-4"
            />
          </div>

          {/* Product Detail */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productDetail" className="text-right col-span-4">
              Product Detail
            </Label>
            <Textarea
              id="productDetail"
              placeholder="Product Detail"
              readOnly
              value={productDetail}
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
