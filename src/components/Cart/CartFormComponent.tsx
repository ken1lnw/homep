"use client";
import React, { useEffect, useState } from "react";
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
import { addProductInquiry, fetchCartItems } from "@/app/(Home)/Cart/cartdata";
import { ProductionType } from "../Production/ProductionType";
import { useBucket } from "@/store/bucket";
import { useTranslations } from "next-intl";

export default function CartFormComponent() {
  const t = useTranslations("Cart");
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

  // console.log(cartItems);

  // console.log(cartItems.data);
  // console.log(data);

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

      const productDetails = data.map((item: any) => {
        // Find the corresponding item in cartItems.data by matching item.id
        const matchedItem = Object.entries(cartItems.data).find(
          ([key, value]) => Number(key) === item.id
        ); // Check if the key matches the item.id

        // If a match is found, get the quantity (qty) from cartItems.data
        const qty = matchedItem ? matchedItem[1] : 1; // matchedItem[1] will be the qty

        return `Product ID: ${item.id} \n OEM No.: ${item.oem_no} \n TYC No.: ${item.tyc_no} \n Full Specifications.: ${item.full_specifications} \n Cart Quantity: ${qty}\n `;
      });
      // .join("\n"); // Join the details into a string

      // สำหรับบันทึกลงฐานข้อมูลหรือจัดเก็บในรูปแบบที่มี \n
      const productDetailsForDB = productDetails.join("\n");

      // สำหรับแสดงผลในอีเมลให้แทน \n ด้วย <br/>
      const productDetailsForEmail = productDetails.join("<br/>");

      await sendMail({
        email: email,
        // sendTo: "your-receiver-email@example.com", // You can set the receiver email or use the SITE_MAIL_RECIEVER
        subject: `Product Inquiry from ${company || ""}`,
        text: `Product inquiry\n
          Company:  ${company || ""}\n
          Name: ${name || ""})\n
          Country/Region: ${country || ""}\n
          Mobile: ${mobile || ""}\n
          Phone: ${phone || ""}\n
          Fax: ${fax || ""}\n
          Address: ${address || ""}\n
          Inquiry: ${inquiry || ""}\n
          Product Details: ${productDetails.join("\n") || ""}\n
          `,
        html: `
          <p><strong>Product Inquiry</strong></p>
          <p><strong>Company:</strong> ${company || ""}</p>
          <p><strong>Nmae:</strong> ${name || ""}</p>
          <p><strong>Country/Region:</strong> ${country || ""}</p>
          <p><strong>Mobile:</strong> ${mobile || ""}</p>
          <p><strong>Phone:</strong> ${phone || ""}</p>
          <p><strong>Fax:</strong> ${fax || ""}</p>
          <p><strong>Address:</strong> ${address || ""}</p>
          <p><strong>Inquiry:</strong><br/>${inquiry || ""}</p>
          <p><strong>Product Details:</strong><br/>${
            productDetailsForEmail || ""
          }<br/></p>`,
      });

      const cartData = [
        {
          name: name,
          company: company,
          email: email,
          mobile: mobile || "",
          phone: phone,
          fax: fax || "",
          address: address,
          inquiry: inquiry || "",
          product_detail: productDetailsForDB,
          country: country,
        },
      ];

      await addProductInquiry(cartData);
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

  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countryList = data
          .map((country: { cca2: any; name: { common: any } }) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a: { name: string }, b: { name: any }) =>
            a.name.localeCompare(b.name)
          );

        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      {cartLength < 1 ? (
        <></>
      ) : (
        <div className="container mx-auto mb-10 px-2 lg:px-0">
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
              <LoadingSpinner />
            </div>
          )}

          <h1 className="text-4xl font-bold mt-12 mb-5">
            {/* Contact Information */}
            {t("contact")}
          </h1>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{ fontSize: "18px" }}
          >
            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Company */}
              <label className="col-span-1 text-gray-700 font-medium">
                <span className="text-red-500 mr-1">*</span>
                {/* Company */}
                {t("company")}
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
                <span className="text-red-500 mr-1">*</span>
                {/* Name */}
                {t("name")}
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
                <span className="text-red-500 mr-1">*</span>
                {/* Country / Region */}
                {t("country")}
              </label>
              <Form.Item
                name="country"
                className="col-span-3 lg:col-span-2"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Select placeholder={t("selectc")} allowClear showSearch>
                  {countries.map((country) => (
                    <Select.Option key={country.code} value={country.name}>
                      {country.name} {/* แสดงชื่อประเทศ */}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Mobile */}
              <label className="col-span-1 text-gray-700 font-medium">
                {/* Mobile */}
                {t("mobile")}
              </label>
              <Form.Item name="mobile" className="col-span-3 lg:col-span-2">
                <Input />
              </Form.Item>

              {/* Phone No. */}
              <label className="col-span-1 text-gray-700 font-medium">
                <span className="text-red-500 mr-1">*</span>
                {/* Phone No. */}
                {t("phone")}
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
              <label className="col-span-1 text-gray-700 font-medium">
                {/* Fax */}
                {t("fax")}
              </label>
              <Form.Item name="fax" className="col-span-3 lg:col-span-2">
                <Input />
              </Form.Item>

              {/* Address */}
              <label className="col-span-1 text-gray-700 font-medium">
                <span className="text-red-500 mr-1">*</span>
                {/* Address */}
                {t("address")}
              </label>
              <Form.Item
                name="address"
                className="col-span-3 lg:col-span-2"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Email */}
              <label className="col-span-1 text-gray-700 font-medium">
                <span className="text-red-500 mr-1">*</span>
                {/* Email */}
                {t("email")}
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
                {/* Inquiry */}
                {t("inquiry")}
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
                  {/* Submit */}
                  {t("submit")}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
