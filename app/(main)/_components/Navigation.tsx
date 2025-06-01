"use client";
import React, { ElementRef, useRef } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
const Navigation = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

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
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleOnMouseUp = () => {
    isResizingRef.current = false;
    removeEventListener("mousemove", handleOnMouseMove);
    removeEventListener("mouseup", handleOnMouseUp);
  };

  return (
    <div>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full w-60  bg-secondary overflow-y-auto relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out",
          isMobile && "w-0"
        )}
      >
        <div className="relative flex flex-col justify-center mt-3">
          <div
            role="button"
            className="h-6 w-6 hover:bg-neutral-300 rounded-sm opacity-0 group-hover/sidebar:opacity-100 text-gray-500 absolute top-1/2 right-2 -translate-y-1/2 transition"
          >
            <ChevronsLeft />
          </div>
          <p>Hhuynh Hoang HUy</p>
        </div>
        <div className="mt-4">
          <p>Action Item</p>
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
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300 ",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
