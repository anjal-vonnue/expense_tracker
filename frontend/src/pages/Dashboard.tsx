import HighestCategory from "@/components/page/HighestCategory";
import { TotalExpenses } from "@/components/page/TotalExpenses";
import TotalTransactions from "@/components/page/TotalTransactions";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <TotalExpenses />
        <TotalTransactions />
        <HighestCategory />
      </div>
      <div className="min-h-screen flex-1 bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default Dashboard;
