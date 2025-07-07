"use client";
import { Trash2, Undo2 } from "lucide-react";
import React from "react";
import Item from "./item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { TooltipComponent } from "@/components/coreUI";
import { useDocuments } from "@/hook/documents";

const TrashBox = () => {
  const { getTrashDocuments, onRestoreDocument, onRemove } = useDocuments();
  const trashItem = getTrashDocuments({});

  const renderTrashItem = () => {
    if (trashItem && trashItem.length === 0)
      return (
        <div className="h-full flex flex-col items-center justify-center pt-10">
          <Trash2 strokeWidth={1.5} size={20} />
          <p className="text-muted-foreground">No Result</p>
        </div>
      );
    return trashItem?.map((item) => {
      return (
        <div
          className="flex items-center justify-between hover:btn-hover-effect p-1"
          key={item._id}
        >
          <div className="flex gap-x-2 items-center ">
            <div>{item.icon}</div>

            <div className="flex flex-col  gap-x-2 text-start">
              <p className="text-primary ">{item.title}</p>
              {/* <p className="text-muted-foreground text-sm">
                {item.title} / dfhs
              </p> */}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <TooltipComponent message="Restore">
              <div
                role="button"
                onClick={() => onRestoreDocument({ id: item._id })}
              >
                <Undo2 strokeWidth={1.5} size={18} />
              </div>
            </TooltipComponent>

            <TooltipComponent message="Delete from trash">
              <div role="button" onClick={() => onRemove({ id: item._id })}>
                <Trash2 strokeWidth={1.5} size={18} />
              </div>
            </TooltipComponent>
          </div>
        </div>
      );
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div role="button">
          <Item iconLeft={Trash2} title="Trash" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[400px] min-h-52 px-2 flex flex-col justify-center gap-y-3"
        align="start"
        side="right"
      >
        <div className="h-[10%]">
          <Input placeholder="Search" className="w-full h-7 bg-gray-50/5 " />
        </div>
        <div className="flex-1">{renderTrashItem()}</div>
      </PopoverContent>
    </Popover>
  );
};

export default TrashBox;
