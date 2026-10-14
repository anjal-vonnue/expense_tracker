import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenseRange } from "@/hooks/useExpenseRange";

import { TrendingUp, Wallet } from "lucide-react";

export const TotalExpenses = () => {
  const { expenses, transactionCount } = useExpenseRange();

  console.log("TOTAL EXPENSES: ", transactionCount);

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
          <div className=" bg-green-100 p-2 text-green-700">
            <Wallet className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-green-950">
          ₹12,480
        </h1>
        <p className="mt-1 text-sm text-green-800/70">
          Total spending this month
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-green-200 pt-4 text-sm text-green-700">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">12% from last month</span>
      </CardFooter>
    </Card>
  );
};
