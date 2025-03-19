"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";  

export default function AboutUsContent6() {
  const t = useTranslations("Content1");
  const router = useRouter();  

  return (
    <>
      <div className="relative w-full h-[250px] lg:h-[350px] flex text-black bg-black">
        <Image
          src={"/tycoldup.jpg"}
          alt=""
          width={1280}
          height={720}
          className="w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0  flex flex-col justify-center pl-10 md:pl-32 space-y-4">
          <h1 className="text-white text-5xl font-bold">TYC History</h1>
          <a 
            onClick={() => router.push("/History")}  // Directly use router.push inside an anonymous function
          className="text-pink-500 hover:text-pink-400 text-xl cursor-pointer">
            Learn more about TYC History
          </a>
        </div>
      </div>
    </>
  );
}
