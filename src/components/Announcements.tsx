"use client";

import { Megaphone, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AnnouncementItem = ({ title, date, description, id }) => {
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
              View announcement
            </Button>
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export default function Announcements() {
  const announcements = [
    {
      id: "1",
      title: "Heating & Cooling",
      date: "May 31, 2024 11:17 AM",
      description:
        "It's that time of the year when we say goodbye to the warmer weather and get ready for the cold. Please note that the cooling in the building will be shut off March 15th. The heat will be operational as of March 17th, so please change your thermostats to the heating mode on this date. If you have any questions or concerns regarding the above, please contact building management.",
    },
    {
      id: "2",
      title: "Construction Noise",
      date: "May 14, 2024 11:16 AM",
      description:
        "Please be advised that there will be construction work taking place on floors 3-5 between May 16th and May 20th. Work will be conducted between 9:00 AM and 4:00 PM. We apologize for any inconvenience this may cause and appreciate your patience during these necessary improvements.",
    },
    {
      id: "3",
      title: "Fire Alarm Testing",
      date: "April 28, 2024 11:15 AM",
      description:
        "Annual fire alarm testing will be conducted on May 1st between 10:00 AM and 2:00 PM. During this time, you may hear fire alarms sounding throughout the building. No evacuation is necessary during the testing. Building staff will be present on all floors during the testing period.",
    },
    {
      id: "4",
      title: "April elevator repair",
      date: "April 16, 2024 8:09 AM", // Updated to match the context of the announcement
      description:
        "The east elevator will undergo scheduled maintenance during the month of August. Work is scheduled to begin August 1st and will continue for approximately two weeks. The west elevator will remain operational during this time. We apologize for any inconvenience this may cause.",
    },
    {
      id: "5",
      title: "Text",
      date: "April 7, 2024 3:47 PM",
      description:
        "Important update regarding the building's text message alert system. All residents are encouraged to register their mobile numbers with the front desk to receive important building notifications and emergency alerts. Please ensure your contact information is up to date.",
    },
  ];

  return (
    <Card className="p-0 shadow-none rounded-xl h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 py-2 px-3">
        <Megaphone className="h-5 w-5 text-black" />
        <span className="text-[14px] font-medium text-black">
          Recent Announcements
        </span>
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
        {announcements.map((announcement) => (
          <AnnouncementItem
            key={announcement.id}
            id={announcement.id}
            title={announcement.title}
            date={announcement.date}
            description={announcement.description}
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
        <div className="flex items-center gap-1 text-sm">
          <span>View all</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}
