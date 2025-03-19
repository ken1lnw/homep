"use client";
import React from "react";
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

export default function CartFormComponent() {
  const [form] = Form.useForm();

  return (
    <>
      <div className="container mx-auto mb-10 px-2 lg:px-0">
        <h1 className="text-4xl font-bold mt-12 mb-5">Contact Information</h1>

        <Form form={form} layout="vertical" style={{fontSize:"18px"}}>
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

              <Button className="bg-blue-500 hover:bg-pink-500 w-56 h-14 text-2xl">Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
