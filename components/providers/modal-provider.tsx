"use client";
import { useEffect, useState } from "react";
import { CoverImageModal } from "@/components/modals";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CoverImageModal />;
};

export default ModalProvider;
