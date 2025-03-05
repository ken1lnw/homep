import Content1page1 from "./contentpage1/content1";
import Content2page1 from "./contentpage1/content2";
import Content3page1 from "./contentpage1/content3";
export default function Home() {
  return ( <div className="flex flex-col">

<Content1page1/>
<Content2page1/>

{/* <div className="flex justify-between">
  <div className="flex-1">
    <Content3page1 />
  </div>
  <div className="flex-1">
    <Content3page1 />
  </div>
</div> */}
    <Content3page1 />


<div className="w-full h-[600px] bg-black/20">
  <div className="text-white flex justify-center items-center h-full">
    Image
  </div>
</div>




<div className="w-full h-[600px] bg-green-300/20">
  <div className="text-white flex justify-center items-center h-full">
    Image 2
  </div>
</div>



 
  

  </div>
  );
}
