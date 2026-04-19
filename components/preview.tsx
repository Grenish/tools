import * as React from "react";
import { cn } from "@/lib/utils";

export function Preview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-4 flex min-h-[350px] w-full justify-center p-10 items-center rounded-xl border bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
