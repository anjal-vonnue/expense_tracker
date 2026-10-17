import { memo } from "react";
import { TableCell, TableRow } from "./ui/table";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import type { ExpenseType } from "@/hooks/useRecent";

const ExpenseRow = memo(function ExpenseRow({
  expense,
  retry,
  contextRetry,
}: {
  expense: ExpenseType;
  retry: () => void;
  contextRetry: () => void;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{expense.title}</TableCell>

      <TableCell className="text-right">{expense.category}</TableCell>

      <TableCell className="text-right">
        {Number(expense.amount).toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </TableCell>

      <TableCell className="text-right">
        {expense.expenseDate.split("T")[0]}
      </TableCell>

      <TableCell className="flex justify-end">
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
  );
});

export default ExpenseRow;
