"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const CoverImageModal = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const [open, setOpen] = React.useState(false);
  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicImages.upload({
        file,
        signal,
        onProgressChange,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      setOpen(false);

      return res;
    },
    [edgestore]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogContent>
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-lg font-medium">
              Cover Image
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <DialogDescription>
                <UploaderProvider uploadFn={uploadFn} autoUpload>
                  <SingleImageDropzone
                    className="w-full h-full"
                    dropzoneOptions={{
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                  />
                </UploaderProvider>
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
