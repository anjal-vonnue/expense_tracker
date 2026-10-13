import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftRight, TrendingUp } from "lucide-react";

const TotalTransactions = () => {
  return (
    <Card className="aspect-video bg-blue-100">
      <CardHeader>
        <CardTitle>Total Transactions</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        <CardAction>
          <ArrowLeftRight />
        </CardAction>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">18</h1>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <TrendingUp />
        12% from last month
      </CardFooter>
    </Card>
  );
};

export default TotalTransactions;
