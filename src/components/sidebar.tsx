"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  MessageSquare,
  FileText,
  Shield,
  BadgeDollarSign,
  BookOpen,
  PanelLeftClose,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "My Account",
    icon: User,
    items: [
      { title: "Email Preferences", href: "/account/email" },
      { title: "Package Preferences", href: "/account/packages" },
      { title: "Change Password", href: "/account/password" },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    items: [
      { title: "Announcements", href: "/communication/announcements" },
      { title: "Classified Ads", href: "/communication/classified" },
      { title: "Discussion Forum", href: "/communication/forum" },
      { title: "Events", href: "/communication/events" },
      { title: "File Library", href: "/communication/library" },
      { title: "Phone Book", href: "/communication/phonebook" },
      { title: "Print Jobs", href: "/communication/print" },
      { title: "Service Request", href: "/communication/service" },
      { title: "Survey", href: "/communication/survey" },
    ],
  },
  {
    title: "Record Keeping",
    icon: FileText,
    items: [
      { title: "Amenity Booking", href: "/records/amenity" },
      { title: "Asset Management", href: "/records/assets" },
      { title: "Electronic Voting", href: "/records/voting" },
      { title: "Maintenance Tracking", href: "/records/maintenance" },
      { title: "Make a Payment", href: "/records/payment" },
      { title: "Reports", href: "/records/reports" },
      { title: "Status Certificate", href: "/records/certificate" },
      { title: "Store", href: "/records/store" },
      { title: "Tasks", href: "/records/tasks" },
      { title: "Unit File", href: "/records/unit" },
      { title: "Violation Tracking", href: "/records/violations" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { title: "Security & Concierge", href: "/security/concierge" },
      { title: "Security Patrol", href: "/security/patrol" },
      { title: "Packages", href: "/security/packages" },
      { title: "Valet Parking", href: "/security/valet" },
      { title: "Visitors", href: "/security/visitors" },
    ],
  },
  {
    title: "Accounting",
    icon: BadgeDollarSign,
    items: [
      { title: "Accounts Payable", href: "/accounting/payable" },
      { title: "Unit Ledger", href: "/accounting/ledger" },
      { title: "Purchase Order", href: "/accounting/purchase" },
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    items: [
      { title: "Training", href: "/resources/training" },
      { title: "User Guide", href: "/resources/guide" },
    ],
  },
];

export function Navigation() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Home");
  const [activeSubItem, setActiveSubItem] = React.useState("");
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative flex flex-col h-screen bg-[#F3F3F3] transition-all duration-300",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <div className="flex items-center h-[72px] px-4">
          {!isCollapsed ? (
            <WorkspaceSwitcher />
          ) : (
            <div className="bg-black rounded-xl w-[42px] h-[42px] flex items-center justify-center mx-auto">
              <span className="text-[#C4A962] font-semibold">N</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <nav className="grid gap-2 pb-20">
            {navItems.map((item, index) => {
              if (item.title === "My Account") {
                return (
                  <DropdownMenu key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={cn(
                              "flex justify-between items-center gap-3 rounded-xl p-3 text-gray-900 transition-colors w-full h-11",
                              isCollapsed && "justify-center",
                              activeItem === item.title
                                ? "bg-white border border-gray-200"
                                : "hover:bg-[#0F0F0F]/[0.08] active:bg-[#0F0F0F]/[0.12]"
                            )}
                          >
                            <div className="flex items-center gap-3 justify-between">
                              <item.icon className="h-5 w-5 flex-shrink-0" />
                              {!isCollapsed && (
                                <span className="text-[15px]">
                                  {item.title}
                                </span>
                              )}
                            </div>
                            {!isCollapsed && (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-black text-white rounded-lg border-none"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                    <DropdownMenuContent
                      align="start"
                      side="right"
                      className="w-64 rounded-xl p-2"
                      forceMount
                    >
                      {item.items?.map((subItem, subIndex) => (
                        <DropdownMenuItem
                          key={subIndex}
                          className="flex items-center justify-between p-2 rounded-lg cursor-pointer"
                        >
                          <span className="text-sm font-medium">
                            {subItem.title}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              if (item.items) {
                const isActive = activeItem === item.title;
                return (
                  <Collapsible
                    key={index}
                    open={expandedItems.includes(item.title)}
                    onOpenChange={() => toggleExpanded(item.title)}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger
                          className={cn(
                            "flex w-full items-center justify-between gap-3 p-3 text-gray-900 transition-colors rounded-xl",
                            !isActive && "hover:bg-[#0F0F0F]/[0.08]"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            {!isCollapsed && (
                              <span className="text-[15px]">{item.title}</span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                expandedItems.includes(item.title) &&
                                  "rotate-180"
                              )}
                            />
                          )}
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-black text-white rounded-lg border-none"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <div className="relative pl-11 grid gap-1">
                          <div className="absolute left-[25px] top-0 bottom-0 w-px bg-[#D2D2D2]" />
                          {item.items.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              className={cn(
                                "relative py-2 text-[15px] hover:bg-[#0F0F0F]/[0.08] px-3 text-left w-full transition-colors rounded-xl",
                                activeSubItem === subItem.title
                                  ? "text-[#307175] bg-white border border-gray-200"
                                  : "active:bg-[#0F0F0F]/[0.12]"
                              )}
                              onClick={() => {
                                setActiveItem(item.title);
                                setActiveSubItem(subItem.title);
                                setExpandedItems((prev) => [
                                  ...new Set([...prev, item.title]),
                                ]);
                              }}
                            >
                              {activeSubItem === subItem.title && (
                                <div className="absolute left-[-20px] top-0 bottom-0 w-1 bg-[#307175]" />
                              )}
                              {subItem.title}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                );
              }
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-3 text-gray-900 transition-colors w-full h-11",
                        isCollapsed && "justify-center",
                        activeItem === item.title
                          ? "bg-white border border-gray-200"
                          : "hover:bg-[#0F0F0F]/[0.08] active:bg-[#0F0F0F]/[0.12]"
                      )}
                      onClick={() => {
                        setActiveItem(item.title);
                        setActiveSubItem("");
                      }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-[15px]">{item.title}</span>
                      )}
                    </button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent
                      side="right"
                      className="bg-black text-white rounded-lg border-none"
                    >
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </div>
        <div
          className="absolute bottom-[72px] left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(243, 243, 243, 0) 0%, #F3F3F3 100%)",
            zIndex: 10,
          }}
        />
        <div className="border-t border-gray-200 p-4 bg-[#F3F3F3] relative z-20">
          <nav className="grid gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-gray-900 transition-colors hover:bg-[#0F0F0F]/[0.08] justify-start h-11"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <PanelLeftClose
                    className={cn(
                      "h-5 w-5 transition-transform",
                      isCollapsed && "rotate-180"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="text-[15px]">Collapse</span>
                  )}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="bg-black text-white rounded-lg border-none"
                >
                  Expand
                </TooltipContent>
              )}
            </Tooltip>
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
