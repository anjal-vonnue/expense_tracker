import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenseRange } from "@/context/ExpenseRangeContext";

import { TrendingUp, Wallet } from "lucide-react";
import { Spinner } from "../ui/spinner";

export const TotalExpenses = () => {
  const { total, isLoading, expenseChange } = useExpenseRange();

  const hasExpenses = Number(total) > 0;

  return (
    <Card className="flex lg:aspect-video flex-col bg-green-50 md:h-80 w-full">
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold text-green-950">
          Total Expenses
        </CardTitle>

        <CardDescription className="text-green-800/70">
          Your expenses for the current month
        </CardDescription>

        <CardAction>
          <div className="rounded-lg bg-green-100 p-2 text-green-700">
            <Wallet className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center">
        {isLoading ? (
          <div className="flex items-center gap-2 text-green-700">
            <Spinner />
            <span className="text-sm">Loading expenses...</span>
          </div>
        ) : hasExpenses ? (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-green-950">
              ₹{Number(total).toLocaleString("en-IN")}
            </h1>

            <p className="mt-1 text-sm text-green-800/70">
              Total spending this month
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <h3 className="font-semibold text-green-950">No expenses yet</h3>

            <p className="mt-1 max-w-52 text-sm text-green-800/70 text-center">
              Your total spending will appear here once you start recording
              expenses.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-green-200 pt-4 text-sm text-green-700">
        {isLoading ? (
          <Spinner />
        ) : hasExpenses ? (
          <>
            <TrendingUp className="h-4 w-4 shrink-0" />
            <span className="font-medium">
              {expenseChange.toFixed(1)}% from previous 30 days
            </span>
          </>
        ) : (
          <span className="text-green-800/60">
            Add expenses to track your spending.
          </span>
        )}
      </CardFooter>
    </Card>
  );
};
