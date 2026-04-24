/**
 * Text Formatting Utilities
 * Provides helper functions to apply and remove text formatting using execCommand
 */

export type FormatType =
  | "bold"
  | "italic"
  | "underline"
  | "h1"
  | "h2"
  | "bulletList"
  | "numberList"
  | "link"
  | "image"
  | "removeFormat";

export interface TextSelection {
  text: string;
  isCollapsed: boolean;
  startOffset: number;
  endOffset: number;
}

/**
 * Get current text selection information
 */
export function getTextSelection(): TextSelection | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  return {
    text: selection.toString(),
    isCollapsed: selection.toString().length === 0,
    startOffset: range.startOffset,
    endOffset: range.endOffset,
  };
}

/**
 * Check if a specific format is currently applied to selection
 */
export function isFormatActive(format: FormatType): boolean {
  try {
    return document.queryCommandState(getCommandName(format));
  } catch {
    return false;
  }
}

/**
 * Apply text formatting to current selection
 */
export function applyFormat(format: FormatType): void {
  const selection = window.getSelection();

  if (!selection || !selection.rangeCount) {
    return;
  }

  const range = selection.getRangeAt(0);
  const commonAncestor = range.commonAncestorContainer;

  // Ensure editor has focus
  if (commonAncestor.parentElement) {
    commonAncestor.parentElement.focus();
  }

  try {
    switch (format) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "h1":
        document.execCommand("formatBlock", false, "<h1>");
        break;
      case "h2":
        document.execCommand("formatBlock", false, "<h2>");
        break;
      case "bulletList":
        document.execCommand("insertUnorderedList");
        break;
      case "numberList":
        document.execCommand("insertOrderedList");
        break;
      case "removeFormat":
        document.execCommand("removeFormat");
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`Error applying format ${format}:`, error);
  }
}

/**
 * Toggle a format (apply if not active, remove if active)
 */
export function toggleFormat(format: FormatType): void {
  if (isFormatActive(format)) {
    removeFormat(format);
  } else {
    applyFormat(format);
  }
}

/**
 * Remove formatting from current selection
 */
export function removeFormat(format: FormatType): void {
  const selection = window.getSelection();

  if (!selection || !selection.rangeCount) {
    return;
  }

  try {
    switch (format) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "h1":
      case "h2":
        document.execCommand("formatBlock", false, "<p>");
        break;
      case "bulletList":
      case "numberList":
        // Toggle the list off by executing the same command
        document.execCommand(
          format === "bulletList" ? "insertUnorderedList" : "insertOrderedList",
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`Error removing format ${format}:`, error);
  }
}

/**
 * Insert a link at current selection
 */
export function insertLink(url: string, text?: string): void {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return;
  }

  if (!text) {
    text = selection.toString() || url;
  }

  try {
    // If there's no selection, use the URL as text
    if (selection.toString() === "") {
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand("createLink", false, url);
    }
  } catch (error) {
    console.error("Error inserting link:", error);
  }
}

/**
 * Insert an image at current position
 */
export function insertImage(url: string, alt?: string): void {
  try {
    document.execCommand("insertImage", false, url);

    // Set alt text if provided
    if (alt) {
      const images = document.querySelectorAll("img");
      const lastImage = images[images.length - 1];
      if (lastImage) {
        lastImage.setAttribute("alt", alt);
      }
    }
  } catch (error) {
    console.error("Error inserting image:", error);
  }
}

/**
 * Get the command name for a format type
 */
function getCommandName(format: FormatType): string {
  const commandMap: Record<FormatType, string> = {
    bold: "bold",
    italic: "italic",
    underline: "underline",
    h1: "heading",
    h2: "heading",
    bulletList: "insertUnorderedList",
    numberList: "insertOrderedList",
    link: "createLink",
    image: "insertImage",
    removeFormat: "removeFormat",
  };
  return commandMap[format];
}

/**
 * Focus on editor and restore selection
 */
export function focusEditor(editorElement: HTMLElement): void {
  if (editorElement) {
    editorElement.focus();
  }
}

/**
 * Clear all formatting from editor
 */
export function clearAllFormatting(editorElement: HTMLElement): void {
  try {
    const content = editorElement.innerText;
    editorElement.innerHTML = "";
    editorElement.textContent = content;
  } catch (error) {
    console.error("Error clearing formatting:", error);
  }
}

/**
 * Get HTML content from editor
 */
export function getEditorContent(editorElement: HTMLElement): string {
  return editorElement.innerHTML;
}

/**
 * Set HTML content to editor
 */
export function setEditorContent(
  editorElement: HTMLElement,
  content: string,
): void {
  try {
    editorElement.innerHTML = content;
  } catch (error) {
    console.error("Error setting editor content:", error);
  }
}

/**
 * Get plain text content from editor
 */
export function getEditorPlainText(editorElement: HTMLElement): string {
  return editorElement.innerText;
}
