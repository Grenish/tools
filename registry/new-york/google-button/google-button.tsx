"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import * as React from "react";

// Types

type GoogleButtonSize =
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

export interface GoogleButtonProps extends React.ComponentProps<typeof Button> {
  size?: GoogleButtonSize;
  tooltipText?: string;
}

// Config

const iconSizeClass: Record<GoogleButtonSize, string> = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
  "icon-xs": "size-3",
  "icon-sm": "size-3.5",
  icon: "size-4",
  "icon-lg": "size-5",
};

const ICON_SIZES: GoogleButtonSize[] = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
];

// Component

export function GoogleButton({
  className,
  variant = "outline",
  size = "default",
  tooltipText = "Google",
  type = "button",
  children,
  ...props
}: GoogleButtonProps) {
  const isIcon = ICON_SIZES.includes(size);
  const iconClass = iconSizeClass[size];

  const button = (
    <Button
      variant={variant}
      size={size}
      type={type}
      className={cn(className)}
      {...props}
    >
      <GoogleLogoIcon
        weight="duotone"
        className={cn(iconClass, !isIcon && "mr-2")}
      />
      {!isIcon && (children ?? <span>Continue with Google</span>)}
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
