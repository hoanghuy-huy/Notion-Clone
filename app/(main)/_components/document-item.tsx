import { Enums } from "@/config";
import { api } from "@/convex/_generated/api";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useQuery } from "convex/react";
import {
  CherryIcon,
  ChevronDown,
  ChevronRight,
  Ellipsis,
  FileText,
  Plus,
} from "lucide-react";
import React from "react";
import { TooltipComponent } from "@/components/components";
import { useDocuments } from "@/app/hook/documents";
const DocumentItem = ({ isExpanded = false }) => {
  const { onCreate, getDocuments: documents } = useDocuments();
  const chevronIcon = isExpanded ? (
    <ChevronDown
      strokeWidth={1.5}
      size={18}
      className="hidden group-hover/children:block"
    />
  ) : (
    <ChevronRight
      strokeWidth={1.5}
      size={18}
      className="hidden group-hover/children:block"
    />
  );

  return documents?.map((item, i) => (
    <div
      className="flex items-center btn-hover-effect p-1 group/parent overflow-hidden"
      key={item._id}
    >
      <div className="w-full flex items-center gap-x-1">
        <div className=" btn-hover-effect group/children">
          <FileText
            strokeWidth={1.5}
            size={18}
            className="group-hover/children:hidden"
          />
          {chevronIcon}
        </div>
        <p>{item.title}</p>
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
  ));
};

export default DocumentItem;
