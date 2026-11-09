import { memo } from "react";
import { TableCell, TableRow } from "./ui/table";
import EditDialog from "./EditDialog";

import type { ExpenseType } from "@/hooks/useRecent";
import DeleteDialog from "./DeleteDialog";

const ExpenseRow = memo(function ExpenseRow({
  expense,

  contextRetry,
}: {
  expense: ExpenseType;

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
          contextRetry={contextRetry}
        />

        <DeleteDialog expenseId={expense.id} contextRetry={contextRetry} />
      </TableCell>
    </TableRow>
  );
});

export default ExpenseRow;
