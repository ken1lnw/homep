import ContactUsContent1 from "@/components/ContactUs/ContactUsContent1";


export default function ContactUs() {
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
            Contact Us
          </h1>
          <p className="text-xl font-bold">
          Learn more about how the TYC Smart Manufacturing Platform can help you make better things, no matter what you make.
          </p>
        </div>
      </div>

   
    <ContactUsContent1/>


      
    </div>


  );
}
