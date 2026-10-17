import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";
import useDelete from "@/hooks/useDelete";

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
    <DialogTrigger>
      <form>
        <Button variant="destructive" size="icon">
          <Trash />
        </Button>
        <Dialog className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              expnese from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button
              type="submit"
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
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </DialogTrigger>
  );
};

export default DeleteDialog;
