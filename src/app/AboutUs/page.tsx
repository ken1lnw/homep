import AboutUsContent1 from "@/components/AboutUs/AboutUsContent1";
import AboutUsContent2 from "@/components/AboutUs/AboutUsContent2";
import AboutUsContent3 from "@/components/AboutUs/AboutUsContent3";

export default function AboutUs() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-black opacity-50" />

        <img
          src="https://baiyiled.nl/wp-content/uploads/2018/12/TYC-building.jpg"
          alt="TYC Building"
          className="w-full h-[300px] object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-7xl font-bold">
            About Us
          </h1>
          <p className="text-xl font-bold">
            Innovating Automotive Lighting for a Brighter Future
          </p>
        </div>
      </div>

      <AboutUsContent1 />
      
      <AboutUsContent2 />

      <AboutUsContent3 />


      
    </div>


  );
}
