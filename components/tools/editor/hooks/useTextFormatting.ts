"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { isFormatActive } from "../utils/formatting";

export type FormatType =
  | "bold"
  | "italic"
  | "underline"
  | "h1"
  | "h2"
  | "bulletList"
  | "numberList";

export interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  h1: boolean;
  h2: boolean;
  bulletList: boolean;
  numberList: boolean;
}

export function useTextFormatting(editorRef: React.RefObject<HTMLDivElement>) {
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
    bold: false,
    italic: false,
    underline: false,
    h1: false,
    h2: false,
    bulletList: false,
    numberList: false,
  });

  const selectionCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Update active formats based on current selection
   */
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;

    const selection = window.getSelection();

    // If selection is not in the editor, clear formats
    if (!selection || !editorRef.current.contains(selection.anchorNode)) {
      setActiveFormats({
        bold: false,
        italic: false,
        underline: false,
        h1: false,
        h2: false,
        bulletList: false,
        numberList: false,
      });
      return;
    }

    try {
      setActiveFormats({
        bold: isFormatActive("bold"),
        italic: isFormatActive("italic"),
        underline: isFormatActive("underline"),
        h1: isFormatActive("h1"),
        h2: isFormatActive("h2"),
        bulletList: isFormatActive("bulletList"),
        numberList: isFormatActive("numberList"),
      });
    } catch (error) {
      console.error("Error updating active formats:", error);
    }
  }, [editorRef]);

  /**
   * Debounced format update
   */
  const debouncedUpdateFormats = useCallback(() => {
    if (selectionCheckTimeoutRef.current) {
      clearTimeout(selectionCheckTimeoutRef.current);
    }

    selectionCheckTimeoutRef.current = setTimeout(() => {
      updateActiveFormats();
    }, 50);
  }, [updateActiveFormats]);

  /**
   * Handle selection change
   */
  const handleSelectionChange = useCallback(() => {
    debouncedUpdateFormats();
  }, [debouncedUpdateFormats]);

  /**
   * Handle mouse up (selection changed by mouse)
   */
  const handleMouseUp = useCallback(() => {
    updateActiveFormats();
  }, [updateActiveFormats]);

  /**
   * Handle keyboard up (selection might have changed)
   */
  const handleKeyUp = useCallback(() => {
    debouncedUpdateFormats();
  }, [debouncedUpdateFormats]);

  /**
   * Check if a specific format is active
   */
  const isFormatActiveCheck = useCallback(
    (format: FormatType): boolean => {
      return activeFormats[format];
    },
    [activeFormats],
  );

  /**
   * Get all active formats as an array
   */
  const getActiveFormatsList = useCallback((): FormatType[] => {
    return (Object.entries(activeFormats) as [FormatType, boolean][])
      .filter(([, isActive]) => isActive)
      .map(([format]) => format);
  }, [activeFormats]);

  /**
   * Setup listeners for selection changes
   */
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Listen for selection changes
    document.addEventListener("selectionchange", handleSelectionChange);

    // Listen for mouse and keyboard events
    editor.addEventListener("mouseup", handleMouseUp);
    editor.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      editor.removeEventListener("mouseup", handleMouseUp);
      editor.removeEventListener("keyup", handleKeyUp);

      if (selectionCheckTimeoutRef.current) {
        clearTimeout(selectionCheckTimeoutRef.current);
      }
    };
  }, [editorRef, handleSelectionChange, handleMouseUp, handleKeyUp]);

  return {
    activeFormats,
    isFormatActive: isFormatActiveCheck,
    getActiveFormats: getActiveFormatsList,
    updateActiveFormats,
  };
}
