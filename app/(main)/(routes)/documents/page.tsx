import { ButtonToggleTheme } from "@/components/theme";
import Image from "next/image";
import React from "react";

const DocumentsPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.svg"
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <ButtonToggleTheme />
    </div>
  );
};

export default DocumentsPage;
