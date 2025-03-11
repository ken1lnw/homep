"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button, ConfigProvider, Input } from "antd";

export default function ContactUsContent1() {
  const t = useTranslations("Content1");
  return (
    <>
      <div className="w-full flex my-10 ">
        <div className="w-1/2 flex flex-col items-center">
          <div>
            <div>
              <h1 className="font-bold">T.I.T. INTERNATIONAL CO., LTD.</h1>
              <p className="">
                119 Moo 3, Bankhai-Nonglalok Rd. Nong Lalok, <br />
                Ban Khai District, Rayong 21120, Thailand
              </p>
              <span>
                Phone : (+66) 38-892-298
                <br />
              </span>
              <span>Fax : (+66) 38-892-419</span>
            </div>

            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.29415120872!2d101.25536009999999!3d12.824259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102e3f660c4d3af%3A0x3300997cf2bf739d!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4l-C4tS7guYTguK0u4LiX4Li1IOC4reC4tOC4meC5gOC4leC4reC4o-C5jOC5gOC4meC4iuC4seC5iOC4meC5geC4meC4pSDguIjguLPguIHguLHguJQgKCBUWUMgVEhBSUxBTkQgKQ!5e0!3m2!1sth!2sth!4v1741330556144!5m2!1sth!2sth"
                //   width="600"
                //   height="450"
                //   style={{ border: 0 }}
                //   allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border h-80 w-96"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2  gap-5 h-full flex justify-start">
        <div className="grid grid-cols-2 gap-5 max-w-1/2 ">
          <div>
            <label htmlFor="name">
              Name <span className="text-pink-500">*</span>
            </label>
            <Input id="name" />
          </div>

          <div>
            <label htmlFor="email">
              Email Address <span className="text-pink-500">*</span>
            </label>
            <Input id="email" />
          </div>

          <div>
            <label htmlFor="phone">
              Phone Number <span className="text-pink-500">*</span>
            </label>
            <Input id="phone" />
          </div>

          <div>
            <label htmlFor="subject">
              Subject <span className="text-pink-500">*</span>
            </label>
            <Input id="subject" />
          </div>

          <div className="col-span-2">
            <label htmlFor="message">
              Message <span className="text-pink-500">*</span>
            </label>
            <Input.TextArea id="message" className="" />
          </div>

          <div className="col-span-2">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    /* here is your component tokens */
                    colorPrimary: "blue", // กำหนดสีปุ่มเป็นสีชมพู
                    colorPrimaryHover: "#ff69b4",
                    // colorTextLightSolid: "black", // เปลี่ยนสีตัวหนังสือ
                  },
                },
              }}
            >
              <Button type="primary">Submit</Button>
            </ConfigProvider>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
