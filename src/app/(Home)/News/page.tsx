import Articles from "@/components/News/Articles";

export default function News() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[300px]  bg-black opacity-50" />

        <img
          src="https://www.tyc.com.tw/assets/uploads/news/banner1681711357.jpg"
          alt="news"
          className="w-full h-[200px] lg:h-[300px]  object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">News</h1>
          <p className="text-sm md:text-md lg:text-xl font-bold">
            Discover how the TYC Smart Manufacturing Platform empowers your
            production process to achieve excellence, regardless of what you're
            creating
          </p>
        </div>
      </div>

      <Articles />
    </div>
  );
}
