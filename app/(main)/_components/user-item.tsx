"use client";
import React, { useEffect } from "react";
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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDocuments } from "@/hook/documents";
import { Enums } from "@/config";
interface IUserItemProps {
  closeSidebar: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const UserItem = ({ closeSidebar }: IUserItemProps) => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpenMenu = () => {
    triggerRef.current?.click();
  };

  const { onCreate } = useDocuments();

  return (
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
      <DropdownMenu>
        <div className="flex items-center gap-x-3 justify-between overflow-hidden ">
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-x-3 overflow-hidden ">
              <div className="shrink-0">
                <Avatar>
                  <AvatarImage
                    className="h-6 w-6 rounded-md select-none"
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

              <h2
                className="flex-1 truncate whitespace-nowrap overflow-hidden text-sm font-medium"
                onClick={handleOpenMenu}
              >
                {user?.fullName}&apos;s Workspace
              </h2>
              <div className="pr-3" onClick={handleOpenMenu}>
                <ChevronDown size={15} />
              </div>
            </div>
          </DropdownMenuTrigger>

          <div
            className="shrink-0 h-6 w-6 flex items-center justify-center"
            onClick={() => onCreate({})}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <SquarePen size={20} className="text-gray-400" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p> {Enums.documents.tooltipCreateNewFile}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
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
            className="w-full text-muted-foreground font-medium hover:btn-hover-effect"
          >
            <SignOutButton redirectUrl="/">Sign Out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserItem;
