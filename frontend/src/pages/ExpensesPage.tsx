import ExpenseRow from "@/components/ExpenseRow";
import ExpenseSearch from "@/components/ExpenseSearch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useExpenseRange } from "@/context/ExpenseRangeContext";
import useGetExpenses from "@/hooks/useGetExpenses";

const ExpensesPage = () => {
  const {
    expenses,
    pagination,
    isLoading,
    pageSize,
    setPageSize,
    setPage,
    retry,
    setSearch: setSearchHook,
    setCategory: setCategoryHook,
  } = useGetExpenses();

  const { retry: contextRetry } = useExpenseRange();

  const pageSizeArray = [10, 15, 20, 25, 50];

  const handleSearch = (search: string, category: string) => {
    setSearchHook(search);
    setCategoryHook(category);
    setPage(1);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden bg-muted/50">
      <CardHeader className="shrink-0">
        <CardTitle>All Expenses</CardTitle>
        <CardDescription>
          This is your expenses for the recent month
        </CardDescription>

        <ExpenseSearch onSubmit={handleSearch} />
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
                    <ExpenseRow
                      key={expense.id}
                      expense={expense}
                      retry={retry}
                      contextRetry={contextRetry}
                    />
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
              <Badge variant="outline" className="p-4">
                {pagination?.page}/{pagination?.totalPages}
              </Badge>
            </PaginationItem>
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
            <PaginationItem>
              {" "}
              <Select
                aria-label="row size selection"
                id="expense-category"
                placeholder={"row"}
                className="bg-white w-full"
                value={pageSize}
                onChange={(value) => {
                  if (typeof value === "number") {
                    setPageSize(value);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>select row size</SelectLabel>
                    {pageSizeArray.map((item) => (
                      <SelectItem key={item} id={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default ExpensesPage;
