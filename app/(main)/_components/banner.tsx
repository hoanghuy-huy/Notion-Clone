"use client";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";

import React from "react";

interface BannerProps {
  documentId: Id<"documents">;
}
const Banner = ({ documentId }: BannerProps) => {
  const { onRemove, onRestoreDocument } = useDocuments();
  return (
    <div className="flex justify-between px-4 items-center h-12 w-full bg-rose-500 text-white text-sm">
      <div>This page is in the trash</div>
      <div className="flex gap-x-2">
        <Button
          size={"sm"}
          className="bg-transparent border border-white text-white hover:bg-white/5"
          onClick={() => onRestoreDocument({ id: documentId })}
        >
          Restore page
        </Button>
        <Button
          className="bg-transparent border border-white text-white hover:bg-white/5"
          size={"sm"}
          onClick={() => onRemove({ id: documentId })}
        >
          Delete from trash
        </Button>
      </div>
    </div>
  );
};

export default Banner;
