"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "antd";
import { Button } from "../ui/button";
import { sendMail } from "@/lib/send-email";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "@/app/(Home)/Products/[id]/spinload";
import { Form } from "antd";
import { addGeneralInquiry } from "@/app/(Home)/ContactUs/contactdata";
import { useQueryClient } from "@tanstack/react-query";

export default function ContactUsContent1() {
  const t = useTranslations("ContactUs");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleButtonClick = () => {
    form.submit(); // Manually trigger form submission when the custom button is clicked
  };

  const handleSubmit = async () => {
    if (loading) return; // ถ้ามีการส่งอีเมลอยู่แล้ว ก็ไม่ให้ส่งอีก
    setLoading(true); // ตั้งสถานะเป็นกำลังโหลด

    try {
      setLoading(true);
      await sendMail({
        email: email,
        // sendTo: "your-receiver-email@example.com", // You can set the receiver email or use the SITE_MAIL_RECIEVER
        // subject: "New General Inquiry from " + name  + "Subject : " + subject,
        // You have a new general inquiry from ${name}.\n
        subject: subject + " " + "(General Inquiry)",
        text: `(General Inquiry)\n
        Subject: ${subject}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Message: ${message}\n
        `,
        html: `<p><strong>General Inquiry</strong>.</p>
        <p><strong>Subject:</strong> ${subject}.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Messages:</strong> ${message}</p>`,
      });

      // หลังจากส่งอีเมลสำเร็จให้เพิ่มข้อมูล inquiry ไปยัง Supabase
      const contactData = [
        {
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message,
        },
      ];

      await addGeneralInquiry(contactData); // ทำการเพิ่มข้อมูล Inquiry

      // localStorage.removeItem("cart");
      // router.refresh();
      form.setFieldsValue({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      await queryClient.invalidateQueries({ queryKey: ['inquiry_general'] })
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
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
          <LoadingSpinner />
        </div>
      )}

      <div className="container mx-auto my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 gap-10 lg:gap-0">
          {/* Information Section */}
          <div className="col-span-1">
            <div>
              <h1 className="font-bold text-2xl">
                {/* T.I.T. INTERNATIONAL CO., LTD. */}
                {t("cname")}
              </h1>
              <div className="text-xl">
                <p className="whitespace-pre-wrap">
                  {/* 119 Moo 3, Bankhai-Nonglalok Rd. Nong Lalok, <br /> */}
                  {/* Ban Khai District, Rayong 21120, Thailand */}
                  {t("caddress")}
                </p>
                <span>
                  {/* Phone : (+66) 38-892-298 */}
                  {t("cphone")}
                  <br />
                </span>
                <span>
                  {/* Fax : (+66) 38-892-419 */}
                  {t("cfax")}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.29415120872!2d101.25536009999999!3d12.824259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102e3f660c4d3af%3A0x3300997cf2bf739d!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4l-C4tS7guYTguK0u4LiX4Li1IOC4reC4tOC4meC5gOC4leC4reC4o-C5jOC5gOC4meC4iuC4seC5iOC4meC5geC4meC4pSDguIjguLPguIHguLHguJQgKCBUWUMgVEhBSUxBTkQgKQ!5e0!3m2!1sth!2sth!4v1741330556144!5m2!1sth!2sth"
                className="border h-80 lg:w-[600px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-span-1">
            <h1 className="text-xl font-bold mb-5">
              {/* GENERAL INQUIRIES */}
              {t("general")}
            </h1>

            <Form
              layout="vertical"
              onFinish={handleSubmit}
              form={form}
              initialValues={{ name, email, phone, subject, message }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:max-w-2/3 text-xl">
                <div>
                  <label htmlFor="name">
                    {/* Name  */}
                    {t("name")}
                    <span className="text-pink-500">*</span>
                  </label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div>
                  <label htmlFor="email">
                    {/* Email Address */}
                    {t("email")}
                    <span className="text-pink-500">*</span>
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please input a valid email address!",
                      },
                    ]}
                  >
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div>
                  <label htmlFor="phone">
                    {/* Phone Number  */}
                    {t("phone")}
                    <span className="text-pink-500">*</span>
                  </label>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div>
                  <label htmlFor="subject">
                    {/* Subject  */}
                    {t("subject")}
                    <span className="text-pink-500">*</span>
                  </label>
                  <Form.Item
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "Please input your subject!",
                      },
                    ]}
                  >
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="message">
                    {/* Message  */}
                    {t("message")}
                    <span className="text-pink-500">*</span>
                  </label>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please input your message!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="lg:col-span-2">
                  <Button
                    className="bg-blue-500 hover:bg-pink-500 text-xl h-10 w-36"
                    onClick={handleButtonClick}
                  >
                    {/* Submit */}
                    {t("submit")}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
