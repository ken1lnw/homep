import ManageNewsTable from "@/components/ManageNews/ManageNewsTable";
import { AddProductModal } from "@/components/ManageProducts/AddProductModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusSquareFilled } from "@ant-design/icons";

export default function ManageNews() {
  return (
    // <div className="bg-blue-500 w-screen h-screen flex justify-center p-4">
    //   <div className="bg-white w-full p-6 rounded-lg shadow-lg">
    <div className="">
      <div className="">
        <div className="flex">
          <h1 className="text-4xl font-bold">Articles List</h1>
        </div>

        {/* <div className="flex justify-between items-center mt-4">
          <Input type="email" placeholder="Search" className="w-48" /> 
          <AddProductModal />
        </div> */}

        <div className="my-5">
          <ManageNewsTable />
        </div>
      </div>
    </div>
  );
}
