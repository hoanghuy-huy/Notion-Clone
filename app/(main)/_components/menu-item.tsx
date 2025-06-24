"use client";
import { ChevronDown, FileText, Plus } from "lucide-react";
import React from "react";
import DocumentItem from "./document-item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Enums } from "@/config";
import DocumentList from "./document-list";
import { useDocuments } from "@/hook/documents";

const SidebarItem = () => {
  const { onCreate } = useDocuments();
  return (
    <div className="w-full text-muted-foreground text-sm font-medium ">
      <div className="flex justify-between items-center btn-hover-effect group p-1">
        <h2 className="">Private</h2>
        <Tooltip>
          <TooltipTrigger>
            <div className="hidden group-hover:block">
              <Plus
                className="hover:icon-hover-effect"
                strokeWidth={1.5}
                size={18}
                onClick={() => onCreate()}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {Enums.documents.tooltipCreateNewFile}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="mt-1 px-1">
        <DocumentList/>
      </div>
    </div>
  );
};

export default SidebarItem;
