
import ManageProductInquiryTable from "@/components/ManageProductInquiry/ManageProductInquiryTable";

export default function MangeProductInquiry() {
  return (
    <div className="">
      <div className="">
        <div className="flex">
          <h1 className="text-4xl font-bold">Product Inquiry List</h1>
        </div>


        <div className="my-5">
          {/* <ManageNewsTable /> */}
          <ManageProductInquiryTable/>
        </div>
      </div>
    </div>
  );
}
