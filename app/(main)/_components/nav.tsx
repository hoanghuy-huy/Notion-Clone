"use client";
import React, { ElementRef, useRef } from "react";
import { MenuIcon, Search, Settings2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import UserItem from "./user-item";
import SidebarItem from "./menu-item";
import Item from "./item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonToggleTheme } from "@/components/theme";
import Navbar from "./navbar";

const Nav = () => {
  const defaultWidthSidebar = 250;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);
  const [currentSizeSidebar, setCurrentSizeSidebar] =
    React.useState(defaultWidthSidebar);
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

  const params = useParams();

  React.useEffect(() => {
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.setProperty("width", `${defaultWidthSidebar}px`);
      navbarRef.current.style.setProperty("left", `${defaultWidthSidebar}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${defaultWidthSidebar}px)`
      );
    }
  }, []);

  return (
    <div>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary  overflow-y-auto relative flex flex-col z-[99999] overflow-x-hidden gap-5",
          isResetting && "transition-all ease-in-out"
        )}
      >
        <div className="h-full px-3 flex flex-col gap-y-4">
          <div className=" flex-shrink-0  flex flex-col gap-y-4 mb-2">
            <div>
              <UserItem closeSidebar={closeSidebar} />
            </div>
            <div>
              <Item iconLeft={Search} title="Search" />
              <Dialog>
                <DialogTrigger asChild>
                  <div role="button">
                    <Item iconLeft={Settings2} title="Setting" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-3">
                    <DialogTitle className="text-lg font-medium">
                      My setting
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-lg font-medium">
                        Appearance
                      </DialogTitle>
                      <DialogDescription>
                        Personalize your experience with light or dark mode
                      </DialogDescription>
                    </div>
                    <div>{<ButtonToggleTheme />}</div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="overflow-y-auto">
            <SidebarItem title="Private" />
          </div>
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
        {!!params.documentId ? (
          <Navbar openSidebar={() => openSidebar()} isCollapsed={isCollapsed} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={() => openSidebar()}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Nav;
