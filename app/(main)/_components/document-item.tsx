"use client";

import { Enums } from "@/config";
import {
  ChevronDown,
  Copy,
  Ellipsis,
  FileText,
  Plus,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocuments } from "@/hook/documents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItemComponent,
  TooltipComponent,
} from "@/components/coreUI";
import { useUser } from "@clerk/nextjs";

interface IDocumentItemProps {
  id: Id<"documents">;
  label: string;
  active?: boolean;
  expanded: boolean;
  documentIcon?: React.ReactNode;
  level?: number;
  onClick: (id: Id<"documents">) => void;
  onExpand: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id?: Id<"documents"> | undefined
  ) => void;
}

interface ContentItem {
  icon: React.ReactNode;
  title: string;
  shortcut?: string;
  hover?: "danger" | string;
  onClick?: (() => void) | undefined;
}

const DocumentItem = ({
  id,
  label,
  active,
  expanded,
  documentIcon,
  level = 0,
  onClick,
  onExpand,
}: IDocumentItemProps) => {
  const { onCreate, onArchive, onDuplicate } = useDocuments();
  const { user } = useUser();

  const contentItems: ContentItem[] = [
    {
      icon: <Copy size={20} strokeWidth={1.5} />,
      title: "Duplicate",
      onClick: id
        ? () =>
            onDuplicate({
              id,
            })
        : undefined,
    },
    {
      icon: <SquarePen size={20} strokeWidth={1.5} />,
      title: "Rename",
    },
    {
      icon: <Trash2 size={20} strokeWidth={1.5} />,
      title: "Move to trash",
      hover: "danger",
      onClick: id ? () => onArchive({ id }) : undefined,
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center btn-hover-effect px-0.5 my-0.5 py-1 group/parent overflow-hidden",
        active && "bg-primary/5 text-primary"
      )}
      key={id}
      onClick={() => onClick(id)}
    >
      <div
        className={cn(
          "w-full flex items-center gap-x-1 min-h-6 overflow-hidden "
        )}
        style={{ paddingLeft: level ? level * 12 + 12 : 10 }}
      >
        <div className="btn-hover-effect group/children">
          {documentIcon ? (
            <div className="group-hover/children:hidden">{documentIcon}</div>
          ) : (
            <FileText
              strokeWidth={1.5}
              size={18}
              className="group-hover/children:hidden"
            />
          )}

          <div
            className="hidden group-hover/children:block"
            role="button"
            onClick={(event) =>
              onExpand(event as React.MouseEvent<HTMLElement, MouseEvent>, id)
            }
          >
            <ChevronDown
              strokeWidth={1.5}
              size={18}
              className={cn(
                "delay-150 transition-all ease-in-out",
                !expanded ? "-rotate-90" : "rotate-0"
              )}
            />
          </div>
        </div>
        <p className="truncate mr-1">{label}</p>
      </div>
      <div className="relative flex items-center flex-row-reverse gap-x-2 opacity-0 group-hover/parent:opacity-100 transition-opacity">
        <div className="flex items-center flex-row-reverse gap-x-2">
          <TooltipComponent message={Enums.documents.tooltipCreateNewFileInside}>
            <Plus
              strokeWidth={1.5}
              size={18}
              className="flex-shrink hover:icon-hover-effect text-muted-foreground"
              role="button"
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                onCreate({
                  parentDocument: id,
                  expanded: expanded,
                  onExpanded: (event) =>
                    onExpand(event as React.MouseEvent<HTMLElement, MouseEvent>, id),
                  event: e as unknown as React.MouseEvent<HTMLElement, MouseEvent>,
                })
              }
            />
          </TooltipComponent>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <TooltipComponent message={Enums.documents.tooltipMoreActions}>
                <Ellipsis
                  strokeWidth={1.5}
                  size={18}
                  className="flex-shrink hover:icon-hover-effect text-muted-foreground"
                />
              </TooltipComponent>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Page
              </DropdownMenuLabel>
              <DropdownMenuItemComponent
                icon={<Star size={20} />}
                title="Add to favorites"
              />
              <DropdownMenuSeparator className="bg-gray-300/5 h-[1px]" />
              {contentItems.map((item, idx) => (
                <DropdownMenuItemComponent
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  shortcut={item.shortcut}
                  hover={item.hover}
                  onClick={item.onClick}
                  idx={idx}
                />
              ))}
              <DropdownMenuSeparator className="bg-gray-300/5 h-[1px]" />
              <p className="text-xs text-muted-foreground font-medium p-2">
                Last edited by {user?.fullName}
              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

DocumentItem.Skeleton = function itemSkeleton({ level }: { level: number }) {
  return (
    <div
      style={{ paddingLeft: level ? level * 12 + 12 : 12 }}
      className="flex items-center gap-x-1"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default DocumentItem;
