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

  const onCreate = () => {
    const promise = create({ title: Enums.documents.titleCreateNewFile });
    toast.promise(promise, documentMessages.create);
  };

  return {
    onCreate,
    // getDocuments,
  };
};
