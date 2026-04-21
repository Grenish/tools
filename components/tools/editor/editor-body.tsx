"use client";

import { CardContent } from "@/components/ui/card";
import { getFontClass, type FontFamily } from "./utils/fonts";
import { useEffect, useState } from "react";

interface EditorBodyProps {
  editorRef: React.RefObject<HTMLDivElement>;
  fontFamily: FontFamily;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onUpdateFormats: () => void;
  isPreviewMode: boolean;
}

export default function EditorBody({
  editorRef,
  fontFamily,
  onInput,
  onKeyDown,
  onUpdateFormats,
  isPreviewMode,
}: EditorBodyProps) {
  const fontClass = getFontClass(fontFamily);
  const [isEmpty, setIsEmpty] = useState(true);

  // Initialize editor with empty state
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = "";
    }
  }, [editorRef]);

  const handleMouseUp = () => {
    onUpdateFormats();
  };

  const handleKeyUp = () => {
    onUpdateFormats();
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Check if editor is empty by checking innerText
    const element = e.currentTarget;
    const text = element.innerText.trim();
    setIsEmpty(text === "");

    // Call parent's onInput handler
    onInput(e);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&display=swap');

        .editor-container {
          min-height: 300px;
          padding: 16px;
          transition: all 0.2s;
          word-wrap: break-word;
          overflow-wrap: break-word;
          line-height: 1.6;
          font-size: 1rem;
          position: relative;
        }

        /* Placeholder styling */
        .editor-container.is-empty::before {
          content: "Start writing your stories...";
          color: #9ca3af;
          font-style: italic;
          pointer-events: none;
          position: absolute;
          top: 16px;
          left: 16px;
        }

        .editor-container:focus {
          outline: none;
        }

        .editor-container.editor-font-default {
          font-family: ui-sans-serif, system-ui, sans-serif;
        }

        .editor-container.editor-font-roboto {
          font-family: 'Roboto', sans-serif;
        }

        .editor-container.editor-font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }

        .editor-container.editor-font-lato {
          font-family: 'Lato', sans-serif;
        }

        .editor-container.editor-font-noto-sans {
          font-family: 'Noto Sans', sans-serif;
        }

        .editor-container.editor-font-funnel-display {
          font-family: 'Funnel Display', serif;
        }

        .editor-container.editor-font-pacifico {
          font-family: 'Pacifico', cursive;
        }

        .editor-container.editor-font-comic-neue {
          font-family: 'Comic Neue', cursive;
        }

        .editor-container.editor-font-ibm-plex-sans {
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .editor-container.editor-font-ibm-plex-serif {
          font-family: 'IBM Plex Serif', serif;
        }

        .editor-container h1,
        .editor-container h2,
        .editor-container h3 {
          margin: 0.5em 0;
          font-weight: 600;
        }

        .editor-container h1 {
          font-size: 1.5em;
        }

        .editor-container h2 {
          font-size: 1.25em;
        }

        .editor-container h3 {
          font-size: 1.125em;
        }

        .editor-container p {
          margin: 0.875rem 0;
        }

        .editor-container ul {
          list-style-type: disc;
        }

        .editor-container ol {
          list-style-type: decimal;
        }

        .editor-container ul,
        .editor-container ol {
          margin: 0.5em 0;
          padding-left: 2em;
        }

        .editor-container li {
          margin: 0.25em 0;
        }

        .editor-container a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
          target: "_blank"
        }

        .editor-container img {
          max-width: 100%;
          height: auto;
          margin: 0.5em 0;
        }
      `}</style>

      <CardContent className={`p-0 border ${isPreviewMode && "border-none"}`}>
        <div
          ref={editorRef}
          className={`editor-container ${fontClass} ${
            isEmpty ? "is-empty" : ""
          } ${isPreviewMode ? "preview-mode" : ""}`}
          contentEditable={!isPreviewMode}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={onKeyDown}
          onMouseUp={handleMouseUp}
          onKeyUp={handleKeyUp}
          role={isPreviewMode ? "region" : "textbox"}
          aria-label={isPreviewMode ? "Content preview" : "Text editor"}
        />
      </CardContent>
    </>
  );
}
