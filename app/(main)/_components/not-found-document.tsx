import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundDocument = () => {
  return (
    <div className="w-full h-screen  flex flex-col items-center justify-center  ">
      <div className="w-[340px]  flex flex-col items-center justify-center  gap-y-3">
        <h2 className="text-white/90 font-medium text-xl">
          This page couldn’t be found
        </h2>
        <p className="text-muted-foreground text-sm font-thin text-center">
          You may not have access, or it might have been deleted or moved. Check
          the link and try again.
        </p>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="/documents">Back to your content</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundDocument;
