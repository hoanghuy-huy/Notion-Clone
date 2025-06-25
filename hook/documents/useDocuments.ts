"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Enums } from "@/config";
import { documentMessages } from "@/constants/messages";
import { Id } from "@/convex/_generated/dataModel";

export const useDocuments = () => {
  const create = useMutation(api.documents.create);
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

  return {
    onCreate,
    // getDocuments,
  };
};
