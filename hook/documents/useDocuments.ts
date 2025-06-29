"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Enums } from "@/config";
import { documentMessages } from "@/constants/messages";
import { Id } from "@/convex/_generated/dataModel";
import { v } from "convex/values";
import { archive } from "@/convex/documents";

export const useDocuments = () => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  // const getDocuments = useQuery(api.documents.get);

  const onCreate = ({
    title = Enums.documents.titleCreateNewFile,
    parentDocument,
    onExpanded = () => {},
    expanded = false,
  }: {
    parentDocument?: Id<"documents">;
    title?: string;
    onExpanded?: () => void;
    expanded?: boolean;
  }) => {
    const promise = create({
      title: title,
      parentDocument: parentDocument,
    }).then((docs) => {
      if (docs && !expanded) onExpanded();
    });
    toast.promise(promise, documentMessages.create);
  };

  const onArchive = ({ id }: { id: Id<"documents"> }) => {
    const promise = archive({ id: id });
    toast.promise(promise, documentMessages.archive);
  };
  return {
    onCreate,
    onArchive,
    // getDocuments,
  };
};
