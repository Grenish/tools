"use client";

import { XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import * as React from "react";

// Types

type XButtonSize =
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

export interface XButtonProps extends React.ComponentProps<typeof Button> {
  size?: XButtonSize;
  tooltipText?: string;
}

// Config

const iconSizeClass: Record<XButtonSize, string> = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
  "icon-xs": "size-3",
  "icon-sm": "size-3.5",
  icon: "size-4",
  "icon-lg": "size-5",
};

const ICON_SIZES: XButtonSize[] = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
];

// Component

export default function XButton({
  className,
  variant = "outline",
  size = "default",
  tooltipText = "X",
  type = "button",
  children,
  ...props
}: XButtonProps) {
  const isIcon = ICON_SIZES.includes(size);
  const iconClass = iconSizeClass[size];

  const button = (
    <Button variant={variant} size={size} type={type} className={cn(className)} {...props}>
      <XLogoIcon weight="duotone" className={cn(iconClass, !isIcon && "mr-2")} />
      {!isIcon && (children ?? <span>Continue with X</span>)}
    </Button>
  );

  if (!isIcon) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
