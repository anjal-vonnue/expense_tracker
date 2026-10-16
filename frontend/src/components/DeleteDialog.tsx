import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import useDelete from "@/hooks/useDelete";
import { Spinner } from "./ui/spinner";

type DeleteDialogProps = {
  expenseId: number;
  retry: () => void;
  contextRetry: () => void;
};

const DeleteDialog = ({
  expenseId,
  retry,
  contextRetry,
}: DeleteDialogProps) => {
  const { deleteExpense, isPending } = useDelete();
  return (
    <AlertDialogTrigger>
      <Button variant="destructive" size="icon">
        <Trash />
      </Button>
      <AlertDialog>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            expnese from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log("DELETED ID: ", expenseId);
              await deleteExpense(expenseId);
              retry();
              contextRetry();
            }}
            variant={"destructive"}
          >
            {isPending ? (
              <div className="flex items-center gap-3">
                <Spinner />
                Deleting..
              </div>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </AlertDialogTrigger>
  );
};

export default DeleteDialog;
