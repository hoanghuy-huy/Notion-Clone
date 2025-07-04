"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Heart } from "lucide-react";
import React, { useRef } from "react";

interface TitleProps {
  initialDocument: Doc<"documents">;
}
const Title = ({ initialDocument }: TitleProps) => {
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = React.useState(initialDocument.title || "Untitled");
  const enableInput = () => {
    setTitle(initialDocument.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialDocument._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center ">
      <div className="flex items-center gap-x-0.5 btn-hover-effect p-1">
        {initialDocument.icon && (
          <div className="h-5 w-5 flex items-center">
            <Heart size={14} strokeWidth={1.5} />
          </div>
        )}
        {isEditing ? (
          <Input
            ref={inputRef}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        ) : (
          <div onClick={enableInput}>
            <h3 className="text-sm font-normal">{initialDocument.title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md" />;
};

export default Title;
