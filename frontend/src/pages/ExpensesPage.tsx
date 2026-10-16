import DeleteDialog from "@/components/DeleteDialog";
import EditDialog from "@/components/EditDialog";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

const ExpensesPage = () => {
  const { expenses, pagination, isLoading, setPage, retry } = useGetExpenses();
  const { retry: contextRetry } = useExpenseRange();
  console.log(pagination);

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden bg-muted/50">
      <CardHeader className="shrink-0">
        <CardTitle>All Expenses</CardTitle>
        <CardDescription>
          This is your expenses for the recent month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center gap-4">
              <Spinner />
            </div>
          ) : (
            <>
              <Table>
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
