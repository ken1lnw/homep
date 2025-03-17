import Articles from "@/components/News/Articles";

export default function News() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50" />

        <img
          src="https://www.tyc.com.tw/assets/uploads/news/banner1681711357.jpg"
          alt="news"
          className="w-full h-[300px] object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-7xl font-bold">
            News
          </h1>
          <p className="text-xl font-bold">
          Discover how the TYC Smart Manufacturing Platform empowers your production process to achieve excellence, regardless of what you're creating
          </p>
        </div>
      </div>

   
    <Articles/>

      
    </div>


  );
}
