"use client";

import { useEffect, useRef } from "react";
import { trackCliCommandCopied, trackComponentInstalled } from "@/lib/analytics";

/**
 * Wraps a fumadocs CodeBlock and listens for clipboard copy events.
 * When the user copies content from an `npm` code block, it fires
 * `cli_command_copied` and optionally `component_installed`.
 */
export function TrackedCodeBlock({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleCopy() {
      // Read the text content of the code block
      const pre = el?.querySelector("pre");
      if (!pre) return;

      const text = pre.textContent?.trim() ?? "";
      if (!text) return;

      // Only track CLI install commands
      if (text.startsWith("npx shadcn") || text.startsWith("npx ") || text.startsWith("npm ") || text.startsWith("pnpm ") || text.startsWith("bun ") || text.startsWith("yarn ")) {
        // Extract component name from @grenish/ commands
        const grenishMatch = text.match(/@grenish\/([a-z-]+)/);
        const component = grenishMatch?.[1];

        trackCliCommandCopied(text, component);

        // If it's installing a @grenish component, also fire component_installed
        if (component) {
          trackComponentInstalled(component);
        }
      }
    }

    el.addEventListener("copy", handleCopy);
    return () => el.removeEventListener("copy", handleCopy);
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
