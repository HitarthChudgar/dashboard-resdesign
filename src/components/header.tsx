import { Lightbulb, Search, Phone, Barcode, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "./user-nav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="flex h-auto items-center gap-4 p-4">
      <div className="relative flex-1 max-w-md">
        <Input
          type="search"
          placeholder="Quick Search"
          className="w-full rounded-xl h-10 pl-10 pr-2"
        />
        <Search className="absolute top-1/2 left-3 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-40">
          <Input
            type="search"
            placeholder="Barcode lookup"
            className="rounded-xl h-10 pl-10 pr-2"
          />
          <Barcode className="absolute top-1/2 left-3 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-gray-200"
              >
                <Lightbulb className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white rounded-lg border-none">
              <p>Condo Control Feedback Forum</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-gray-200"
              >
                <UsersRound className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white rounded-lg border-none">
              <p>Condo Control Community Forum</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 hover:bg-gray-200"
            >
              <Phone className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white rounded-lg border-none">
            <p>Call / Contact Us</p>
          </TooltipContent>
        </Tooltip>
        <UserNav />
      </div>
    </header>
  );
}
