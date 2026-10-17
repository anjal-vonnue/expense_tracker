import { Pencil } from "lucide-react";
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
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Popover, PopoverTrigger } from "./ui/popover";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useEdit from "@/hooks/useEdit";
import { Spinner } from "./ui/spinner";

type EditDialogProps = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  retry: () => void;
  contextRetry: () => void;
};

const EditDialog = ({
  id,
  title,
  category,
  amount,
  date,
  retry,
  contextRetry,
}: EditDialogProps) => {
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editCategory, setEditCategory] = useState<string>(category);
  const [editAmount, setEditAmount] = useState<number>(amount);
  const [editDate, setEditDate] = useState<CalendarDate>(parseDate(date));

  const { editExpense, isPending } = useEdit();

  const resetForm = () => {
    setEditTitle(title);
    setEditCategory(category);
    setEditAmount(amount);
    setEditDate(parseDate(date));
  };

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  const handleSumbit = async () => {
    const editData = {
      ...(title.trim() !== editTitle.trim() && { title: editTitle.trim() }),
      ...(category.trim() !== editCategory.trim() && {
        category: editCategory.trim(),
      }),
      ...(amount !== editAmount && { amount: String(editAmount) }),
      ...(date.trim() !== editDate.toString() && {
        expenseDate: editDate?.toString() ?? null,
      }),
    };

    await editExpense(id, editData);
    retry();
    contextRetry();
  };

  return (
    <DialogTrigger
      onOpenChange={(open) => {
        if (open) {
          resetForm();
        }
      }}
    >
      <form>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
        <Dialog className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Make changes to your expense here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Title</Label>
              <Input
                id="edit-title"
                name="edit-title"
                defaultValue={editTitle}
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="expense-category">Category</FieldLabel>

              <Select
                id="expense-category"
                placeholder="Select a Category"
                className="bg-white w-full"
                value={editCategory}
                onChange={(value) => {
                  if (typeof value === "string") {
                    setEditCategory(value);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((item) => (
                      <SelectItem key={item.value} id={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-category"
                name="edit-category"
                defaultValue={editAmount}
                value={editAmount}
                onChange={(e) => {
                  setEditAmount(Number(e.target.value));
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="expense-date">Date</FieldLabel>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  id="expense-date"
                  className="justify-start font-normal"
                >
                  {editDate ? (
                    editDate
                      .toDate(getLocalTimeZone())
                      .toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                  ) : (
                    <span>Choose a date</span>
                  )}
                </Button>
                <Popover className="w-auto p-0" placement="bottom start">
                  <Calendar value={editDate} onChange={setEditDate} />
                </Popover>
              </PopoverTrigger>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button type="submit" onClick={handleSumbit}>
              {isPending ? (
                <div className="flex items-center gap-3">
                  <Spinner />
                  Saving...
                </div>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </DialogTrigger>
  );
};

export default EditDialog;
