import ManageNewsProductsTable from "@/components/ManageNewsProducts/ManageNewsProductsTable";


export default function ManageNewsProduct() {
  return (
    // <div className="bg-blue-500 w-screen h-screen flex justify-center p-4">
    //   <div className="bg-white w-full p-6 rounded-lg shadow-lg">
    <div className="">
      <div className="">
        <div className="flex">
          <h1 className="text-4xl font-bold">New Product List</h1>
        </div>

        {/* <div className="flex justify-between items-center mt-4">
          <Input type="email" placeholder="Search" className="w-48" /> 
          <AddProductModal />
        </div> */}

        <div className="my-5">
          <ManageNewsProductsTable />
        </div>
      </div>
    </div>
  );
}
