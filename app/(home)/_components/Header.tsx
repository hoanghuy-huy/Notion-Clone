"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import { useConvexAuth } from "convex/react";
// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    console.log(window.scrollY);
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);
  return (
    <div
      className={clsx(
        "h-[var(--height-header)] w-full border-b fixed z-20 bg-white flex justify-between items-center px-8",
        !scrolled && "border-white"
      )}
    >
      <div className="flex justify-center items-center">
        {/* <Image
          src="/logo.svg"
          alt="Logo"
          height={50}
          width={50}
          className="block dark:hidden object-contain"
        /> */}
        {/* Logo dark mode */}
        <Image
          src="/logo.svg"
          alt="Logo"
          height={50}
          width={50}
          className="block object-contain"
        />
        <span className="font-semibold">Notix</span>
      </div>
      <div className="flex gap-x-4">
        {isAuthenticated ? (
          <div className="flex justify-center items-center gap-x-4">
            <div className="rounded-full pt-2">
              <UserButton afterSwitchSessionUrl="/" />
            </div>
            <Button isLoading={isLoading} disabled={isLoading} asChild>
              <Link href="/documents">Enter Notix Free</Link>
            </Button>
          </div>
        ) : (
          <>
            <SignInButton mode="modal">
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                variant={"ghost"}
              >
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button isLoading={isLoading} disabled={isLoading}>
                Get Notix Free
              </Button>
            </SignInButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
