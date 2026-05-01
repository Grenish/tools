"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DarkModeButtonProps {
  variant?: "icon" | "pill";
  className?: string;
}

export default function DarkModeButton1({
  variant = "icon",
  className,
}: DarkModeButtonProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — don't render theme-dependent UI until mounted
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={variant === "icon" ? "icon" : "sm"}
        className={cn("opacity-0", className)}
        disabled
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "flex h-8 items-center gap-2 rounded-full border border-border/60 bg-background px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-border hover:text-foreground",
          className,
        )}
      >
        {isDark ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )}
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "h-9 w-9 text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
