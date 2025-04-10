import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteFilled, } from "@ant-design/icons";
import { Button } from "./button";
const DeleteModal = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* <button className="px-2 py-4 border rounded-lg shadow "><DeleteOutlined/></button> */}

          <Button
            style={{ fontSize: "20px", fontWeight: "bold" }}
            className="bg-red-500 hover:bg-red-300"
          >
            <DeleteFilled />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className="text-black">cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} asChild>
              <Button  className="bg-red-500 hover:bg-red-300">submit</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
