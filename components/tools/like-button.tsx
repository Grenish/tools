"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  Star,
  Flame,
  type LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Reaction = {
  id: string;
  icon: ReactNode;
  label?: string;
  count?: number;
  /** Hex or Tailwind-compatible color string used for ambience tinting */
  color?: string;
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 font-medium select-none",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground " +
          "data-[active=true]:text-foreground",
        ghost:
          "rounded-full bg-transparent text-muted-foreground " +
          "hover:text-foreground " +
          "data-[active=true]:text-foreground",
        soft:
          "rounded-full bg-muted/60 text-muted-foreground " +
          "hover:bg-muted hover:text-foreground " +
          "data-[active=true]:bg-muted data-[active=true]:text-foreground",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-8 px-3   text-sm",
        icon: "h-8 w-8",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type Size = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const ICON_SIZE: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  icon: "h-4 w-4",
  "icon-sm": "h-3.5 w-3.5",
};

// ─── Built-in icons ───────────────────────────────────────────────────────────

const BUILTIN_ICONS: Record<
  "default" | "love" | "dislike" | "fire" | "star",
  { icon: LucideIcon; label: string }
> = {
  default: { icon: ThumbsUp, label: "Like" },
  love: { icon: Heart, label: "Love" },
  dislike: { icon: ThumbsDown, label: "Dislike" },
  fire: { icon: Flame, label: "Fire" },
  star: { icon: Star, label: "Star" },
};

// ─── Count formatter ──────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

// ─── Ambience layer ───────────────────────────────────────────────────────────

function AmbienceLayer({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
      style={{ background: color, opacity: 0.1 }}
    />
  );
}

// ─── Shared wrapper: tooltip + optional ambience ──────────────────────────────

