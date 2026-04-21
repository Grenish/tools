"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LinkPrompt from "./popups/link-prompt";
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  EyeIcon,
  ImageIcon,
  LinkIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  TextBolderIcon,
  TextHOneIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { FONT_DEFINITIONS, type FontFamily } from "./utils/fonts";

interface EditorToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>;
  fontFamily: FontFamily;
  setFont: (font: FontFamily) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onHeading: (heading: "h1" | "h2") => void;
  onBulletList: () => void;
  onNumberList: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  activeFormats: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    h1: boolean;
    h2: boolean;
    bulletList: boolean;
    numberList: boolean;
  };
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export default function EditorToolbar({
  fontFamily,
  setFont,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onBold,
  onItalic,
  onUnderline,
  onHeading,
  onBulletList,
  onNumberList,
  onInsertLink,
  onInsertImage,
  activeFormats,
  isPreviewMode,
  onTogglePreview,
}: EditorToolbarProps) {
  const handleHeadingChange = (value: string) => {
    if (value === "h1") {
      onHeading("h1");
    } else if (value === "h2") {
      onHeading("h2");
    }
  };

  const handleListChange = (value: string) => {
    if (value === "bulletList") {
      onBulletList();
    } else if (value === "numberList") {
      onNumberList();
    }
  };

  const textFormatValues: string[] = [];
  if (activeFormats.bold) textFormatValues.push("bold");
  if (activeFormats.italic) textFormatValues.push("italic");
  if (activeFormats.underline) textFormatValues.push("underline");

  return (
    <TooltipProvider>
      <CardHeader className="flex items-center gap-2 flex-wrap">
        {/* Text Formatting Group */}
        <ToggleGroup
          variant="outline"
          type="multiple"
          size="sm"
          value={textFormatValues}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={onBold}
            title="Bold (Ctrl+B)"
          >
            <TextBolderIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={onItalic}
            title="Italic (Ctrl+I)"
          >
            <TextItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={onUnderline}
            title="Underline (Ctrl+U)"
          >
            <TextUnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Heading Group */}
        <ToggleGroup
          variant="outline"
          size="sm"
          type="single"
          value={activeFormats.h1 ? "h1" : activeFormats.h2 ? "h2" : ""}
          onValueChange={handleHeadingChange}
        >
          <ToggleGroupItem
            value="h1"
            aria-label="Toggle heading one"
            title="Heading 1"
          >
            <TextHOneIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="h2"
            aria-label="Toggle heading two"
            title="Heading 2"
          >
            <TextHTwoIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* List Group */}
        <ToggleGroup
          variant="outline"
          size="sm"
          type="single"
          value={
            activeFormats.bulletList
              ? "bulletList"
              : activeFormats.numberList
                ? "numberList"
                : ""
          }
          onValueChange={handleListChange}
        >
          <ToggleGroupItem
            value="bulletList"
            aria-label="Toggle bullet list"
            title="Bullet List"
          >
            <ListBulletsIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="numberList"
            aria-label="Toggle number list"
            title="Numbered List"
          >
            <ListNumbersIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Link and Image Group */}
        <ToggleGroup variant="outline" size="sm" type="single" value="">
          <LinkPrompt onSubmit={onInsertLink}>
            <ToggleGroupItem
              value="link"
              aria-label="Insert link"
              title="Insert Link"
            >
              <LinkIcon />
            </ToggleGroupItem>
          </LinkPrompt>
          <ToggleGroupItem
            value="image"
            aria-label="Insert image"
            onClick={onInsertImage}
            title="Insert Image"
          >
            <ImageIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Font Selector */}
        <Select
          value={fontFamily}
          onValueChange={(value) => setFont(value as FontFamily)}
        >
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FONT_DEFINITIONS).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Undo/Redo Group */}
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="outline"
                aria-label="Undo"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <ArrowUUpLeftIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="outline"
                aria-label="Redo"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <ArrowUUpRightIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </ButtonGroup>

        {/* Preview Mode */}
        <ButtonGroup>
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            value={isPreviewMode ? "preview" : ""}
          >
            <ToggleGroupItem
              value="preview"
              aria-label="Toggle preview mode"
              onClick={onTogglePreview}
              title="Preview Mode"
            >
              <EyeIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </ButtonGroup>
      </CardHeader>
    </TooltipProvider>
  );
}
