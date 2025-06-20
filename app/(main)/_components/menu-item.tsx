import { ChevronDown, FileText, Plus } from "lucide-react";
import React from "react";
import DocumentItem from "./document-item";

const SidebarItem = () => {
  return (
    <div className="w-full text-muted-foreground text-sm font-medium ">
      <div className="flex justify-between items-center btn-hover-effect group">
        <h2 className="">Private</h2>
        <div className="hidden group-hover:block">
          <Plus strokeWidth={1.5} size={18} />
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <DocumentItem />
      </div>
    </div>
  );
};

export default SidebarItem;
