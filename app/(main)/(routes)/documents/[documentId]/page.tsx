"use client";
import CoverImage from "@/app/(main)/_components/cover-image";
import NotFoundDocument from "@/app/(main)/_components/not-found-document";
import Toolbar from "@/app/(main)/_components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { useMutation } from "convex/react";
import dynamic from "next/dynamic";
import React from "react";
const Editor = dynamic(() => import("@/app/(main)/_components/editor"), {
  ssr: false,
});

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const isValidConvexId = (id?: string): id is Id<"documents"> => {
    return typeof id === "string" && /^[a-z0-9]{16,}$/.test(id);
  };

  if (!isValidConvexId(params.documentId as string))
    return <NotFoundDocument />;

  const { getOneDocument } = useDocuments();
  const document = getOneDocument({ id: params.documentId });
  const update = useMutation(api.documents.update);
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };
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

  if (document === null) return <NotFoundDocument />;

  return (
    <div className="pb-40">
      <CoverImage url={document?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document as Doc<"documents">} />
        <Editor onChange={onChange} initialContent={document?.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
