import AboutUsContent1 from "@/components/AboutUs/AboutUsContent1";
import AboutUsContent2 from "@/components/AboutUs/AboutUsContent2";
import AboutUsContent3 from "@/components/AboutUs/AboutUsContent3";
import AboutUsContent3Mobile from "@/components/AboutUs/AboutUsContent3Mobile";
import AboutUsContent4 from "@/components/AboutUs/AboutUsContent4";
import AboutUsContent5 from "@/components/AboutUs/AboutUsContent5";
import AboutUsContent6 from "@/components/AboutUs/AboutUsContent6";

export default function AboutUs() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[300px]  bg-black opacity-50" />

        <img
          src="https://baiyiled.nl/wp-content/uploads/2018/12/TYC-building.jpg"
          alt="TYC Building"
          className="w-full h-[200px] lg:h-[300px] object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
            About Us
          </h1>
          <p className="text-md md:text-xl font-bold">
            Expect more , Expect TYC.
          </p>
        </div>
      </div>

      <AboutUsContent1 />

      <AboutUsContent2 />

      <AboutUsContent5 />

      <div className="hidden lg:flex">
        <AboutUsContent3 />
      </div>


      <div className="lg:hidden">
        <AboutUsContent3Mobile />
      </div>

      <AboutUsContent4 />
      <AboutUsContent6/>
    </div>
  );
}
