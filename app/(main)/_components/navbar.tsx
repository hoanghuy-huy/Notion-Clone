"use client";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";
import Banner from "./banner";

interface NavbarProps {
  openSidebar: () => void;
  isCollapsed: boolean;
}
const Navbar = ({ openSidebar, isCollapsed }: NavbarProps) => {
  const params = useParams();

  const { getOneDocument } = useDocuments();

  const document = getOneDocument({ id: params.documentId as Id<"documents"> });

  if (document === undefined)
    return (
      <nav className="h-11 w-full  p-2">
        <Title.Skeleton />
      </nav>
    );
  if (!document) return null;

  return (
    <div>
      <nav className="h-11 w-full  p-2">
        <div className="flex justify-between items-center">
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
            <div className="flex items-center justify-between w-full">
              <Title initialDocument={document as Doc<"documents">} />
            </div>
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </div>
  );
};

export default Navbar;
