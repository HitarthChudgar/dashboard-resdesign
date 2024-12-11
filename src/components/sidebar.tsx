"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  HelpCircle,
  Home,
  Library,
  PanelLeftClose,
  Settings,
  Users2,
  BadgeDollarSign,
  BarChart3,
  CheckSquare,
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
import { WorkspaceSwitcher } from "./workspace-switcher";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Community",
    icon: Users2,
    items: [
      { title: "Announcements", href: "/community/announcements" },
      { title: "Discussions", href: "/community/discussions" },
      { title: "Classified", href: "/community/classified" },
      { title: "Surveys", href: "/community/surveys" },
      { title: "Voting", href: "/community/voting" },
      { title: "Store", href: "/community/store" },
      { title: "Directory", href: "/community/directory" },
    ],
  },
  {
    title: "Accounting",
    icon: BadgeDollarSign,
    items: [
      { title: "Unit Ledger", href: "/accounting/ledger" },
      { title: "Invoices", href: "/accounting/invoices" },
      { title: "Expenses", href: "/accounting/expenses" },
      { title: "Transactions", href: "/accounting/transactions" },
      { title: "Statements", href: "/accounting/statements" },
    ],
  },
  {
    title: "Library",
    href: "/library",
    icon: Library,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
  },
];

export function Navigation() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Dashboard");
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
                        setExpandedItems((prev) =>
                          item.items
                            ? prev.includes(item.title)
                              ? prev.filter((i) => i !== item.title)
                              : [...prev, item.title]
                            : prev
                        );
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
                <button className="flex items-center gap-3 rounded-xl p-3 text-gray-900 transition-colors hover:bg-[#0F0F0F]/[0.08] w-full h-11">
                  <HelpCircle className="h-5 w-5" />
                  {!isCollapsed && <span className="text-[15px]">Help</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="bg-black text-white rounded-lg border-none"
                >
                  Help
                </TooltipContent>
              )}
            </Tooltip>
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
