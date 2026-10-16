import DeleteDialog from "@/components/DeleteDialog";
import EditDialog from "@/components/EditDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExpenseRange } from "@/context/ExpenseRangeContext";
import useGetExpenses from "@/hooks/useGetExpenses";
import { useState } from "react";

const ExpensesPage = () => {
  const {
    expenses,
    pagination,
    isLoading,
    setPage,
    retry,
    setSearch: setSearchHook,
    setCategory: setCategoryHook,
  } = useGetExpenses();
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { retry: contextRetry } = useExpenseRange();

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("category: ", category);

    console.log("search: ", search);
    setSearchHook(search);
    setCategoryHook(category);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden bg-muted/50">
      <CardHeader className="shrink-0">
        <CardTitle>All Expenses</CardTitle>
        <CardDescription>
          This is your expenses for the recent month
        </CardDescription>

        <form
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <FieldGroup className="flex flex-row ">
            <Field>
              <FieldLabel htmlFor="input-demo-api-key">Search</FieldLabel>
              <Input
                id="input-demo-api-key"
                placeholder=""
                className="bg-white"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="expense-category">Category</FieldLabel>

              <Select
                aria-label="category selection"
                id="expense-category"
                className="bg-white w-full"
                value={category}
                onChange={(value) => {
                  if (typeof value === "string") {
                    setCategory(value);
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
            <Field orientation="horizontal" className="items-end w-fit">
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  setSearchHook("");
                  setCategoryHook("");
                }}
              >
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden ">
        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center gap-4">
              <Spinner />
              loading expenses...
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-2xl font-bold text-red-400">No Result Found</p>
            </div>
          ) : (
            <>
              <Table aria-label="expense-table">
                <TableHeader>
                  <TableHead isRowHeader className="w-25">
                    Title
                  </TableHead>
                  <TableHead className="text-right">Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">
                        {expense.title}
                      </TableCell>
                      <TableCell className="text-right">
                        {expense.category}
                      </TableCell>
                      <TableCell className="text-right">
                        {Number(expense.amount).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {expense.expenseDate.split("T")[0]}
                      </TableCell>
                      <TableCell className="flex justify-end ">
                        <EditDialog
                          id={expense.id}
                          title={expense.title}
                          category={expense.category}
                          amount={Number(expense.amount)}
                          date={expense.expenseDate.split("T")[0]}
                          retry={retry}
                          contextRetry={contextRetry}
                        />
                        <DeleteDialog
                          expenseId={expense.id}
                          retry={retry}
                          contextRetry={contextRetry}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="shrink-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination?.page && pagination.page > 1) {
                    setPage(pagination.page - 1);
                  }
                }}
                className={
                  pagination?.page! <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from(
              { length: pagination?.totalPages! },
              (_, i) => i + 1,
            ).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pagination?.page! === pageNumber}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    pagination?.page &&
                    pagination.page < pagination.totalPages
                  ) {
                    setPage(pagination.page + 1);
                  }
                }}
                className={
                  pagination?.page! >= pagination?.totalPages!
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default ExpensesPage;
