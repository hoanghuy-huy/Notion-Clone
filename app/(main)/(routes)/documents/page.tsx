import Image from "next/image";
import React from "react";

const DocumentsPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 select-none">
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
      <h3 className="text-2xl font-semibold">Welcome to Notix</h3>
    </div>
  );
};

export default DocumentsPage;
