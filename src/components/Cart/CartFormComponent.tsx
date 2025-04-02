"use client";
import React, { useState } from "react";
import {
  // Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Segmented,
  Select,
  TreeSelect,
} from "antd";
import { Button } from "../ui/button";
import { sendMail } from "@/lib/send-email";
import { toast } from "sonner";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";
import { useRouter } from "next/navigation";

import { useCart } from "@/hook/useCart";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "@/app/(Home)/Cart/cartdata";
import { ProductionType } from "../Production/ProductionType";
import { useBucket } from "@/store/bucket";

export default function CartFormComponent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loading state
  // const { cartItems, qty } = useCart(); // ดึงข้อมูลจาก custom hook useCart
  const router = useRouter();

  // const cartProductIds = cartItems.map((item) => item);
  const cartItems = useBucket();
  const cartLength = Object.keys(cartItems.data).length;
  const itemsInCart = Object.keys(cartItems.data).map(Number);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["item_product", itemsInCart],
    queryFn: async () => {
      if (itemsInCart.length === 0) return [];
      const fetchedData = await fetchCartItems(itemsInCart); // เก็บค่าผลลัพธ์จากฟังก์ชัน fetchCartItems
      return fetchedData; // คืนค่าข้อมูลที่ดึงมา
    },
  });

  console.log(cartItems);

  console.log(cartItems.data);
  console.log(data);

  const handleButtonClick = () => {
    form.submit(); // Manually trigger form submission when the custom button is clicked
  };

  const handleSubmit = async (values: any) => {
    const {
      company,
      name,
      country,
      mobile,
      phone,
      fax,
      address,
      email,
      inquiry,
    } = values;
    if (loading) return; // ถ้ามีการส่งอีเมลอยู่แล้ว ก็ไม่ให้ส่งอีก
    setLoading(true); // ตั้งสถานะเป็นกำลังโหลด
    // สร้างข้อมูลที่ต้องส่ง (รวมข้อมูลตะกร้าและจำนวน)

    if (!data || data.length === 0) {
      toast.error("No products found in your cart. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const productDetails = data
        .map((item: any) => {
          // Find the corresponding item in cartItems.data by matching item.id
          const matchedItem = Object.entries(cartItems.data).find(
            ([key, value]) => Number(key) === item.id
          ); // Check if the key matches the item.id

          // If a match is found, get the quantity (qty) from cartItems.data
          const qty = matchedItem ? matchedItem[1] : 1; // matchedItem[1] will be the qty

          return `Product ID: ${item.id}, OEM No.: ${item.oem_no}, TYC No.: ${item.tyc_no}, Cart Quantity: ${qty}<br/>`;
        })
        .join("\n"); // Join the details into a string

        await sendMail({
          email: email,
          // sendTo: "your-receiver-email@example.com", // You can set the receiver email or use the SITE_MAIL_RECIEVER
          subject: `New Inquiry from ${company || ""}`,
          text: `You have a new inquiry from ${company || ""} (${name || ""}).\n
          Country/Region: ${country || ""}\n
          Mobile: ${mobile || ""}\n
          Phone: ${phone || ""}\n
          Fax: ${fax || ""}\n
          Address: ${address || ""}\n
          Inquiry: ${inquiry || ""}\n
          Product Details: ${productDetails || ""}\n
          `,
          html: `<p>You have a new inquiry from <strong>${company || ""}</strong> (${name || ""}).</p>
          <p><strong>Country/Region:</strong> ${country || ""}</p>
          <p><strong>Mobile:</strong> ${mobile || ""}</p>
          <p><strong>Phone:</strong> ${phone || ""}</p>
          <p><strong>Fax:</strong> ${fax || ""}</p>
          <p><strong>Address:</strong> ${address || ""}</p>
          <p><strong>Inquiry:</strong><br/>${inquiry || ""}</p>
          <p><strong>Product Details:</strong><br/>${productDetails || ""}</p>`,
        });
      // localStorage.removeItem("cart");
      // router.refresh();
      cartItems.clearData();
      form.resetFields();
      router.refresh();
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    {cartLength < 1 ? (<></>):(
      <div className="container mx-auto mb-10 px-2 lg:px-0">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
            <LoadingSpinner />
          </div>
        )}

        <h1 className="text-4xl font-bold mt-12 mb-5">Contact Information</h1>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ fontSize: "18px" }}
        >
          <div className="grid grid-cols-3 gap-6 items-center">
            {/* Company */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Company
            </label>
            <Form.Item
              name="company"
              className="col-span-3 lg:col-span-2"
              rules={[
                { required: true, message: "Please enter your company name" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Name */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Name
            </label>
            <Form.Item
              name="name"
              className="col-span-3 lg:col-span-2"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            {/* Country / Region */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Country / Region
            </label>
            <Form.Item
              name="country"
              className="col-span-3 lg:col-span-2"
              rules={[
                { required: true, message: "Please select your country" },
              ]}
            >
              <Select placeholder="Select Country">
                <Select.Option value="us">United States</Select.Option>
                <Select.Option value="uk">United Kingdom</Select.Option>
                <Select.Option value="th">Thailand</Select.Option>
              </Select>
            </Form.Item>

            {/* Mobile */}
            <label className="col-span-1 text-gray-700 font-medium">
              Mobile
            </label>
            <Form.Item name="mobile" className="col-span-3 lg:col-span-2">
              <Input />
            </Form.Item>

            {/* Phone No. */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Phone No.
            </label>
            <Form.Item
              name="phone"
              className="col-span-3 lg:col-span-2"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Fax */}
            <label className="col-span-1 text-gray-700 font-medium">Fax</label>
            <Form.Item name="fax" className="col-span-3 lg:col-span-2">
              <Input />
            </Form.Item>

            {/* Address */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Address
            </label>
            <Form.Item
              name="address"
              className="col-span-3 lg:col-span-2"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input />
            </Form.Item>

            {/* Email */}
            <label className="col-span-1 text-gray-700 font-medium">
              <span className="text-red-500 mr-1">*</span>Email
            </label>
            <Form.Item
              name="email"
              className="col-span-3 lg:col-span-2"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Inquiry */}
            <label className="col-span-1 text-gray-700 font-medium">
              Inquiry
            </label>
            <Form.Item name="inquiry" className="col-span-3 lg:col-span-2">
              <Input.TextArea rows={4} />
            </Form.Item>

            {/* Submit Button */}
            <div className="col-span-3 flex justify-center">
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}

              <Button
                className="bg-blue-500 hover:bg-pink-500 w-56 h-14 text-2xl"
                onClick={handleButtonClick}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>

)}
    </>
  );
}
