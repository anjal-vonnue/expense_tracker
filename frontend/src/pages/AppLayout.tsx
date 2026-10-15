import AppSidebar from "@/components/page/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useExpenseRange } from "@/context/ExpenseRangeContext";

import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-aria-components";

import { Outlet, useLocation } from "react-router";

const AppLayout = () => {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), today.getMonth() + 1, 1),
    end: new CalendarDate(
      new Date().getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ),
  });

  const location = useLocation();
  const { setDateRange } = useExpenseRange();

  useEffect(() => {
    if (!date?.start || !date?.end) return;

    setDateRange([date.start.toString(), date.end.toString()]);
  }, [date, setDateRange]);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 ">
          <div className="flex items-center h-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="block">
                  <BreadcrumbLink href="#">Track Your Expenses</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="">
            {location.pathname === "/" ? (
              <Field className="mx-auto w-fit">
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal"
                  >
                    <CalendarIcon data-icon="inline-start" />
                    {date?.start && date.end ? (
                      new Intl.DateTimeFormat(undefined, {
                        dateStyle: "long",
                      }).formatRange(
                        date.start.toDate(getLocalTimeZone()),
                        date.end.toDate(getLocalTimeZone()),
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                  <Popover className="w-auto p-0" placement="bottom start">
                    <RangeCalendar
                      value={date}
                      onChange={setDate}
                      numberOfMonths={2}
                    />
                  </Popover>
                </PopoverTrigger>
              </Field>
            ) : (
              ""
            )}
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </>
  );
};

export default AppLayout;
