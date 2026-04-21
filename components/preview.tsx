"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Extending HTMLAttributes allows you to pass other standard div props if needed
interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Preview({ children, className, ...props }: PreviewProps) {
  return (
    <div
      className={cn(
        "relative mt-4 w-full rounded-xl border bg-background shadow-sm",
        "grid place-items-center",
        "min-h-87.5 p-4 sm:p-10",
        "overflow-x-auto",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px]",
        "dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]",
        "m-0 not-prose",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-full flex justify-center">{children}</div>
    </div>
  );
}
