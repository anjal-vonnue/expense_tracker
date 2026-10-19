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

import { ArrowLeftRight, TrendingUp } from "lucide-react";
import { Spinner } from "../ui/spinner";

const TotalTransactions = () => {
  const { transactionCount, isLoading, transactionChange } = useExpenseRange();

  const hasTransactions = Number(transactionCount) > 0;

  return (
    <Card className="flex lg:aspect-video flex-col bg-blue-50 md:h-80 w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-blue-950">
          Total Transactions
        </CardTitle>

        <CardDescription className="text-blue-800/70">
          Transactions for the current month
        </CardDescription>

        <CardAction>
          <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
            <ArrowLeftRight className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center">
        {isLoading ? (
          <div className="flex items-center gap-2 text-blue-700">
            <Spinner />
            <span className="text-sm">Loading transactions...</span>
          </div>
        ) : hasTransactions ? (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-blue-950">
              {Number(transactionCount).toLocaleString("en-IN")}
            </h1>

            <p className="mt-1 text-sm text-blue-800/70">
              Total transactions this month
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <h3 className="font-semibold text-blue-950">No transactions yet</h3>

            <p className="mt-1 max-w-52 text-sm text-blue-800/70 text-center">
              Your transactions will appear here once you start recording them.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-blue-200 pt-4 text-sm text-blue-700">
        {isLoading ? (
          <Spinner />
        ) : hasTransactions ? (
          <>
            <TrendingUp className="h-4 w-4 shrink-0" />
            <span className="font-medium">
              {transactionChange.toFixed(1)}% from previous 30 days
            </span>
          </>
        ) : (
          <span className="text-blue-800/60">
            Add transactions to track your activity.
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default TotalTransactions;
