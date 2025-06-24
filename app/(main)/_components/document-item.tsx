import { Enums } from "@/config";
import {
  ChevronDown,
  ChevronRight,
  Ellipsis,
  FileText,
  LucideIcon,
  Plus,
} from "lucide-react";
import React from "react";
import { TooltipComponent } from "@/components/components";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
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
  const chevronIcon = expanded ? (
    <ChevronDown strokeWidth={1.5} size={18} onClick={onExpand} />
  ) : (
    <ChevronRight strokeWidth={1.5} size={18} onClick={onExpand} />
  );
  return (
    <div className="flex items-center btn-hover-effect px-0.5 py-1 group/parent overflow-hidden">
      <div
        className={cn(
          "w-full flex items-center gap-x-1 min-h-6 overflow-hidden ",
          active && "bg-primary/5 text-primary"
        )}
        style={{ paddingLeft: level ? level * 12 + 12 : 12 }}
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
            <div className="hidden group-hover/children:block" role="button">
              {chevronIcon}
            </div>
          }
        </div>
        <p className="truncate mr-1">{label}</p>
      </div>
      <div className="items-center hidden group-hover/parent:block">
        <div className="flex items-center flex-row-reverse gap-x-2 ">
          <TooltipComponent
            message={Enums.documents.tooltipCreateNewFileInside}
            onClick={() => alert("me")}
          >
            <Plus
              strokeWidth={1.5}
              size={18}
              className="flex-shrink hover:icon-hover-effect text-muted-foreground"
              role="button"
            />
          </TooltipComponent>
          <TooltipComponent message={Enums.documents.tooltipMoreActions}>
            <Ellipsis
              strokeWidth={1.5}
              size={18}
              className="flex-shrink hover:icon-hover-effect text-muted-foreground"
            />
          </TooltipComponent>
        </div>
      </div>
    </div>
  );
};

DocumentItem.Skeleton = function itemSkeleton({ level }: { level: number }) {
  return (
    <div
      style={{ paddingLeft: level ? level * 12 + 12 : 12 }}
      className="flex gap-x-1"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default DocumentItem;
