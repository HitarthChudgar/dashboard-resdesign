"use client";

import { WrenchIcon, CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const ServiceRequestItem = ({ title, date, description, id }) => {
  return (
    <AccordionItem
      value={id}
      className="rounded-xl border-gray-200 border-[1px] hover:bg-gray-100"
    >
      <AccordionTrigger className="flex gap-2 items-center px-3 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-[16px] font-semibold text-left">{title}</h3>
            <p className="text-[14px] font-normal text-gray-500">{date}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 pt-2 pb-3">
        <p className="text-[16px] text-gray-700 mb-3 text-left">
          {description}
        </p>
        <div className="flex justify-end">
          <Button className="bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl px-3 py-2 font-[14px]">
            View service request
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function ServiceRequest() {
  const serviceRequests = [
    {
      id: "1",
      title: "Broken Streetlight",
      date: "October 7, 2024 10:30 AM",
      description: "Streetlight on Maple Avenue is not working.",
    },
    {
      id: "2",
      title: "Landscaping Request",
      date: "October 6, 2024 2:15 PM",
      description: "Need landscaping service for the front garden.",
    },
    {
      id: "3",
      title: "Pool Maintenance",
      date: "October 5, 2024 9:00 AM",
      description: "Regular pool maintenance required.",
    },
    {
      id: "4",
      title: "Elevator Repair",
      date: "October 4, 2024 9:00 AM",
      description: "Elevator needs maintenance.",
    },
    {
      id: "5",
      title: "Noise Complaint",
      date: "October 4, 2024 11:45 PM",
      description: "Noise complaint from unit 304.",
    },
  ];

  return (
    <Card className="p-0 shadow-none rounded-xl h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 py-2 px-3">
        <WrenchIcon className="h-5 w-5 text-black" />
        <span className="text-[14px] font-medium text-black">
          Open Service Requests
        </span>
      </div>

      {/* Count */}
      <div className="text-2xl font-medium px-3 py-2 text-left">5</div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="px-3 flex flex-col gap-2">
        {serviceRequests.map((request) => (
          <ServiceRequestItem
            key={request.id}
            id={request.id}
            title={request.title}
            date={request.date}
            description={request.description}
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
          <CalendarIcon className="h-3.5 w-3.5" />
          Today
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
  );
}
