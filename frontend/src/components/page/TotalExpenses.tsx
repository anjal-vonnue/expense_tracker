import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingUp, Wallet } from "lucide-react";

export const TotalExpenses = () => {
  return (
    <Card className="aspect-video bg-green-100">
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        <CardAction>
          <Wallet />
        </CardAction>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">12,480</h1>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <TrendingUp />
        12% from last month
      </CardFooter>
    </Card>
  );
};
