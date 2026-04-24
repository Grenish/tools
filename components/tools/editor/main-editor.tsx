"use client";

import { Card, CardFooter } from "@/components/ui/card";
import EditorToolbar from "./toolbar";
import EditorBody from "./editor-body";
import { Button } from "@/components/ui/button";
import { useEditorState } from "./hooks/useEditorState";
import { useTextFormatting } from "./hooks/useTextFormatting";
import { useState } from "react";
import DeleteButton from "../delete-button";

export default function MainEditor() {
  const editor = useEditorState();
  const formatting = useTextFormatting(editor.editorRef);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  return (
    <Card className="w-full">
      <EditorToolbar
        editorRef={editor.editorRef}
        fontFamily={editor.fontFamily}
        setFont={editor.setFont}
        canUndo={editor.canUndo}
        canRedo={editor.canRedo}
        onUndo={editor.undo}
        onRedo={editor.redo}
        onBold={() => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
          }
          editor.toggleFormat("bold");
        }}
        onItalic={() => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
          }
          editor.toggleFormat("italic");
        }}
        onUnderline={() => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
          }
          editor.toggleFormat("underline");
        }}
        onHeading={(heading: "h1" | "h2") => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
          }
          editor.applyFormat(heading);
        }}
        onBulletList={() => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
            document.execCommand("insertUnorderedList");
            editor.updateContent(editor.editorRef.current.innerHTML);
          }
        }}
        onNumberList={() => {
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
            document.execCommand("insertOrderedList");
            editor.updateContent(editor.editorRef.current.innerHTML);
          }
        }}
        onInsertLink={() => {
          // LinkPrompt handles the link insertion, we just need to update content
          if (editor.editorRef.current) {
            editor.editorRef.current.focus();
            editor.updateContent(editor.editorRef.current.innerHTML);
          }
        }}
        onInsertImage={() => {
          const url = prompt("Enter the image URL:");
          if (url && editor.editorRef.current) {
            editor.editorRef.current.focus();
            document.execCommand("insertImage", false, url);
            editor.updateContent(editor.editorRef.current.innerHTML);
          }
        }}
        activeFormats={formatting.activeFormats}
        isPreviewMode={isPreviewMode}
        onTogglePreview={togglePreviewMode}
      />
      <EditorBody
        editorRef={editor.editorRef}
        fontFamily={editor.fontFamily}
        onInput={editor.handleInput}
        onKeyDown={editor.handleKeyDown}
        onUpdateFormats={formatting.updateActiveFormats}
        isPreviewMode={isPreviewMode}
      />
      <CardFooter className="gap-1">
        <Button size={"sm"}>Save</Button>
        <DeleteButton size={"sm"} />
      </CardFooter>
    </Card>
  );
}
