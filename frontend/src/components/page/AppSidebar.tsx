import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useExpense } from "@/context/ExpenseContext";

import {
  CirclePlus,
  HandCoins,
  LayoutDashboard,
  LogOut,
  User2,
} from "lucide-react";

import { Link } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const AppSidebar = () => {
  const { user, logout } = useExpense();

  const handleSumbit = () => {
    logout();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="font-bold text-2xl">
          ExpenseTracker
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/"
              className="flex w-full items-center gap-2 px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LayoutDashboard className="size-4" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link
              to="/expenses"
              className="flex w-full items-center gap-2 px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <HandCoins className="size-4" />
              <span>Expenses</span>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link
              to="/new"
              className="flex w-full items-center gap-2 px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CirclePlus className="size-4" />
              <span>Add Expenses</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="flex flex-col justify-center">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                to="/profile"
                className="flex w-full justify-center items-center gap-2 px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <User2 />
                <span>{user?.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {user?.name && (
            <SidebarMenuItem>
              <AlertDialogTrigger>
                <Button variant="destructive" className="w-full">
                  Logout
                </Button>
                <AlertDialog size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                      <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={handleSumbit}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialog>
              </AlertDialogTrigger>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
