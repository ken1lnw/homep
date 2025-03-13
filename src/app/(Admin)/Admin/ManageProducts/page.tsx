import { AddProductModal } from "@/components/ManageProducts/AddProductModal";
import ManageProductsTable from "@/components/ManageProducts/ManageProductsTable";
import { Button } from "@/components/ui/button";
import { PlusSquareFilled } from "@ant-design/icons";

export default function ManageProducts() {
  return (
    <div className="bg-blue-500 w-screen h-screen flex justify-center p-4">
      <div className="bg-white w-full p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Products List</h1>
          <AddProductModal />
        </div>
        <div className="my-5">
          <ManageProductsTable />
        </div>
      </div>
    </div>
  );
}
