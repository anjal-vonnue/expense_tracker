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
import { useNavigate } from "react-router";
import useRecent from "@/hooks/useRecent";
import { Spinner } from "../ui/spinner";

const RecentTransaction = () => {
  const navigate = useNavigate();

  const { recent, isLoading } = useRecent();
  // console.log(recent);

  return (
    <Card className="w-full  bg-muted/50">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>
          this is your expensese for the recent month
        </CardDescription>
        <CardAction>
          {" "}
          <Button onClick={() => navigate("/expenses")}> View all</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <div className="flex flex-col justify-between items-center w-full h-full">
              <Spinner className="flex-1" />
            </div>
          </>
        ) : (
          <>
            <div className="h-full overflow-y-auto">
              <Table aria-label="recent transation table">
                <TableHeader>
                  <TableHead isRowHeader className="w-25">
                    Title
                  </TableHead>
                  <TableHead className="text-right">Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableHeader>
                <TableBody>
                  {recent.map((item) => (
                    <TableRow key={item.id} className="">
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.category}
                      </TableCell>
                      <TableCell className="text-right">
                        {Number(item.amount).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(item.expenseDate).toDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
        <TableCaption>
          {isLoading ? (
            <></>
          ) : recent.length === 0 ? (
            <>
              <div className="flex flex-col gap-2">
                <p>currently there are no expenses.</p>
                <Button variant="link" onClick={() => navigate("/new")}>
                  Create One?
                </Button>
              </div>
            </>
          ) : (
            "A list of your recent expenses."
          )}
        </TableCaption>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
