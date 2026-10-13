import React from "react";
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

type ChartData = {
  category: string;
  spend: number;
  fill: string;
};

const chartData: ChartData[] = [
  { category: "food", spend: 275, fill: "var(--color-food)" },
  { category: "transport", spend: 200, fill: "var(--color-transport)" },
  { category: "shopping", spend: 287, fill: "var(--color-shopping)" },
  { category: "bills", spend: 173, fill: "var(--color-bills)" },
  {
    category: "entertainment",
    spend: 173,
    fill: "var(--color-entertainment)",
  },
  { category: "others", spend: 190, fill: "var(--color-others)" },
];

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

const currency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function SpendingCategory() {
  const totalSpend = React.useMemo(
    () => chartData.reduce((total, item) => total + item.spend, 0),
    [],
  );

  return (
    <Card className="w-full overflow-hidden bg-muted/50">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Spending by Category
        </CardTitle>
        <CardDescription>A breakdown of where your money goes</CardDescription>
      </CardHeader>

      <CardContent className="pb-4 flex-1">
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
                  data={chartData}
                  dataKey="spend"
                  nameKey="category"
                  innerRadius="66%"
                  outerRadius="92%"
                  paddingAngle={3}
                  cornerRadius={5}
                  stroke="none"
                >
                  {chartData.map((item) => (
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
                              {currency(totalSpend)}
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

            {chartData.map((item) => {
              const percentage = (item.spend / totalSpend) * 100;

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
                    <span className="truncate text-sm font-medium capitalize">
                      {chartConfig[item.category].label}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold tabular-nums">
                      {currency(item.spend)}
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
      </CardContent>

      <CardFooter className="flex justify-center items-start gap-2 border-t bg-muted/30 px-6 py-4">
        <TrendingUp className="h-4 w-4 text-emerald-600" />
        <p className="font-bold text-md">
          Shopping is your highest spending category
        </p>
      </CardFooter>
    </Card>
  );
}
