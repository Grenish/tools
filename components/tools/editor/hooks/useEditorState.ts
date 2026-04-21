"use client";

import { useState, useCallback, useRef } from "react";
import { FontFamily } from "../utils/fonts";
import type { FormatType } from "../utils/formatting";
import {
  applyFormat,
  removeFormat,
  toggleFormat as toggleFormatUtil,
  getEditorContent,
  setEditorContent,
} from "../utils/formatting";

export interface EditorStateType {
  content: string;
  fontFamily: FontFamily;
  selectedFormats: Set<string>;
  history: string[];
  historyIndex: number;
}

const MAX_HISTORY_SIZE = 50;
const HISTORY_DEBOUNCE_MS = 300;

export function useEditorState(initialContent: string = "") {
  const [state, setState] = useState<EditorStateType>({
    content: initialContent,
    fontFamily: "default",
    selectedFormats: new Set(),
    history: [initialContent],
    historyIndex: 0,
  });

  const editorRef = useRef<HTMLDivElement>(null!);
  const historyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Add content to history with debouncing
   */
  const addToHistory = useCallback((content: string) => {
    if (historyTimeoutRef.current) {
      clearTimeout(historyTimeoutRef.current);
    }

    historyTimeoutRef.current = setTimeout(() => {
      setState((prevState) => {
        const newHistory = prevState.history.slice(
          0,
          prevState.historyIndex + 1,
        );
        newHistory.push(content);

        // Keep history size manageable
        if (newHistory.length > MAX_HISTORY_SIZE) {
          newHistory.shift();
        }

        return {
          ...prevState,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    }, HISTORY_DEBOUNCE_MS);
  }, []);

  /**
   * Update editor content
   */
  const updateContent = useCallback(
    (newContent: string) => {
      setState((prevState) => ({
        ...prevState,
        content: newContent,
      }));
      addToHistory(newContent);
    },
    [addToHistory],
  );

  /**
   * Set font family
   */
  const setFont = useCallback((font: FontFamily) => {
    setState((prevState) => ({
      ...prevState,
      fontFamily: font,
    }));
  }, []);

  /**
   * Apply format to current selection
   */
  const applyFormatting = useCallback(
    (format: FormatType) => {
      if (editorRef.current) {
        editorRef.current.focus();
        applyFormat(format);

        // Update content after formatting
        const updatedContent = getEditorContent(editorRef.current);
        updateContent(updatedContent);

        // Update selected formats
        setState((prevState) => ({
          ...prevState,
          selectedFormats: new Set(prevState.selectedFormats).add(format),
        }));
      }
    },
    [updateContent],
  );

  /**
   * Remove format from current selection
   */
  const removeFormatting = useCallback(
    (format: FormatType) => {
      if (editorRef.current) {
        editorRef.current.focus();
        removeFormat(format);

        const updatedContent = getEditorContent(editorRef.current);
        updateContent(updatedContent);

        setState((prevState) => {
          const newFormats = new Set(prevState.selectedFormats);
          newFormats.delete(format);
          return {
            ...prevState,
            selectedFormats: newFormats,
          };
        });
      }
    },
    [updateContent],
  );

  /**
   * Toggle format on current selection
   */
  const toggleFormat = useCallback(
    (format: FormatType) => {
      if (editorRef.current) {
        editorRef.current.focus();
        toggleFormatUtil(format);

        const updatedContent = getEditorContent(editorRef.current);
        updateContent(updatedContent);

        setState((prevState) => {
          const newFormats = new Set(prevState.selectedFormats);
          if (newFormats.has(format)) {
            newFormats.delete(format);
          } else {
            newFormats.add(format);
          }
          return {
            ...prevState,
            selectedFormats: newFormats,
          };
        });
      }
    },
    [updateContent],
  );

  /**
   * Undo last action
   */
  const undo = useCallback(() => {
    setState((prevState) => {
      if (prevState.historyIndex > 0) {
        const newIndex = prevState.historyIndex - 1;
        const previousContent = prevState.history[newIndex];

        if (editorRef.current) {
          setEditorContent(editorRef.current, previousContent);
        }

        return {
          ...prevState,
          content: previousContent,
          historyIndex: newIndex,
        };
      }
      return prevState;
    });
  }, []);

  /**
   * Redo last undone action
   */
  const redo = useCallback(() => {
    setState((prevState) => {
      if (prevState.historyIndex < prevState.history.length - 1) {
        const newIndex = prevState.historyIndex + 1;
        const nextContent = prevState.history[newIndex];

        if (editorRef.current) {
          setEditorContent(editorRef.current, nextContent);
        }

        return {
          ...prevState,
          content: nextContent,
          historyIndex: newIndex,
        };
      }
      return prevState;
    });
  }, []);

  /**
   * Check if undo is available
   */
  const canUndo = state.historyIndex > 0;

  /**
   * Check if redo is available
   */
  const canRedo = state.historyIndex < state.history.length - 1;

  /**
   * Get current content
   */
  const getContent = useCallback((): string => {
    if (editorRef.current) {
      return getEditorContent(editorRef.current);
    }
    return state.content;
  }, [state.content]);

  /**
   * Get plain text content
   */
  const getPlainText = useCallback((): string => {
    if (editorRef.current) {
      return editorRef.current.innerText;
    }
    return state.content;
  }, [state.content]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "z"))
      ) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleFormat("bold");
      } else if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault();
        toggleFormat("italic");
      } else if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
        toggleFormat("underline");
      }
    },
    [undo, redo, toggleFormat],
  );

  /**
   * Handle content input
   */
  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const newContent = getEditorContent(element);
      updateContent(newContent);
    },
    [updateContent],
  );

  return {
    // State
    content: state.content,
    fontFamily: state.fontFamily,
    selectedFormats: state.selectedFormats,

    // Refs
    editorRef,

    // Methods
    updateContent,
    setFont,
    applyFormat: applyFormatting,
    removeFormat: removeFormatting,
    toggleFormat,
    undo,
    redo,
    getContent,
    getPlainText,
    handleKeyDown,
    handleInput,

    // State checks
    canUndo,
    canRedo,
  };
}
