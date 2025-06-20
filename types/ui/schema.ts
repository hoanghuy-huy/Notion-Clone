import { Id } from "@/convex/_generated/dataModel";
import { LucideIcon } from "lucide-react";

export interface IDocumentSchema {
  id: Id<"documents">;
  title?: string;
  content?: string;
  documentIcon?: string;
  icon?: LucideIcon;
  isSearch?: boolean;
  isExpanded?: boolean;
  level?: number;
  isPublished?: boolean;
  isArchived?: boolean;
  parentDocument?: string;
  coverImage?: string;
  onClick: () => void;
  onExpand: () => void;
  label: string;
  active?: boolean;
}
