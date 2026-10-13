import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartNoAxesCombined, TrendingUp } from "lucide-react";

const HighestCategory = () => {
  return (
    <Card className="aspect-video bg-purple-100">
      <CardHeader>
        <CardTitle>Highest Category</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        <CardAction>
          <ChartNoAxesCombined />
        </CardAction>
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">Food</h1>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <TrendingUp />
        4200 (32%)
      </CardFooter>
    </Card>
  );
};

export default HighestCategory;
