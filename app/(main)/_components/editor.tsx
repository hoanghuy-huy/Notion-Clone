"use client";
import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
interface EditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const res = await edgestore.publicImages.upload({ file });
    return res.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  const uploadToDatabase = () => {
    if (onChange) {
      onChange(JSON.stringify(editor.document, null, 2));
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={uploadToDatabase}
    />
  );
};

export default Editor;
