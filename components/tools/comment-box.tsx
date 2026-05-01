"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bold, Italic, Code, Link, AtSign } from "lucide-react";
import EmojiPicker from "./emoji-picker";

const MAX_CHARS = 1000;

interface CommentBoxProps {
  avatarSrc?: string;
  avatarFallback?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
}

const ToolbarButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function CommentBox({
  avatarSrc,
  avatarFallback = "GR",
  placeholder = "Leave a comment...",
  onSubmit,
  onCancel,
}: CommentBoxProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const remaining = MAX_CHARS - value.length;
  const isOverLimit = remaining < 0;
  const isEmpty = value.trim().length === 0;

  const wrapSelection = (before: string, after = before) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);
    const newValue =
      value.slice(0, start) + before + selected + after + value.slice(end);
    setValue(newValue);
    requestAnimationFrame(() => {
      el.selectionStart = start + before.length;
      el.selectionEnd = end + before.length;
      el.focus();
    });
  };

  const handleSubmit = () => {
    if (isEmpty || isOverLimit) return;
    onSubmit?.(value);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full max-w-2xl gap-3">
      <Avatar className="mt-0.5 h-8 w-8 shrink-0 rounded-full">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback className="text-xs font-medium">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-0">
        <div
          className={cn(
            "relative flex flex-col rounded-xl border bg-card transition-all duration-150",
            focused
              ? "border-ring shadow-sm ring-1 ring-ring/20"
              : "border-border",
          )}
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={3}
            className="resize-none rounded-t-xl rounded-b-none border-0 bg-transparent px-3.5 pt-3 pb-2 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60"
          />

          <div className="flex items-center justify-between gap-2 border-t border-border/60 px-2 py-1.5">
            <div className="flex items-center gap-0.5">
              <ToolbarButton
                icon={Bold}
                label="Bold (⌘B)"
                onClick={() => wrapSelection("**")}
              />
              <ToolbarButton
                icon={Italic}
                label="Italic (⌘I)"
                onClick={() => wrapSelection("_")}
              />
              <ToolbarButton
                icon={Code}
                label="Inline code"
                onClick={() => wrapSelection("`")}
              />
              <div className="mx-1 h-3.5 w-px bg-border" />
              <ToolbarButton
                icon={Link}
                label="Add link"
                onClick={() => wrapSelection("[", "](url)")}
              />
              <ToolbarButton
                icon={AtSign}
                label="Mention"
                onClick={() => wrapSelection("@")}
              />
              <EmojiPicker
                side="top"
                align="start"
                onEmojiSelect={(emoji) => {
                  const el = textareaRef.current;
                  if (!el) {
                    setValue((v) => v + emoji);
                    return;
                  }
                  const { selectionStart: start, selectionEnd: end } = el;
                  setValue((v) => v.slice(0, start) + emoji + v.slice(end));
                  requestAnimationFrame(() => {
                    el.selectionStart = el.selectionEnd = start + emoji.length;
                    el.focus();
                  });
                }}
                trigger={
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <span className="text-sm">🙂</span>
                    <span className="sr-only">Emoji</span>
                  </button>
                }
              />
            </div>

            <span
              className={cn(
                "text-[11px] tabular-nums transition-colors",
                isOverLimit
                  ? "text-destructive"
                  : remaining <= 100
                    ? "text-amber-500"
                    : "text-muted-foreground/50",
              )}
            >
              {remaining < MAX_CHARS && remaining}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-2 overflow-hidden transition-all duration-200",
            focused || value
              ? "mt-2 max-h-10 opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <p className="text-[11px] text-muted-foreground/50">
            ⌘ + Enter to submit
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-3 text-xs text-muted-foreground"
              onClick={() => {
                setValue("");
                onCancel?.();
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              disabled={isEmpty || isOverLimit}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
