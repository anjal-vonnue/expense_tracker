import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useCreateExpense } from "@/hooks/useCreateExpense";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddExpensesPage = () => {
  useDocumentTitle("Add Expenses | Expense Tracker");

  const [date, setDate] = useState<CalendarDate | null>(null);
  const [dateError, setDateError] = useState<boolean>(false);

  const { isPending, error, createExpense, setError } = useCreateExpense();
  const navigate = useNavigate();

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>("others");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date) {
      setDateError(true);
      return;
    }

    const expense = {
      title: title.trim(),
      amount,
      category,
      expenseDate: date?.toString()!,
    };

    console.log("expense:", expense);

    try {
      await createExpense(expense);
      navigate("/");
    } catch (error) {}
  };

  return (
    <Card className="flex h-full bg-muted/50">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>Add Expenses</CardTitle>
        <CardDescription className="text-center">
          Record a new expense to keep your finances organized
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-1">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="expense-title">Title</FieldLabel>
              <Input
                id="expense-title"
                type="text"
                placeholder="Bought Bananas"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError(null);
                }}
                className="bg-white"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="expense-amount">Amount</FieldLabel>
              <Input
                id="expense-amount"
                type="text"
                placeholder="₹480"
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="bg-white"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="expense-category">Category</FieldLabel>

              <Select
                aria-label="category selection"
                id="expense-category"
                placeholder="Select a fruit"
                className="bg-white w-full"
                value={category}
                onChange={(value) => {
                  if (typeof value === "string") {
                    setCategory(value);
                    setError(null);
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
              <FieldLabel htmlFor="expense-date">Date</FieldLabel>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  id="expense-date"
                  className="justify-start font-normal"
                >
                  {date ? (
                    date
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
                  <Calendar
                    value={date}
                    onChange={(date) => {
                      setDate(date);
                      setDateError(false);
                    }}
                  />
                </Popover>
                {dateError && (
                  <p className="text-red-500">please select and expense date</p>
                )}
              </PopoverTrigger>
            </Field>
            {/* </div> */}
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setCategory("others");
                  setAmount("");
                  setDate(null);
                }}
              >
                Reset
              </Button>
              <Button type="submit">
                {isPending ? (
                  <div className="flex items-center gap-3">
                    <Spinner />
                    Saving..
                  </div>
                ) : (
                  "Save Expense"
                )}
              </Button>
            </Field>
          </FieldGroup>
          {error && <p className="text-center pt-5 text-red-500">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <p>Keep track of your spending.</p>
      </CardFooter>
    </Card>
  );
};

export default AddExpensesPage;
