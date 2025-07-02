import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { useQuery } from "convex/react";
import { Heart, MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

interface NavbarProps {
  openSidebar: () => void;
  isCollapsed: boolean;
}
const Navbar = ({ openSidebar, isCollapsed }: NavbarProps) => {
  const { getOneDocument } = useDocuments();
  const params = useParams();
  const document = useQuery(api.documents.getOne, {
    idDocument: params.documentId as Id<"documents">,
  });

  if(!document) return null
  
  return (
    <div className="h-11 w-full ">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-x-3">
          {isCollapsed && (
            <div>
              <MenuIcon
                onClick={() => openSidebar()}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            </div>
          )}
          <div className="flex items-center gap-x-0.5 btn-hover-effect p-1">
            <div className="h-5 w-5 flex items-center">
              <Heart size={14} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-normal">{document?.title}</h3>
          </div>
          <div>Private</div>
        </div>
        <div>Share</div>
      </div>
    </div>
  );
};

export default Navbar;
