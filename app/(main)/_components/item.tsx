import { LucideIcon, Search } from "lucide-react";
import { title } from "process";
import React from "react";

interface ISearchItemProps {
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  title: string;
}
const Item = ({
  iconLeft: IconLeft,
  iconRight: IconRight,
  title,
}: ISearchItemProps) => {
  return (
    <div
      className="w-full flex items-center btn-hover-effect gap-2 p-1 text-muted-foreground font-normal"
      role="button"
    >
      {IconLeft && <IconLeft size={20} strokeWidth={1.5} />}

      <h2>{title}</h2>

      {IconRight && <IconRight size={20} strokeWidth={1.5} />}
    </div>
  );
};

export default Item;
