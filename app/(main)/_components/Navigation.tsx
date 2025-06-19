"use client";
import React, { ElementRef, useRef } from "react";
import {
  ChevronsLeft,
  CircleUser,
  CircleUserIcon,
  MenuIcon,
  SquarePen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserItem from "./user-item";
const Navigation = () => {
  const pathName = usePathname();
  const defaultWidthSidebar = 250;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);
  const [currentSizeSidebar, setCurrentSizeSidebar] =
    React.useState(defaultWidthSidebar);
  const { user } = useUser();
  const handleOnMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    addEventListener("mousemove", handleOnMouseMove);
    addEventListener("mouseup", handleOnMouseUp);
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth > 450) newWidth = 450;

    if (newWidth < 250) newWidth = 250;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleOnMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false;
    let newWidth = event.clientX;

    if (newWidth > 450) newWidth = 450;
    else if (newWidth < 250) newWidth = 250;

    setCurrentSizeSidebar(newWidth);

    removeEventListener("mousemove", handleOnMouseMove);
    removeEventListener("mouseup", handleOnMouseUp);
  };

  const closeSidebar = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.stopPropagation();
    if (!!sidebarRef.current && !!navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.setProperty("width", "0px");
      navbarRef.current.style.setProperty("left", "0px");
      navbarRef.current.style.setProperty("width", "100%");
      sidebarRef.current.style.setProperty("width", "0px");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const openSidebar = () => {
    if (!!sidebarRef.current && !!navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.setProperty("width", `${currentSizeSidebar}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${currentSizeSidebar}px)`
      );
      navbarRef.current.style.setProperty("left", `${currentSizeSidebar}px`);

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  React.useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.setProperty("width", `${defaultWidthSidebar}px`);
    }
  }, []);

  return (
    <div>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary  overflow-y-auto relative flex flex-col z-[99999] overflow-x-hidden",
          isResetting && "transition-all ease-in-out"
        )}
      >
        <div className="px-3">
          <UserItem closeSidebar={closeSidebar} />
        </div>

        <div
          onMouseDown={handleOnMouseDown}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full w-[2px] bg-primary/10 absolute right-0 top-0"
          )}
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute h-navbar  top-0 z-[99999] left-60 w-[calc(100%-240px)] ",
          isResetting && "transition-all ease-in-out duration-300 ",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={() => openSidebar()}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
