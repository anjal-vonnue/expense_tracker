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
import { ArrowLeftRight, TrendingUp } from "lucide-react";

const TotalTransactions = () => {
  const { transactionCount } = useExpenseRange();

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
          <div className="bg-blue-100 p-2 text-blue-700">
            <ArrowLeftRight className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-blue-950">
          {transactionCount}
        </h1>
        <p className="mt-1 text-sm text-blue-800/70">
          Total transactions this month
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-blue-200 pt-4 text-sm text-blue-700">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">12% from last month</span>
      </CardFooter>
    </Card>
  );
};

export default TotalTransactions;
