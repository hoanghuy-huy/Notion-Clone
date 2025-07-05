"use client";
import CoverImage from "@/app/(main)/_components/cover-image";
import Editor from "@/app/(main)/_components/editor";
import Toolbar from "@/app/(main)/_components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { useMutation, useQuery } from "convex/react";
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


  if (!document === undefined)

    
    return (
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <CoverImage.Skeleton />
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14  w-[50%]" />
          <Skeleton className="h-14 w-[80%]" />
          <Skeleton className="h-14 w-[40%]" />
          <Skeleton className="h-14 w-[60%]" />
          <Skeleton className="h-14 w-[60%]" />
        </div>
      </div>
    );

  if (document === null) return <div>Document not found</div>;

  return (
    <div className="pb-40">
      <CoverImage url={document?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document as Doc<"documents">} />
        <Editor initialContent={document?.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
