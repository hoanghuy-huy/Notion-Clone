"use client";
import React from "react";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Enums } from "@/config";
import DocumentList from "./document-list";
import { useDocuments } from "@/hook/documents";
import TrashBox from "./trash-box";

const SidebarItem = ({ title }: { title: string }) => {
  const { onCreate } = useDocuments();

  return (
    <div className="w-full text-muted-foreground text-sm font-medium px-1">
      <div className="flex justify-between items-center btn-hover-effect group p-1">
        <h2 className="">{title}</h2>
        <Tooltip>
          <TooltipTrigger>
            <div className="hidden group-hover:block">
              <Plus
                className="hover:icon-hover-effect"
                strokeWidth={1.5}
                size={18}
                onClick={() => onCreate({})}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {Enums.documents.tooltipCreateNewFile}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="mt-1">
        <DocumentList />
      </div>
      <div className="mt-4">
        <TrashBox />
      </div>
    </div>
  );
};

export default SidebarItem;
