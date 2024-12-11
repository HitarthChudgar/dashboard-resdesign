import * as React from "react";
import { Input } from "./ui/input";
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredTeams, setFilteredTeams] = React.useState(teams);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  // Update filtered teams based on search term
  React.useEffect(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  // Sort teams alphabetically
  const handleSort = () => {
    const sortedTeams = [...filteredTeams].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredTeams(sortedTeams);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="w-6 h-6" />
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="line-clamp-2 font-semibold whitespace-normal">
                  {activeTeam.name}
                </span>
              </div>
              <ChevronsUpDown className="w-5 h-5 ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-xl p-2"
            align="start"
            side={isMobile ? "bottom" : "bottom"}
            sideOffset={4}
          >
            {/* Search and Sort Section */}
            <div className="flex items-center gap-2 mb-2">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search Workspace"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl h-10 pl-10 pr-3"
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

            {/* Menu Items */}
            <div
              className="space-y-1 max-h-56 overflow-y-auto group"
              style={{
                maxHeight: "14rem",
                overflowY: "auto",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.scrollbarWidth = "thin"; // For Firefox
                target.style.setProperty("--webkit-scrollbar-width", "4px"); // For WebKit
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
                target.style.scrollbarWidth = "none"; // For Firefox
                target.style.setProperty("--webkit-scrollbar-width", "0"); // For WebKit
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.setProperty(
                  "--webkit-scrollbar-thumb-color",
                  "#718096"
                ); // Darker on click
              }}
            >
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => {
                  const isActive = activeTeam.name === team.name;

                  return (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className={`gap-2 p-2 rounded-xl flex items-center cursor-pointer ${
                        isActive ? "bg-[#0f0f0f0a]" : ""
                      }`}
                    >
                      <div className="flex w-10 h-10 items-center justify-center rounded-xl border">
                        <team.logo className="w-6 h-6 shrink-0" />
                      </div>
                      <span className="flex-1 line-clamp-2 font-medium whitespace-normal">
                        {team.name}
                      </span>
                      {isActive && (
                        <div className="text-sidebar-primary-foreground">
                          <Check className="w-5 h-5 text-[#0f0f0f]" />
                        </div>
                      )}
                    </DropdownMenuItem>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-2 text-sm">
                  No available workspaces found
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
