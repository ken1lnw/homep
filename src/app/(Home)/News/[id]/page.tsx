'use client'
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/hook/supabase";
import { NewsType } from "@/components/ManageNews/NewsType";
import { use } from "react";

export default function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params); // ใช้ use() เพื่อดึงค่า params.id โดยไม่ต้องใช้ useEffect


    const { data: article, isLoading, error } = useQuery({
        queryKey: ["news_article", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("news_article")
                .select("*,news_image(*)")
                .eq("id", id)
                .single();

            if (error) throw error;
            return data as NewsType;
        },
        staleTime: 1000 * 60 * 5, // Cache ไว้ 5 นาที
        enabled: !!id, // ใช้ query ก็ต่อเมื่อมี id
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading article</p>;


    return (
        <div className="container mx-auto my-10">
             <h1 className="text-3xl font-bold">{article?.news_title}</h1>
            <p className="text-sm text-gray-500">
            {article?.created_at ? new Date(article.created_at).toLocaleDateString() : "No date available"}
            </p>
            <img src={article?.news_image?.[0]?.path} alt={article?.news_title} className="w-[500px] h-[250px] mt-4" />
            <p className="mt-4 text-gray-700">{article?.news_description}</p>
        </div>
    );
}
