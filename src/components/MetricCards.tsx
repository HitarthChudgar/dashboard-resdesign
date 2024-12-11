import {
  MegaphoneIcon,
  WrenchIcon,
  FileWarningIcon,
  Users2Icon,
  CalendarIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

// Custom button component for consistent styling
const MetricButton = ({ children, className = "" }) => (
  <button
    className={`h-7 px-3 inline-flex items-center gap-1.5 text-xs text-gray-950 font-medium
      bg-gray-100 hover:bg-gray-200 active:bg-gray-300
      rounded-full transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

export default function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Current Announcements */}
      <Card className="p-0 shadow-none rounded-xl">
        <div className="flex items-center gap-2 py-2 px-3">
          <MegaphoneIcon className="h-5 w-5 text-black" />
          <span className="text-[14px] font-medium text-black">
            Current announcements
          </span>
        </div>
        <div className="text-2xl font-medium px-3 py-2 text-left">5</div>
        <div className="flex items-center justify-between p-3">
          <MetricButton>
            <CalendarIcon className="h-3.5 w-3.5" />
            This month
          </MetricButton>
          <MetricButton>View all→</MetricButton>
        </div>
      </Card>

      {/* Open Service Requests */}
      <Card className="p-0 shadow-none rounded-xl">
        <div className="flex items-center gap-2 py-2 px-3">
          <WrenchIcon className="h-5 w-5 text-black" />
          <span className="text-[14px] font-medium text-black">
            Open service requests
          </span>
        </div>
        <div className="text-2xl font-medium px-3 py-2 text-left">28</div>
        <div className="flex items-center justify-between p-3">
          <MetricButton>
            <CalendarIcon className="h-3.5 w-3.5" />
            Today
          </MetricButton>
          <MetricButton>View all→</MetricButton>
        </div>
      </Card>

      {/* Violations Past Due */}
      <Card className="p-0 shadow-none rounded-xl">
        <div className="flex items-center gap-2 py-2 px-3">
          <FileWarningIcon className="h-5 w-5 text-black" />
          <span className="text-[14px] font-medium text-black">
            Violations past due
          </span>
        </div>
        <div className="text-2xl font-medium px-3 py-2 text-left">46</div>
        <div className="flex items-center justify-between p-3">
          <MetricButton>
            <CalendarIcon className="h-3.5 w-3.5" />
            Today
          </MetricButton>
          <MetricButton>View all→</MetricButton>
        </div>
      </Card>

      {/* User Logins */}
      <Card className="p-0 shadow-none rounded-xl">
        <div className="flex items-center gap-2 py-2 px-3">
          <Users2Icon className="h-5 w-5 text-black" />
          <span className="text-[14px] font-medium text-black">
            User logins
          </span>
        </div>
        <div className="text-2xl font-medium px-3 py-2 text-left">23</div>
        <div className="flex items-center justify-between p-3">
          <MetricButton>
            <CalendarIcon className="h-3.5 w-3.5" />
            Today
          </MetricButton>
          <MetricButton>View all→</MetricButton>
        </div>
      </Card>
    </div>
  );
}
