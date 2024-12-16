"use client";

import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper functions for date handling
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const EventChip = ({ time, variant = "default", title = "Event" }) => {
  const variantStyles = {
    default: "bg-gray-100",
    purple: "bg-purple-100",
    blue: "bg-blue-100",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`text-xs px-2 py-1 rounded-md ${variantStyles[variant]} mb-1 last:mb-0 cursor-default`}
          >
            {time}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white rounded-lg border-none">
          <p>
            {time} - {title}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CalendarDay = ({
  day,
  isCurrentMonth = true,
  events = [],
  isToday = false,
}) => (
  <div className="h-[120px] p-1">
    <div className="flex justify-center mb-1">
      {isToday ? (
        <span className="h-7 w-7 bg-teal-700 text-white rounded-full flex items-center justify-center text-sm">
          {day}
        </span>
      ) : (
        <span
          className={`text-sm h-7 w-7 justify-center hover:bg-gray-200 rounded-full flex items-center ${
            !isCurrentMonth ? "text-gray-400" : ""
          }`}
        >
          {day}
        </span>
      )}
    </div>
    <div className="space-y-1">
      {events.slice(0, 2).map((event, idx) => (
        <EventChip
          key={idx}
          time={event.time}
          variant={event.variant}
          title={event.title}
        />
      ))}
      {events.length > 2 && (
        <div className="text-xs text-gray-500 font-semibold text-center">
          {events.length - 2} more
        </div>
      )}
    </div>
  </div>
);

const propertyEvents = [
  { time: "9:00am", variant: "default", title: "Building Inspection" },
  { time: "10:30am", variant: "purple", title: "Board Meeting" },
  { time: "11:15am", variant: "default", title: "Maintenance Review" },
  { time: "1:30pm", variant: "blue", title: "Move-in: Unit 1204" },
  { time: "2:00pm", variant: "purple", title: "AGM Meeting" },
  { time: "3:30pm", variant: "default", title: "Contractor Meeting" },
  { time: "4:00pm", variant: "blue", title: "Fire Safety Inspection" },
  { time: "5:45pm", variant: "purple", title: "Resident Committee Meeting" },
  { time: "7:00pm", variant: "default", title: "Security Staff Briefing" },
  { time: "9:30am", variant: "blue", title: "Pool Maintenance" },
  { time: "11:45am", variant: "default", title: "Elevator Service" },
  { time: "2:30pm", variant: "purple", title: "Owner Meeting" },
];

export default function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Calculate calendar grid
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

  // Calculate total days needed to display the month (only complete weeks)
  const totalDays = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

  return (
    <div className="rounded-xl shadow-none">
      <Card className="pt-2 pb-3 px-3 rounded-xl w-auto shadow-none">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="h-5 w-5 text-black" />
          <h2 className="text-[14px] font-semibold">Events</h2>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-left">
          {formatDate(today)}
        </h1>

        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-sm font-medium text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {[...Array(totalDays)].map((_, idx) => {
            let day;
            let isCurrentMonth = true;

            if (idx < firstDayOfMonth) {
              day = daysInPrevMonth - firstDayOfMonth + idx + 1;
              isCurrentMonth = false;
            } else if (idx >= firstDayOfMonth + daysInMonth) {
              day = idx - (firstDayOfMonth + daysInMonth) + 1;
              isCurrentMonth = false;
            } else {
              day = idx - firstDayOfMonth + 1;
            }

            const isToday = isCurrentMonth && day === currentDay;

            // Randomly select 2-4 events for each day
            const numEvents = Math.floor(Math.random() * 3) + 2;
            const shuffled = [...propertyEvents].sort(
              () => 0.5 - Math.random()
            );
            const dayEvents = shuffled.slice(0, numEvents);

            return (
              <div
                key={idx}
                className="min-h-[120px] hover:bg-gray-100 rounded-sm cursor-pointer"
              >
                <CalendarDay
                  day={day}
                  isCurrentMonth={isCurrentMonth}
                  events={isCurrentMonth ? dayEvents : []}
                  isToday={isToday}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 text-xs rounded-full inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            All Time
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs rounded-full bg-gray-100 hover:bg-gray-200"
          >
            View all →
          </Button>
        </div>
      </Card>
    </div>
  );
}
