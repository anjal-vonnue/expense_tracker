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
import React, { useState } from "react";
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

type EditDialogProps = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
};

const EditDialog = ({ id, title, category, amount, date }: EditDialogProps) => {
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editCategory, setEditCategory] = useState<string>(category);
  const [editAmount, setEditAmount] = useState<number>(amount);
  const [editDate, setEditDate] = useState<CalendarDate>(parseDate(date));
  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    setEditTitle(title);
    setEditCategory(category);
    setEditAmount(amount);
    setEditDate(parseDate(date));
  };

  console.log(id + " isOpen: " + isOpen);

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  const handleSumbit = () => {
    const editData = {
      id: id,
      title: editTitle.trim(),
      category: editCategory.trim(),
      amount: editAmount,
      date: editDate?.toString() ?? null,
    };

    console.log("edit: ", editData);
  };

  return (
    <DialogTrigger
      onOpenChange={(open) => {
        setIsOpen(open);
        console.log("open: ", open);

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
              Save changes
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </DialogTrigger>
  );
};

export default EditDialog;
