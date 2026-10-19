import HighestCategory from "@/components/page/HighestCategory";
import RecentTransaction from "@/components/page/RecentTransaction";
import { SpendingCategory } from "@/components/page/SpendingCategory";
import { TotalExpenses } from "@/components/page/TotalExpenses";
import TotalTransactions from "@/components/page/TotalTransactions";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle("Dashboard | Expense Tracker");
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
        <TotalExpenses />
        <TotalTransactions />
        <HighestCategory />
      </div>
      <div className="min-h-screen flex-1 md:min-h-min flex flex-col lg:flex-row gap-4 ">
        <SpendingCategory />
        <RecentTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
