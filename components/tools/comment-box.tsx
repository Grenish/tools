"use client";

import { useState, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
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

// ─── Variants ─────────────────────────────────────────────────────────────────

const commentBoxVariants = cva(
  "relative flex flex-col transition-all duration-150",
  {
    variants: {
      /**
       * variant
       * ───────
       * default   — bordered card, toolbar divider, ring on focus
       * outline   — transparent bg, border always on, no fill
       * ghost     — no border, no bg; goes flush with page surface
       * underline — bottom-border only; inline form-field aesthetic
       */
      variant: {
        default:
          "rounded-xl border bg-card data-[focused=true]:border-ring data-[focused=true]:shadow-sm data-[focused=true]:ring-1 data-[focused=true]:ring-ring/20",
        outline:
          "rounded-xl border border-border bg-transparent data-[focused=true]:border-foreground/40",
        ghost:
          "rounded-xl border border-transparent bg-transparent data-[focused=true]:bg-accent/30",
        underline:
          "rounded-none border-b border-border bg-transparent data-[focused=true]:border-foreground/60",
      },
      /**
       * size
       * ────
       * sm  — compact; reply threads, sidebars
       * md  — default; general purpose
       * lg  — spacious; primary comment sections
       */
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const textareaVariants = cva(
  "w-full resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50",
  {
    variants: {
      variant: {
        default: "rounded-t-xl rounded-b-none px-3.5",
        outline: "rounded-t-xl rounded-b-none px-3.5",
        ghost: "rounded-xl px-3.5",
        underline: "rounded-none px-0",
      },
      size: {
        sm: "pt-2.5 pb-1.5 text-xs",
        md: "pt-3   pb-2   text-sm",
        lg: "pt-3.5 pb-2   text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

const toolbarVariants = cva("flex items-center justify-between gap-2", {
  variants: {
    variant: {
      default: "border-t border-border/60 px-2 py-1.5",
      outline: "border-t border-border/40 px-2 py-1.5",
      ghost: "mt-1 px-2 py-1",
      underline: "mt-1 px-0 py-1",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

// ─── Size maps ─────────────────────────────────────────────────────────────────

type Size = NonNullable<VariantProps<typeof commentBoxVariants>["size"]>;

const ROWS: Record<Size, number> = { sm: 2, md: 3, lg: 4 };
const BTN_SIZE: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};
const ICON_SIZE: Record<Size, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};
const EMOJI_SIZE: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};
const AVATAR_SIZE: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};
const AVATAR_TEXT: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};
const ACTION_TEXT: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-[11px]",
  lg: "text-xs",
};
const ACTION_BTN: Record<Size, string> = {
  sm: "h-6 px-2 text-[10px]",
  md: "h-7 px-3 text-xs",
  lg: "h-8 px-3 text-xs",
};
const COUNTER_TEXT: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-[11px]",
  lg: "text-xs",
};

const MAX_CHARS = 1000;

// ─── ToolbarButton ─────────────────────────────────────────────────────────────

function ToolbarButton({
  icon: Icon,
  label,
  size = "md",
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  size?: Size;
  onClick: () => void;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onClick}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              BTN_SIZE[size],
            )}
          >
            <Icon className={ICON_SIZE[size]} />
            <span className="sr-only">{label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────

export interface CommentBoxProps extends VariantProps<
  typeof commentBoxVariants
> {
  avatarSrc?: string;
  avatarFallback?: string;
  /** Hide the avatar entirely. Default: true */
  showAvatar?: boolean;
  /** Hide the formatting toolbar. Default: true */
  showToolbar?: boolean;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  className?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CommentBox({
  variant = "default",
  size = "md",
  avatarSrc,
  avatarFallback = "GR",
  showAvatar = true,
  showToolbar = true,
  placeholder = "Leave a comment...",
  onSubmit,
  onCancel,
  className,
}: CommentBoxProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const s = (size ?? "md") as Size;
  const v = (variant ?? "default") as NonNullable<
    VariantProps<typeof commentBoxVariants>["variant"]
  >;

  const remaining = MAX_CHARS - value.length;
  const isOverLimit = remaining < 0;
  const isEmpty = value.trim().length === 0;

  const wrapSelection = (before: string, after = before) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);
    setValue(
      value.slice(0, start) + before + selected + after + value.slice(end),
    );
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

  return (
    <div className={cn("flex w-full max-w-2xl gap-3", className)}>
      {/* Avatar */}
      {showAvatar && (
        <Avatar className={cn("mt-0.5 shrink-0 rounded-full", AVATAR_SIZE[s])}>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className={cn("font-medium", AVATAR_TEXT[s])}>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-1 flex-col">
        {/* Input shell */}
        <div
          data-focused={focused}
          className={commentBoxVariants({ variant: v, size: s })}
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={placeholder}
            rows={ROWS[s]}
            className={textareaVariants({ variant: v, size: s })}
          />

          {/* Toolbar */}
          {showToolbar && (
            <div className={toolbarVariants({ variant: v, size: s })}>
              <div className="flex items-center gap-0.5">
                <ToolbarButton
                  icon={Bold}
                  label="Bold (⌘B)"
                  size={s}
                  onClick={() => wrapSelection("**")}
                />
                <ToolbarButton
                  icon={Italic}
                  label="Italic (⌘I)"
                  size={s}
                  onClick={() => wrapSelection("_")}
                />
                <ToolbarButton
                  icon={Code}
                  label="Inline code"
                  size={s}
                  onClick={() => wrapSelection("`")}
                />
                <div className="mx-1 h-3.5 w-px bg-border" />
                <ToolbarButton
                  icon={Link}
                  label="Add link"
                  size={s}
                  onClick={() => wrapSelection("[", "](url)")}
                />
                <ToolbarButton
                  icon={AtSign}
                  label="Mention"
                  size={s}
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
                    setValue(
                      (prev) => prev.slice(0, start) + emoji + prev.slice(end),
                    );
                    requestAnimationFrame(() => {
                      el.selectionStart = el.selectionEnd =
                        start + emoji.length;
                      el.focus();
                    });
                  }}
                  trigger={
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors",
                        "hover:bg-accent hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        BTN_SIZE[s],
                      )}
                    >
                      <span className={EMOJI_SIZE[s]}>🙂</span>
                      <span className="sr-only">Emoji</span>
                    </button>
                  }
                />
              </div>

              {/* Character counter */}
              <span
                className={cn(
                  "tabular-nums transition-colors",
                  COUNTER_TEXT[s],
                  isOverLimit
                    ? "text-destructive"
                    : remaining <= 100
                      ? "text-amber-500"
                      : "text-muted-foreground/40",
                )}
              >
                {remaining < MAX_CHARS && remaining}
              </span>
            </div>
          )}
        </div>

        {/* Action bar — slides in on focus or content */}
        <div
          className={cn(
            "flex items-center justify-between gap-2 overflow-hidden transition-all duration-200",
            focused || value
              ? "mt-2 max-h-10 opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <p className={cn("text-muted-foreground/40", ACTION_TEXT[s])}>
            ⌘ + Enter to submit
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              className={cn("text-muted-foreground", ACTION_BTN[s])}
              onClick={() => {
                setValue("");
                onCancel?.();
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className={ACTION_BTN[s]}
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
