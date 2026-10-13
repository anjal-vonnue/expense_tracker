import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { CirclePlus, HandCoins, LayoutDashboard, User2 } from "lucide-react";

import { Link } from "react-router";

const AppSidebar = () => {
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                to="/profile"
                className="flex w-full items-center gap-2 px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <User2 />
                <span>Username</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
