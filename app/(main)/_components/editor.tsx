"use client";
import React from "react";
import { useBlockNoteEditor, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "next-themes";
interface EditorProps {
  onChange?: (content: string) => void;
  initialContent: string | undefined;
  editable?: boolean;
  documentId: string;
}

const Editor = ({
  onChange,
  initialContent,
  editable = true,
  documentId,
}: EditorProps) => {
  const update = useMutation(api.documents.update);
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  // Lưu khi thay đổi nội dung
  React.useEffect(() => {
    if (!editor) return;

    const onChange = () => {
      const content = JSON.stringify(editor.document, null, 2);
      update({
        id: documentId as Id<"documents">,
        content,
      });
    };

    editor.onEditorContentChange(onChange);
  }, [editor]);

  if (!editor) return null;

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
    />
  );
};

export default Editor;
