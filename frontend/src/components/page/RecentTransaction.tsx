import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router";

const expenses = [
  {
    id: 1,
    title: "Bought Bananas",
    category: "Food",
    amount: 250.0,
    date: "2026-10-12",
  },
  {
    id: 2,
    title: "Uber Ride",
    category: "Transport",
    amount: 180.0,
    date: "2026-10-11",
  },
  {
    id: 3,
    title: "New T-Shirt",
    category: "Shopping",
    amount: 799.0,
    date: "2026-10-10",
  },
  {
    id: 4,
    title: "Electricity Bill",
    category: "Bills",
    amount: 1450.0,
    date: "2026-10-09",
  },
  {
    id: 5,
    title: "Movie Tickets",
    category: "Entertainment",
    amount: 500.0,
    date: "2026-10-08",
  },
  {
    id: 6,
    title: "Mobile Recharge",
    category: "Bills",
    amount: 299.0,
    date: "2026-10-07",
  },
  {
    id: 7,
    title: "Lunch at Restaurant",
    category: "Food",
    amount: 650.0,
    date: "2026-10-06",
  },
  {
    id: 8,
    title: "Petrol",
    category: "Transport",
    amount: 1200.0,
    date: "2026-10-05",
  },
  {
    id: 9,
    title: "Headphones",
    category: "Shopping",
    amount: 1999.0,
    date: "2026-10-04",
  },
  {
    id: 10,
    title: "Stationery",
    category: "Others",
    amount: 320.0,
    date: "2026-10-03",
  },
];

const RecentTransaction = () => {
  return (
    <Card className="w-full  bg-muted/50">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        <CardAction>
          {" "}
          <Button>
            {" "}
            <Link to={"/expenses"}>View all</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="h-full overflow-y-auto">
          <Table>
            <TableHeader>
              <TableHead isRowHeader className="w-25">
                Title
              </TableHead>
              <TableHead className="text-right">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id} className="">
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell className="text-right">
                    {expense.category}
                  </TableCell>
                  <TableCell className="text-right">
                    {expense.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </TableCell>
                  <TableCell className="text-right">{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TableCaption>A list of your recent expenses.</TableCaption>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
