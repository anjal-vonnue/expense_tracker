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

import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import { Spinner } from "../ui/spinner";

const HighestCategory = () => {
  const { total, highestPaid, isLoading } = useExpenseRange();

  const hasExpenses =
    highestPaid && Number(highestPaid.spend) > 0 && Number(total) > 0;

  return (
    <Card className="flex lg:aspect-video flex-col bg-purple-50 md:h-80 w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-950">
          Highest Category
        </CardTitle>

        <CardDescription className="text-purple-800/70">
          Your top spending category this month
        </CardDescription>

        <CardAction>
          <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
            <ChartNoAxesCombined className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center">
        {isLoading ? (
          <div className="flex items-center gap-2 text-purple-700">
            <Spinner />
            <span className="text-sm">Loading expenses...</span>
          </div>
        ) : hasExpenses ? (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-purple-950">
              {highestPaid.category}
            </h1>

            <p className="mt-1 text-sm text-purple-800/70">
              Your highest expense category
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <h3 className="font-semibold text-purple-950">No expenses yet</h3>

            <p className="mt-1 max-w-52 text-sm text-purple-800/70 text-center">
              Once you start tracking your expenses, your top category will
              appear here.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-purple-200 pt-4 text-sm text-purple-700">
        {isLoading ? (
          <Spinner />
        ) : hasExpenses ? (
          <>
            <TrendingUp className="h-4 w-4 shrink-0" />

            <span className="font-medium">
              ₹{Number(highestPaid.spend).toLocaleString("en-IN")} (
              {((Number(highestPaid.spend) * 100) / Number(total)).toFixed(1)}%
              of total expenses)
            </span>
          </>
        ) : (
          <span className="text-purple-800/60">
            Add expenses to see your spending breakdown.
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default HighestCategory;
