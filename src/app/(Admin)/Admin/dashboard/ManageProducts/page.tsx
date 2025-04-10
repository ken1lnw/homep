import ManageProductsTable from "@/components/ManageProducts/ManageProductsTable";


export default function ManageProducts() {
  return (
    // <div className="bg-blue-500 w-screen flex justify-center p-4">
    //   <div className="bg-white w-full p-6 rounded-lg shadow-lg">
    <div className="">
      <div className="">
        <div className="flex">
          <h1 className="text-4xl font-bold">Products List</h1>
        </div>

        {/* <div className="flex justify-between items-center mt-4">
          <Input type="email" placeholder="Search" className="w-48" /> 
          <AddProductModal />
        </div> */}

        <div className="my-5">
          <ManageProductsTable />
        </div>
      </div>
    </div>
  );
}
