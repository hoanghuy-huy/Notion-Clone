"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Enums } from "@/config";
import { documentMessages } from "@/constants/messages";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { v } from "convex/values";
import { archive } from "@/convex/documents";
import { useRouter } from "next/navigation";
export const useDocuments = () => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const router = useRouter();
  const onCreate = ({
    title = Enums.documents.titleCreateNewFile,
    parentDocument,
    onExpanded = () => {},
    expanded = false,
    event,
  }: {
    parentDocument?: Id<"documents">;
    title?: string;
    onExpanded?: (
      event?: React.MouseEvent<HTMLElement, MouseEvent>,
      id?: Id<"documents">
    ) => void;
    expanded?: boolean;
    event?: React.MouseEvent<HTMLElement, MouseEvent>;
  }) => {
    event?.stopPropagation();
    const promise = create({
      title: title,
      parentDocument: parentDocument,
    }).then((docs) => {
      if (docs && !expanded) onExpanded(event, docs._id);
    });
    toast.promise(promise, documentMessages.create);
  };

  const onArchive = ({ id }: { id: Id<"documents"> }) => {
    const promise = archive({ id: id });
    toast.promise(promise, documentMessages.archive);
  };

  const getTrashDocuments = ({ id }: { id?: Id<"documents"> }) => {
    const documents = useQuery(api.documents.getTrash, { id: id });

    return documents;
  };

  const onRestoreDocument = ({ id }: { id: Id<"documents"> }) => {
    const promise = restore({ id: id });
    toast.promise(promise, documentMessages.restore);
  };

  const onRemove = ({ id }: { id: Id<"documents"> }) => {
    const promise = remove({ id: id });

    toast.promise(promise, documentMessages.remove);

    router.push(Enums.PATH.DOCUMENTS._);
  };

  const getOneDocument = ({ id }: { id: Id<"documents"> }) => {
    const document = useQuery(api.documents.getDocumentById, {
      idDocument: id,
    });

    return document;
  };
  return {
    onCreate,
    onArchive,
    getTrashDocuments,
    onRestoreDocument,
    onRemove,
    getOneDocument,
    // getDocuments,
  };
};
