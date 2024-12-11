"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  ChevronsUpDown,
  Check,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teams = [
  {
    name: "Nobu Toronto",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Malibu",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu New York",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu London",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Tokyo",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Las Vegas",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Miami",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Hospitality Group International",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Hotel and Restaurant Expansion Project",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
  {
    name: "Nobu Global Marketing and Brand Management",
    logo: () => <span className="text-[#C4A962] font-semibold">N</span>,
  },
];

export function WorkspaceSwitcher() {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredTeams, setFilteredTeams] = React.useState(teams);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  React.useEffect(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm]);

  const handleSort = () => {
    const sortedTeams = [...filteredTeams].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredTeams(sortedTeams);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl p-2 text-left text-sm font-medium w-full hover:bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/[0.12] transition-colors group">
          <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-black text-[#C4A962]">
            <activeTeam.logo />
          </div>
          <span className="font-semibold truncate flex-1 group-hover:text-gray-900">
            {activeTeam.name}
          </span>
          <ChevronsUpDown className="w-4 h-4 ml-auto text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-xl p-2"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search Workspace"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl h-10 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="absolute top-1/2 left-3 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={handleSort}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f3f3f3] hover:bg-[#eaeaea] cursor-pointer"
            aria-label="Sort Alphabetically"
          >
            {sortOrder === "asc" ? (
              <ArrowUpNarrowWide className="w-5 h-5 text-[#0f0f0f]" />
            ) : (
              <ArrowDownWideNarrow className="w-5 h-5 text-[#0f0f0f]" />
            )}
          </button>
        </div>
        <div
          className="space-y-1 max-h-56 overflow-y-auto group"
          style={{
            maxHeight: "14rem",
            overflowY: "auto",
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.scrollbarWidth = "thin";
            target.style.setProperty("--webkit-scrollbar-width", "4px");
            target.style.setProperty(
              "--webkit-scrollbar-thumb-color",
              "#a0aec0"
            );
            target.style.setProperty(
              "--webkit-scrollbar-track-color",
              "transparent"
            );
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.scrollbarWidth = "none";
            target.style.setProperty("--webkit-scrollbar-width", "0");
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.setProperty(
              "--webkit-scrollbar-thumb-color",
              "#718096"
            );
          }}
        >
          {filteredTeams.length > 0 ? (
            <>
              <DropdownMenuItem
                key={activeTeam.name}
                className="gap-2 p-2 rounded-xl flex items-center cursor-pointer bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
              >
                <div className="flex w-10 h-10 items-center justify-center rounded-xl bg-black text-[#C4A962]">
                  <activeTeam.logo />
                </div>
                <span className="flex-1 truncate font-medium">
                  {activeTeam.name}
                </span>
                <Check className="w-4 h-4 text-[#307175]" />
              </DropdownMenuItem>
              {filteredTeams
                .filter((team) => team.name !== activeTeam.name)
                .map((team) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2 rounded-xl flex items-center cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                  >
                    <div className="flex w-10 h-10 items-center justify-center rounded-xl bg-black text-[#C4A962]">
                      <team.logo />
                    </div>
                    <span className="flex-1 line-clamp-2 font-medium">
                      {team.name}
                    </span>
                  </DropdownMenuItem>
                ))}
            </>
          ) : (
            <div className="text-center text-gray-500 py-2 text-sm">
              No available workspaces found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
