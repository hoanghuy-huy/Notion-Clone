import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownMenuItemComponentProps {
  title: string;
  icon?: React.ReactNode;
  shortcut?: string;
  hover?: string;
  onClick?: () => void;
  idx?: number;
}
const DropdownMenuItemComponent = ({
  title,
  icon,
  shortcut,
  hover,
  onClick,
  idx,
  ...props
}: DropdownMenuItemComponentProps) => {
  return (
    <DropdownMenuItem
      {...props}
      key={idx}
      className={cn(
        "flex justify-between items-center w-full gap-x-4 text-muted-foreground font-medium hover:btn-hover-effect ",
        hover === "danger" && "hover:!text-red-400"
      )}
      onClick={onClick}
    >
      <div className={cn("flex items-center gap-x-2")}>
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <span className="text-xs text-gray-500">{shortcut}</span>
    </DropdownMenuItem>
  );
};

export default DropdownMenuItemComponent;
