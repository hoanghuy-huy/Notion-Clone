import { Doc, Id } from "@/convex/_generated/dataModel";
import React from "react";
import DocumentItem from "./document-item";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { Enums } from "@/config";

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
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const router = useRouter();
  const { documentId } = useParams();

  const redirect = (id: Id<"documents">) => {
    router.push(Enums.PATH.DOCUMENTS._ + "/" + id);
  };

  if (documents === undefined) {
    return (
      <div className="flex flex-col gap-y-3">
        <DocumentItem.Skeleton level={level} />
        {level === 0 && (
          <div className="flex flex-col gap-y-4">
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
          </div>
        )}
      </div>
    );
  }

  const onExpand = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  return (
    <>
      {level !== 0 && (
        <p
          className={cn(
            "last:block",
            level === 0 && "hidden",
            !!parentDocumentId && "hidden"
          )}
          style={{ paddingLeft: true ? level * 12 + 24 : undefined }}
        >
          No pages inside
        </p>
      )}
      {documents?.map((item): any => (
        <div key={item._id}>
          <DocumentItem
            id={item._id}
            level={level}
            label={item.title}
            documentIcon={item.icon}
            active={documentId === item._id}
            onExpand={(event) => onExpand(event, item._id)}
            expanded={expanded[item._id]}
            isSearch={false}
            onClick={() => redirect(item._id)}
          />
          {expanded[item._id] && (
            <DocumentList parentDocumentId={item._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
