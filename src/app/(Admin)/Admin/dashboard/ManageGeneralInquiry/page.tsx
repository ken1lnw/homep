import ManageGeneralInquiryTable from "@/components/ManageGeneralInquiry/ManageGeneralInquiryTable";

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
