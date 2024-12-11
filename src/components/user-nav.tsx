"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserCircle,
  Mail,
  KeyRound,
  CreditCard,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-[6px] rounded-lg w-12 h-12 hover:bg-gray-200"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback>HC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-xl p-2"
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 rounded-lg">
            <UserCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Setup</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-lg">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">Email Preferences</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-lg">
            <KeyRound className="h-4 w-4" />
            <span className="text-sm font-medium">Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-lg">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">Billing Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-lg">
            <FileSpreadsheet className="h-4 w-4" />
            <span className="text-sm font-medium">Community Data Sheet</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 rounded-lg">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
