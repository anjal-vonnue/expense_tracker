import {
  Card,
  //   CardAction,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const SpendingCategory = () => {
  return (
    <Card className="w-full bg-muted/50">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        {/* <CardAction>
          <Wallet />
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <h1 className="text-5xl font-bold">12,480</h1>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <TrendingUp />
        12% from last month
      </CardFooter> */}
    </Card>
  );
};

export default SpendingCategory;
