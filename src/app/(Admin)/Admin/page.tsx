'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Admin/dashboard/ManageNewsProducts");
  }, [router]);

  return null; 
}




