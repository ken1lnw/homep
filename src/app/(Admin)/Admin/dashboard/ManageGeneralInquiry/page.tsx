import ManageGeneralInquiryTable from "@/components/ManageGeneralInquiry/ManageGeneralInquiryTable";
import ManageNewsTable from "@/components/ManageNews/ManageNewsTable";
import { AddProductModal } from "@/components/ManageProducts/AddProductModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusSquareFilled } from "@ant-design/icons";

export default function MangeGeneralInquiry() {
  return (
    <div className="">
      <div className="">
        <div className="flex">
          <h1 className="text-4xl font-bold">General Inquiry List</h1>
        </div>


        <div className="my-5">
          {/* <ManageNewsTable /> */}
          <ManageGeneralInquiryTable/>
        </div>
      </div>
    </div>
  );
}
