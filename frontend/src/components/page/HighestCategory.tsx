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

const HighestCategory = () => {
  const { total, highestPaid } = useExpenseRange();

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
          <div className="bg-purple-100 p-2 text-purple-700">
            <ChartNoAxesCombined className="h-10 w-10" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-purple-950">
          {highestPaid?.category}
        </h1>
        <p className="mt-1 text-sm text-purple-800/70">
          Your highest expense category
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center gap-2 border-t border-purple-200 pt-4 text-sm text-purple-700">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">
          ₹{highestPaid?.spend} (
          {((Number(highestPaid?.spend) * 100) / total).toFixed(1)}% of total
          expenses)
        </span>
      </CardFooter>
    </Card>
  );
};

export default HighestCategory;
