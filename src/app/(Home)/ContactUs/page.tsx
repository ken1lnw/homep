import ContactUsContent1 from "@/components/ContactUs/ContactUsContent1";

export default function ContactUs() {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] lg:h-[300px] bg-black opacity-50" />

        <img
          src="https://www.tyc.com.tw/assets/uploads/stakeholders/banner1681711387.jpg"
          alt="TYC Building"
          className="w-full h-[200px] lg:h-[300px] object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white z-10">
          <h1 className=" text-4xl lg:text-5xl xl:text-7xl font-bold">
            Contact Us
          </h1>
          <p className="text-xl font-bold">We'd like to hear from you</p>
        </div>
      </div>

      <ContactUsContent1 />
    </div>
  );
}
