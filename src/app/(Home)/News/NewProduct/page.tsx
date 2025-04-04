import NewItems from "@/components/News/NewItem";

export default function LastProduct() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[200px]  bg-black opacity-40" />

        <img
          src="https://www.tyc.com.tw/assets/uploads/products/banner1459137632.jpg"
          alt="news"
          className="w-full h-[200px] lg:h-[200px]  object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">New Product</h1>
          <p className="text-sm md:text-md lg:text-xl font-bold">
          Quality Automotive Parts With Road Safety Assurance


          </p>
        </div>
      </div>

      <NewItems/>
    </div>
  );
}
