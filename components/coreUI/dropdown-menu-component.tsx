import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContentItemProps {
  icon: React.ReactNode;
  title: string;
  shortcut?: string;
  hover?: "danger" | string;
  onClick?: () => void;
}
interface DropdownMenuComponentProps {
  label?: string;
  width?: number;
  children?: React.ReactNode;
  contentItems: ContentItemProps[];
}
const DropdownMenuComponent = ({
  label,
  children,
  width,
  contentItems,
}: DropdownMenuComponentProps) => {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      (child.type === DropdownMenuTrigger ||
        child.type?.toString().includes("DropdownMenuTrigger"))
  );

  const content = childrenArray.filter(
    (child) =>
      !(
        React.isValidElement(child) &&
        (child.type === DropdownMenuTrigger ||
          child.type?.toString().includes("DropdownMenuTrigger"))
      )
  );
  return (
    <DropdownMenu>
      {trigger}
      <DropdownMenuContent
        style={{ width: width ? width : "auto" }}
        className={cn("bg-secondary border border-gray-50/5")}
      >
        <h3 className="text-xs font-semibold text-muted-foreground px-2 py-1">
          {label}
        </h3>
        <DropdownMenuSeparator className="bg-gray-300/5 h-[1px]" />

        {contentItems.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            className={cn(
              "flex justify-between items-center w-full gap-x-4 text-muted-foreground font-medium hover:btn-hover-effect ",
              item.hover === "danger" && "hover:!text-red-400"
            )}
            onClick={item.onClick}
          >
            <div className={cn("flex items-center gap-x-2")}>
              <div>{item.icon}</div>
              <div>{item.title}</div>
            </div>
            <span className="text-xs text-gray-500">{item.shortcut}</span>
          </DropdownMenuItem>
        ))}
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
