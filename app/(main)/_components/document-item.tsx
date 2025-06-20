import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  CherryIcon,
  ChevronDown,
  ChevronRight,
  FileText,
  Plus,
} from "lucide-react";
import React from "react";

interface IItemProps {
  _id: Id<"documents">;
  title: string;
  documentIcon: string;
  isExpanded: boolean;
}
const DocumentItem = ({ isExpanded = false }: IItemProps) => {
  const documents = useQuery(api.documents.get);

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
      className="flex items-center btn-hover-effect group/parent"
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
      <div className="hidden group-hover/parent:block">
        <Plus strokeWidth={1.5} size={18} />
      </div>
    </div>
  ));
};

export default DocumentItem;
