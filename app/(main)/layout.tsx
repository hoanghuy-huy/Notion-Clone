"use client";

import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import { ThemeProvider } from "@/components/theme";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner
            size="md"
            className="bg-black"
            color="#fff"
            loading={isLoading}
          />
        </div>
      </div>
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
        <Navigation />
        <main className="h-full flex-1 overflow-y-auto dark:bg-[#1f1f1f]">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
