import { Button } from "@/components/ui/button";
import { IconPicker } from "@/components/ui/icon-picker";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hook/documents";
import { useMutation } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import CoverImageModal from "./cover-image-modal";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(initialData?.title);
  const removeIcon = useMutation(api.documents.removeIcon);
  const update = useMutation(api.documents.update);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon: icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  const coverImage = useCoverImage();

  return (
    <div className="pl-[54px] group relative">
      {!!initialData?.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData?.icon}{" "}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {/* {initialData && initialData?.icon && !preview && (
        <p className="text-6xl pt-6">{initialData?.icon}</p>
      )} */}
      <div className=" opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {initialData && !initialData?.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <CoverImageModal>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
              onClick={coverImage.onOpen}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add cover
            </Button>
          </CoverImageModal>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          value={value}
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] resize-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          className="pb-[11px] text-5xl font-bold outline-none cursor-pointer"
          onClick={enableInput}
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
