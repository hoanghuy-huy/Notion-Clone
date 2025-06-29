import { Enums } from "@/config";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Ellipsis,
  FileText,
  LucideIcon,
  Plus,
  SquarePen,
  SquarePenIcon,
  Trash2,
} from "lucide-react";
import React from "react";
import { DropdownMenuComponent, TooltipComponent } from "@/components/coreUI";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocuments } from "@/hook/documents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { on } from "events";
interface IDocumentItemProps {
  id?: Id<"documents">;
  label: string;
  active?: boolean;
  expanded: boolean;
  isSearch?: boolean;
  documentIcon?: React.ReactNode;
  level?: number;
  onClick: () => void;
  onExpand: () => void;
}

const DocumentItem = ({
  id,
  label,
  active,
  expanded,
  isSearch,
  documentIcon,
  level = 0,
  onClick,
  onExpand,
}: IDocumentItemProps) => {
  const { onCreate, onArchive } = useDocuments();
  const contentItems = [
    {
      icon: <Copy size={20} strokeWidth={1.5} />,
      title: "Duplicate",
      shortcut: "Ctrl + D",
    },
    {
      icon: <SquarePen size={20} strokeWidth={1.5} />,
      title: "Rename",
      shortcut: "Ctrl + R",
    },
    {
      icon: <Trash2 size={20} strokeWidth={1.5} />,
      title: "Move to trash",
      shortcut: "Ctrl + R",
      hover: "danger",
      onClick: id ? () => onArchive({ id }) : undefined,
    },
  ];
  return (
    <div className="flex items-center btn-hover-effect px-0.5 py-1 group/parent overflow-hidden">
      <div
        className={cn(
          "w-full flex items-center gap-x-1 min-h-6 overflow-hidden ",
          active && "bg-primary/5 text-primary"
        )}
        style={{ paddingLeft: level ? level * 12 + 12 : 10 }}
      >
        <div className=" btn-hover-effect group/children">
          {documentIcon ? (
            documentIcon
          ) : (
            <FileText
              strokeWidth={1.5}
              size={18}
              className="group-hover/children:hidden"
            />
          )}

          {
            <div
              className="hidden group-hover/children:block"
              role="button"
              onClick={onExpand}
            >
              <ChevronDown
                strokeWidth={1.5}
                size={18}
                className={cn(
                  " delay-150 transition-all ease-in-out",
                  !expanded ? "-rotate-90" : "rotate-0"
                )}
              />
            </div>
          }
        </div>
        <p className="truncate mr-1">{label}</p>
      </div>
      <div className="relative flex items-center flex-row-reverse gap-x-2 opacity-0 group-hover/parent:opacity-100 transition-opacity">
        <div className="flex items-center flex-row-reverse gap-x-2 ">
          <TooltipComponent
            message={Enums.documents.tooltipCreateNewFileInside}
          >
            <Plus
              strokeWidth={1.5}
              size={18}
              className="flex-shrink hover:icon-hover-effect text-muted-foreground"
              role="button"
              onClick={() =>
                onCreate({
                  parentDocument: id,
                  expanded: expanded,
                  onExpanded: onExpand,
                })
              }
            />
          </TooltipComponent>
          {/* <DropdownMenuComponent
            label="More actions"
            trigger={
              <TooltipComponent message={Enums.documents.tooltipMoreActions}>
                <Ellipsis
                  strokeWidth={1.5}
                  size={18}
                  className="flex-shrink hover:icon-hover-effect text-muted-foreground"
                />
              </TooltipComponent>
            }
            contentItems={[
              {
                icon: (
                  <Trash2
                    strokeWidth={1.5}
                    size={18}
                    className="flex-shrink hover:icon-hover-effect text-muted-foreground"
                  />
                ),
                title: "test",
                shortcut: "⌘⌘",
              },
            ]}
          /> */}
          <DropdownMenuComponent
            label="Page"
            width={265}
            contentItems={contentItems}
          >
            <DropdownMenuTrigger>
              <TooltipComponent message={Enums.documents.tooltipMoreActions}>
                <Ellipsis
                  strokeWidth={1.5}
                  size={18}
                  className="flex-shrink hover:icon-hover-effect text-muted-foreground"
                />
              </TooltipComponent>
            </DropdownMenuTrigger>
          </DropdownMenuComponent>
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
