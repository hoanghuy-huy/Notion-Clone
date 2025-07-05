// components/CoverImageModal.tsx
"use client";

import { useCoverImage } from "@/hook/documents";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import React from "react";

const CoverImageModal = () => {
  const coverImage = useCoverImage();

  return (
    <Dialog
      open={coverImage.isOpen}
      onOpenChange={(open) =>
        open ? coverImage.onOpen() : coverImage.onClose()
      }
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>Upload image</div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
