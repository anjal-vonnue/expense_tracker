import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useExpenseRange } from "@/context/ExpenseRangeContext";
import { Spinner } from "../ui/spinner";

type SpendingCategory =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment"
  | "others";

export type ChartData = {
  category: SpendingCategory;
  spend: number;
  fill: string;
};

const chartConfig = {
  spend: { label: "Spending" },
  food: { label: "Food", color: "var(--chart-1)" },
  transport: { label: "Transport", color: "var(--chart-2)" },
  shopping: { label: "Shopping", color: "var(--chart-3)" },
  bills: { label: "Bills", color: "var(--chart-4)" },
  entertainment: {
    label: "Entertainment",
    color: "var(--chart-5)",
  },
  others: { label: "Others", color: "var(--chart-6)" },
} satisfies ChartConfig;

export function SpendingCategory() {
  const {
    total,
    highestPaid,
    category: chartData,
    isLoading,
  } = useExpenseRange();

  const hasExpenses =
    Number(total) > 0 && chartData?.some((item) => Number(item.spend) > 0);

  return (
    <Card className="flex w-full flex-col overflow-hidden bg-muted/50">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Spending by Category
        </CardTitle>
        <CardDescription>A breakdown of where your money goes</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {isLoading ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3">
            <Spinner />
            <p className="text-sm text-muted-foreground">
              Loading spending data...
            </p>
          </div>
        ) : hasExpenses ? (
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-75">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <Pie
                    data={chartData.filter((item) => Number(item.spend) > 0)}
                    dataKey="spend"
                    nameKey="category"
                    innerRadius="66%"
                    outerRadius="92%"
                    paddingAngle={3}
                    cornerRadius={5}
                    stroke="none"
                  >
                    {chartData
                      .filter((item) => Number(item.spend) > 0)
                      .map((item) => (
                        <Cell key={item.category} fill={item.fill} />
                      ))}

                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                dy="-0.4em"
                                className="fill-foreground text-2xl font-bold"
                              >
                                ₹{Number(total).toLocaleString("en-IN")}
                              </tspan>

                              <tspan
                                x={viewBox.cx}
                                dy="1.8em"
                                className="fill-muted-foreground text-xs"
                              >
                                Total spent
                              </tspan>
                            </text>
                          );
                        }

                        return null;
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
                <span>Category</span>
                <span className="text-right">Amount / Share</span>
              </div>

              {chartData
                .filter((item) => Number(item.spend) > 0)
                .map((item) => {
                  const percentage = (Number(item.spend) / Number(total)) * 100;

                  return (
                    <div
                      key={item.category}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="h-3 w-3 shrink-0"
                          style={{ backgroundColor: item.fill }}
                        />

                        <span className="truncate text-sm font-medium">
                          {chartConfig[item.category].label}
                        </span>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold tabular-nums">
                          ₹{Number(item.spend).toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-muted-foreground tabular-nums">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <h3 className="text-lg font-semibold">No expenses yet</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Once you start recording expenses, your spending breakdown will
              appear here with a category-wise chart.
            </p>
          </div>
        )}
      </CardContent>

      {!isLoading && hasExpenses && highestPaid?.category && (
        <CardFooter className="flex items-start justify-center gap-2 border-t bg-muted/30 px-6 py-4">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

          <p className="text-md font-bold">
            {highestPaid.category} is your highest spending category
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
