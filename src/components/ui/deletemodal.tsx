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
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";


  const DeleteModal = ({ onDelete }: { onDelete: () => void}) => {  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <button className="px-2 py-4 border rounded-lg shadow "><DeleteOutlined/></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
                <button>cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} asChild>
                <button>submit</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
