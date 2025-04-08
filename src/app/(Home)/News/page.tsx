import Articles from "@/components/News/Articles";
import { useTranslations } from "next-intl";

export default function News() {
  const t = useTranslations("Article");

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[300px]  bg-black opacity-20" />

        <img
          src="/NewsBanner.png"
          alt="news"
          className="w-full h-[200px] lg:h-[300px]  object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
            {/* News */}
            {t("title")}
          </h1>
          <p className="text-sm md:text-md lg:text-xl font-bold">
            {/* Discover how the TYC Smart Manufacturing Platform empowers your
            production process to achieve excellence, regardless of what you're
            creating */}
            {t("des")}
          </p>
        </div>
      </div>

      <Articles />
    </div>
  );
}
