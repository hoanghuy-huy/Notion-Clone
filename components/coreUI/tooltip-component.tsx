import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface TooltipComponentProps {
  children: React.ReactNode;
  message: string;
  onClick?: () => void;
}

const TooltipComponent = ({
  children,
  message,
  onClick,
}: TooltipComponentProps) => {
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild onClick={onClick}>
        {children}
      </TooltipTrigger>
      <TooltipContent hideWhenDetached>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
