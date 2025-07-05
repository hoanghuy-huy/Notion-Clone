import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { use } from "react";
import CoverImageModal from "./cover-image-modal";
import { useDocuments } from "@/hook/documents";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { documentMessages } from "@/constants/messages";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface CoverImageProps {
  url: string | undefined;
  preview?: boolean;
}
const CoverImage = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const { onRemoveCoverImage } = useDocuments();
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} alt="Cover Image" className="object-cover" fill />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <CoverImageModal>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              onClick={() => {}}
              size={"sm"}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Change Image
            </Button>
          </CoverImageModal>

          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            onClick={() =>
              onRemoveCoverImage({
                id: params.documentId as Id<"documents">,
              })
            }
            size={"sm"}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Image
          </Button>
        </div>
      )}
    </div>
  );
};

CoverImage.Skeleton = function CoverImageSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};

export default CoverImage;
