"use client";

import { ClipboardList, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const TaskItem = ({ title, date, description, id }) => {
  return (
    <AccordionItem
      value={id}
      className="rounded-xl border-gray-200 border-[1px] hover:bg-gray-100"
    >
      <AccordionTrigger className="flex gap-2 items-center px-3 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-[16px] font-semibold text-left">{title}</h3>
            <p className="text-[14px] font-normal text-gray-500 leading-none whitespace-nowrap">
              {date}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      {description && (
        <AccordionContent className="px-3 pt-2 pb-3">
          <p className="text-[16px] text-gray-700 mb-3 text-left">
            {description}
          </p>
          <div className="flex justify-end">
            <Button className="bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl px-4 py-2">
              View task
            </Button>
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export default function RecentTasks() {
  const tasks = [
    {
      id: "1",
      title: "Meeting Preparation",
      date: "October 7, 2024 9:00 AM",
      description:
        "Prepare agenda and materials for the upcoming board meeting. Include Q3 financial reports, maintenance updates, and new security protocols for review.",
    },
    {
      id: "2",
      title: "Budget Review",
      date: "October 6, 2024 3:30 PM",
      description:
        "Review and analyze Q3 budget performance. Compare actual expenses against projections and prepare variance report for department heads.",
    },
    {
      id: "3",
      title: "Vendor Coordination",
      date: "October 5, 2024 11:00 AM",
      description:
        "Coordinate with maintenance vendors for quarterly service schedules. Update vendor contact information and review service agreements.",
    },
    {
      id: "4",
      title: "Newsletter Draft",
      date: "October 4, 2024 1:45 PM",
      description:
        "Create monthly community newsletter draft. Include updates on ongoing projects, upcoming events, and important announcements for residents.",
    },
    {
      id: "5",
      title: "Elevator Inspection",
      date: "October 2, 2024 10:15 AM",
      description:
        "Conduct routine inspection of building facilities including common areas, mechanical rooms, and safety equipment. Document findings and create maintenance tickets as needed.",
    },
  ];

  return (
    <Card className="p-0 shadow-none rounded-xl h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 py-2 px-3">
        <ClipboardList className="h-5 w-5 text-black" />
        <span className="text-[14px] font-medium text-black">Recent Tasks</span>
      </div>

      {/* Count */}
      <div className="text-2xl font-medium px-3 py-2 text-left">5</div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="1"
        className="px-3 flex flex-col gap-2"
      >
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            date={task.date}
            description={task.description}
          />
        ))}
      </Accordion>

      {/* Footer */}
      <div className="flex items-center justify-between p-3">
        <Button
          variant="secondary"
          size="sm"
          className="h-7 text-xs rounded-full inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200"
        >
          <Calendar className="h-3.5 w-3.5" />
          All Time
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs rounded-full inline-flex items-center bg-gray-100 hover:bg-gray-200"
        >
          View all →
        </Button>
      </div>
    </Card>
  );
}
