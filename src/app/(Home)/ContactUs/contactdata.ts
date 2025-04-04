
"use server";

import { supabase } from "@/hook/supabase"; // แหล่งข้อมูลจาก Supabase
import { GeneralInquiryType } from "@/types/general-inquiry";



export async function addGeneralInquiry(contactData: Omit<GeneralInquiryType, 'id' | 'created_at'>[]): Promise<GeneralInquiryType[]> {

const { data, error } = await supabase
  .from("inquiry_general")
  .insert(contactData) 
  .select();

if (error) throw new Error(error.message); 
if (data) {
    return data as GeneralInquiryType[];
  } else {
    throw new Error("Failed to insert data, received null response from Supabase.");
  }
}
