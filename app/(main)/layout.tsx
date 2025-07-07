"use client";

import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/theme";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Nav from "@/app/(main)/_components/navigation";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-full flex justify-center items-center">
          <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-[#1f1f1f]">
            <Spinner
              size="md"
              color="#fff"
              loading={isLoading}
              className="bg-black dark:bg-white"
            />
          </div>
        </div>
      </ThemeProvider>
    );

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full flex">
        <Nav />
        <main className="h-full flex-1 overflow-y-auto dark:bg-[#1f1f1f]">
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
