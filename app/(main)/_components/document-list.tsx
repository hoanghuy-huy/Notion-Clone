import { Doc, Id } from "@/convex/_generated/dataModel";
import { useDocuments } from "@/hook/documents";
import { useRouter } from "next/router";
import React from "react";
import DocumentItem from "./document-item";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface IDocumentItemProps {
  parentDocumentId?: Id<"documents"> | undefined;
  level?: number;
  data?: Doc<"documents">[];
}
const DocumentList = ({
  parentDocumentId,
  level = 0,
  data,
}: IDocumentItemProps) => {
  const documents = useQuery(api.documents.get, {
    parentDocument: parentDocumentId,
  });

  if (documents === undefined) {
    return (
      <>
        <DocumentItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  const onExpand = (documentId: string) => {
    console.log(documentId);
  };

  return (
    <>
      <p
        className={
          (cn("last:block", level === 0 && "hidden"),
          parentDocumentId && "hidden")
        }
        style={{ paddingLeft: true ? level * 12 + 24 : undefined }}
      >
        No pages inside
      </p>
      {documents.map((item) => (
        <div key={item._id}>
          <DocumentItem
            id={item._id}
            level={level}
            label={item.title}
            documentIcon={item.icon}
            active={false}
            onExpand={() => onExpand(item._id)}
            expanded={false}
            isSearch={false}
            onClick={() => {}}
          />
          {true && (
            <DocumentList parentDocumentId={item._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