function WithTooltip({
  content,
  children,
}: {
  content?: string | ReactNode;
  children: ReactNode;
}) {
  if (!content) return <>{children}</>;
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="text-xs">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE: default
// ═══════════════════════════════════════════════════════════════════════════════

interface DefaultProps {
  type?: "default";
  iconType?: "default" | "love" | "dislike" | "fire" | "star" | "custom";
  customIcon?: ReactNode;
  content?: "like" | ReactNode;
  count?: number;
  variant?: Variant;
  size?: Size;
  tooltipContent?: string | ReactNode;
  ambience?: boolean;
  ambienceColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function DefaultButton({
  iconType = "default",
  customIcon,
  content = "like",
  count = 0,
  variant = "default",
  size = "md",
  tooltipContent,
  ambience = false,
  ambienceColor = "hsl(var(--foreground))",
  onClick,
  disabled,
  className,
}: DefaultProps) {
  const [active, setActive] = useState(false);
  const [localCount, setLocalCount] = useState(count);

  const isIconOnly = size === "icon" || size === "icon-sm";
  const preset =
    iconType !== "custom" ? BUILTIN_ICONS[iconType] : BUILTIN_ICONS["default"];
  const Icon = preset.icon;
  const iconCls = ICON_SIZE[size ?? "md"];

  const handleClick = () => {
    const next = !active;
    setActive(next);
    setLocalCount((c) => c + (next ? 1 : -1));
    onClick?.();
  };

  const resolvedContent = content === "like" ? preset.label : content;

  return (
    <div className="inline-flex items-center gap-2">
      <WithTooltip content={tooltipContent}>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={
            active ? `Remove ${preset.label.toLowerCase()}` : preset.label
          }
          disabled={disabled}
          data-active={active}
          onClick={handleClick}
          className={cn(
            buttonVariants({ variant, size }),
            "relative overflow-hidden",
            className,
          )}
        >
          {ambience && active && <AmbienceLayer color={ambienceColor} />}

          <span
            className={cn(
              "relative shrink-0 transition-transform duration-150",
              active ? "-translate-y-px" : "",
            )}
          >
            {iconType === "custom" && customIcon ? (
              customIcon
            ) : (
              <Icon
                className={cn(iconCls, "transition-all duration-150")}
                strokeWidth={active ? 2 : 1.75}
              />
            )}
          </span>

          {!isIconOnly && (
            <span className="relative transition-colors duration-150">
              {resolvedContent}
            </span>
          )}
        </button>
      </WithTooltip>

      {/* Count — always outside the button */}
      {localCount > 0 && (
        <span className="min-w-[1ch] tabular-nums text-xs text-muted-foreground transition-all duration-150">
          {fmt(localCount)}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE: reaction  (hover/long-press reveals picker)
// ═══════════════════════════════════════════════════════════════════════════════

interface ReactionProps {
  type: "reaction";
  reactions: Reaction[];
  selectedReaction?: string | null;
  onReactionChange?: (id: string) => void;
  count?: number;
  variant?: Variant;
  size?: Size;
  tooltipContent?: string | ReactNode;
  ambience?: boolean;
  content?: "like" | ReactNode;
  disabled?: boolean;
  className?: string;
}

function ReactionButton({
  reactions,
  selectedReaction: controlled,
  onReactionChange,
  count = 0,
  variant = "default",
  size = "md",
  tooltipContent,
  ambience = false,
  content = "like",
  disabled,
  className,
}: ReactionProps) {
  const [selected, setSelected] = useState<string | null>(controlled ?? null);
  const [localCount, setLocalCount] = useState(count);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlled !== undefined;
  const activeId = isControlled ? controlled : selected;
  const activeReaction = reactions.find((r) => r.id === activeId) ?? null;

  const isIconOnly = size === "icon" || size === "icon-sm";
  const iconCls = ICON_SIZE[size ?? "md"];

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(() => setOpen(false), []);

  const handleMouseEnter = () => {
    // Clear any pending close, then schedule open
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(openPicker, 300);
  };
  const handleMouseLeave = () => {
    // Clear any pending open/close, then schedule close
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(closePicker, 150);
  };

  // Long press
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTouchStart = () => {
    longPressRef.current = setTimeout(openPicker, 500);
  };
  const handleTouchEnd = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
  };

  // Click main button: toggle if already selected, else open
  const handleMainClick = () => {
    if (disabled) return;
    if (!open && activeId) {
      // deselect
      if (!isControlled) setSelected(null);
      setLocalCount((c) => Math.max(0, c - 1));
      onReactionChange?.("");
    } else {
      openPicker();
    }
  };

  const handleSelect = (r: Reaction) => {
    if (!isControlled) setSelected(r.id);
    if (!activeId) setLocalCount((c) => c + 1);
    onReactionChange?.(r.id);
    closePicker();
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closePicker();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closePicker]);

  return (
    <div className="inline-flex items-center gap-2">
      <div
        ref={containerRef}
        className="relative inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main button */}
        <WithTooltip content={!open ? tooltipContent : undefined}>
          <button
            type="button"
            role="switch"
            aria-checked={!!activeId}
            aria-haspopup="listbox"
            aria-expanded={open}
            disabled={disabled}
            data-active={!!activeId}
            onClick={handleMainClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={cn(
              buttonVariants({ variant, size }),
              "relative overflow-hidden",
              className,
            )}
          >
            {ambience && activeReaction?.color && (
              <AmbienceLayer color={activeReaction.color} />
            )}

            <span
              className={cn(
                "relative shrink-0 transition-all duration-150",
                activeId ? "-translate-y-px" : "",
              )}
            >
              {activeReaction ? (
                <span className={iconCls}>{activeReaction.icon}</span>
              ) : (
                <ThumbsUp
                  className={cn(iconCls, "transition-all duration-150")}
                  strokeWidth={1.75}
                />
              )}
            </span>

            {!isIconOnly && (
              <span className="relative">
                {activeReaction?.label ??
                  (content === "like" ? "Like" : content)}
              </span>
            )}
          </button>
        </WithTooltip>

        {/* Transparent bridge — fills the 8px gap between button top and
            picker bottom so the mouse never leaves the container while
            transitioning between the two. */}
        <div aria-hidden className="absolute bottom-full left-0 h-2 w-full" />

        {/* Reaction picker */}
        <div
          role="listbox"
          aria-label="Reactions"
          className={cn(
            "absolute bottom-[calc(100%+8px)] left-0 z-50",
            "flex items-center gap-0.5 rounded-full",
            "border border-border/60 bg-popover px-2 py-1.5 shadow-md",
            "transition-all duration-200 origin-bottom-left",
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-1 pointer-events-none",
          )}
        >
          {reactions.map((r) => (
            <button
              key={r.id}
              role="option"
              aria-selected={r.id === activeId}
              type="button"
              title={r.label}
              onClick={() => handleSelect(r)}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full text-base",
                "transition-all duration-150 hover:scale-125",
                r.id === activeId
                  ? "scale-110 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      {localCount > 0 && (
        <span className="min-w-[1ch] tabular-nums text-xs text-muted-foreground">
          {fmt(localCount)}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE: big  (multi-reaction panel — each independently clickable)
// ═══════════════════════════════════════════════════════════════════════════════

interface BigProps {
  type: "big";
  reactions: Reaction[];
  selectedReaction?: string | null;
  onReactionChange?: (id: string) => void;
  variant?: Variant;
  tooltipContent?: string | ReactNode;
  ambience?: boolean;
  disabled?: boolean;
  className?: string;
}

function BigButton({
  reactions,
  selectedReaction: controlled,
  onReactionChange,
  variant = "soft",
  tooltipContent,
  ambience = false,
  disabled,
  className,
}: BigProps) {
  const [selected, setSelected] = useState<string | null>(controlled ?? null);
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(reactions.map((r) => [r.id, r.count ?? 0])),
  );

  const isControlled = controlled !== undefined;
  const activeId = isControlled ? controlled : selected;

  const handleSelect = (r: Reaction) => {
    if (disabled) return;
    const wasActive = r.id === activeId;
    const next = wasActive ? null : r.id;

    if (!isControlled) setSelected(next);
    setCounts((prev) => ({
      ...prev,
      [r.id]: (prev[r.id] ?? 0) + (wasActive ? -1 : 1),
    }));
    onReactionChange?.(wasActive ? "" : r.id);
  };

  return (
    <div className={cn("inline-flex flex-wrap gap-1.5", className)}>
      {reactions.map((r) => {
        const isActive = r.id === activeId;
        const c = counts[r.id] ?? 0;

        return (
          <WithTooltip key={r.id} content={tooltipContent ?? r.label}>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              aria-label={r.label ?? r.id}
              disabled={disabled}
              data-active={isActive}
              onClick={() => handleSelect(r)}
              className={cn(
                buttonVariants({ variant, size: "sm" }),
                "relative overflow-hidden gap-1.5",
              )}
            >
              {ambience && isActive && r.color && (
                <AmbienceLayer color={r.color} />
              )}

              <span
                className={cn(
                  "relative shrink-0 text-base leading-none transition-transform duration-150",
                  isActive ? "-translate-y-px" : "",
                )}
              >
                {r.icon}
              </span>

              {c > 0 && (
                <span
                  className={cn(
                    "relative tabular-nums transition-colors duration-150",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {fmt(c)}
                </span>
              )}
            </button>
          </WithTooltip>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Root export — discriminated union dispatches to the right sub-component
// ═══════════════════════════════════════════════════════════════════════════════

export type LikeButtonProps = DefaultProps | ReactionProps | BigProps;

export default function LikeButton(props: LikeButtonProps) {
  if (props.type === "reaction") return <ReactionButton {...props} />;
  if (props.type === "big") return <BigButton {...props} />;
  return <DefaultButton {...props} />;
}
