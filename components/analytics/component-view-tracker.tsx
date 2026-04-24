"use client";

import { useEffect } from "react";
import { trackComponentViewed } from "@/lib/analytics";

export function ComponentViewTracker({ component }: { component: string }) {
  useEffect(() => {
    trackComponentViewed(component);
  }, [component]);

  return null;
}
