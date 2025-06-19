"use client";
import React from "react";
import { ChevronDown, ChevronsLeft, SquarePen } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IUserItemProps {
  closeSidebar: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const UserItem = ({ closeSidebar }: IUserItemProps) => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="relative flex flex-col justify-center mt-3 cursor-pointer p-1 rounded-sm hover:bg-primary/5"
        >
          <div
            onClick={(event) => closeSidebar(event)}
            role="button"
            className="h-6 w-6 hover:bg-hover rounded-sm opacity-0 group-hover/sidebar:opacity-100 text-gray-500 absolute top-1/2 right-7 -translate-y-1/2 transition "
          >
            <ChevronsLeft />
          </div>

          <div className="flex items-center gap-x-3 overflow-hidden ">
            <div className="shrink-0">
              <Avatar>
                <AvatarImage
                  className="h-6 w-6 rounded-md"
                  src={user?.imageUrl}
                  alt="avatar"
                />
                <AvatarFallback>
                  <div className="h-6 w-6 flex items-center justify-center overflow-hidden bg-gray-200 rounded-md text-black text-xs">
                    {user?.lastName?.[0]?.toUpperCase() || "N"}
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>

            <h2 className="flex-1 truncate whitespace-nowrap overflow-hidden text-sm font-medium">
              {user?.fullName}&apos;s Workspace
            </h2>
            <div className="pr-3">
              <ChevronDown size={15} />
            </div>

            <div className="shrink-0 h-6 w-6 flex items-center justify-center">
              <SquarePen size={20} />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[300px]  bg-secondary border border-gray-50/5"
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            <p>{user?.emailAddresses[0].emailAddress}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <Avatar>
              <AvatarImage
                className="h-8 w-8 rounded-md"
                src={user?.imageUrl}
                alt="avatar"
              />
              <AvatarFallback>
                <div className="h-6 w-6 flex items-center justify-center overflow-hidden bg-gray-200 rounded-md text-black text-xl">
                  {user?.lastName?.[0]?.toUpperCase() || "N"}
                </div>
              </AvatarFallback>
            </Avatar>
            <h2 className="flex-1 truncate whitespace-nowrap overflow-hidden text-sm font-medium">
              {user?.fullName}&apos;s Workspace
            </h2>
          </div>
          <DropdownMenuSeparator className="bg-gray-300/5 h-[1px]" />
        </div>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-xs font-medium text-muted-foreground hover:bg-primary/5"
        >
          <SignOutButton redirectUrl="/">Sign Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
