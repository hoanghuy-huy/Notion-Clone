"use client";
import Toolbar from "@/app/(main)/_components/toolbar";
import { Spinner } from "@/components/ui/spinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { useQuery } from "convex/react";
import { get } from "http";
import React from "react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { getOneDocument } = useDocuments();
  const document = getOneDocument({ id: params.documentId });

  if (!document === undefined) return <div>Loading......</div>;

  if (document === null) return <div>Document not found</div>;

  return (
    <div className="pb-11">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="h-[25vh]" />
        <Toolbar initialData={document as Doc<"documents">} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
