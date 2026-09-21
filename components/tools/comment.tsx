"use client";

import { useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Flag,
  Reply,
  ChevronDown,
} from "lucide-react";

// ─── Variants ─────────────────────────────────────────────────────────────────

const commentVariants = cva("flex gap-3", {
  variants: {
    /**
     * variant
     * ───────
     * default  — full chrome: name + username + badge + timestamp
     * compact  — name + timestamp on one line, no username row
     * minimal  — no avatar, no badge, inline thread feel
     * bubble   — comment body in a soft rounded bubble
     */
    variant: {
      default: "",
      compact: "",
      minimal: "",
      bubble: "",
    },
    /**
     * size
     * ────
     * sm  — tight spacing; nested replies, sidebars
     * md  — default; general purpose
     * lg  — airy; primary comment threads
     */
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

// ─── Size maps ────────────────────────────────────────────────────────────────

type Size = NonNullable<VariantProps<typeof commentVariants>["size"]>;
type Variant = NonNullable<VariantProps<typeof commentVariants>["variant"]>;

const AVATAR_SIZE: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};
const AVATAR_TEXT: Record<Size, string> = {
  sm: "text-[9px]",
  md: "text-[11px]",
  lg: "text-xs",
};
const NAME_TEXT: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};
const BODY_TEXT: Record<Size, string> = {
  sm: "text-xs leading-relaxed",
  md: "text-sm leading-relaxed",
  lg: "text-base leading-relaxed",
};
const META_TEXT: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-[11px]",
  lg: "text-xs",
};
const GAP: Record<Size, string> = {
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
};
const VOTE_BTN: Record<Size, string> = {
  sm: "h-6 px-2 gap-1 text-[11px]",
  md: "h-7 px-2.5 gap-1.5 text-xs",
  lg: "h-8 px-3 gap-2 text-sm",
};
const VOTE_ICON: Record<Size, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};
const REPLY_BTN: Record<Size, string> = {
  sm: "h-6 px-2 gap-1 text-[11px]",
  md: "h-7 px-2.5 gap-1.5 text-xs",
  lg: "h-8 px-3 gap-2 text-sm",
};
const MORE_BTN: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};
const MORE_ICON: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4",
};
const THREAD_INDENT: Record<Size, string> = {
  sm: "ml-3 pl-3",
  md: "ml-4 pl-4",
  lg: "ml-5 pl-5",
};
const BUBBLE_CLS: Record<Variant, string> = {
  default: "",
  compact: "",
  minimal: "",
  bubble: "rounded-2xl rounded-tl-sm bg-muted/50 px-3.5 py-2.5",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function formatStaticDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function renderMentions(text: string) {
  const re = /@[A-Za-z0-9_]+/g;
  const parts: (string | React.ReactNode)[] = [];
  let last = 0,
    match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <strong key={match.index} className="font-semibold">
        {match[0]}
      </strong>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}

// ─── VoteButton ───────────────────────────────────────────────────────────────

function VoteButton({
  icon: Icon,
  count,
  active,
  activeClass,
  label,
  size = "md",
  variant = "default",
  onClick,
}: {
  icon: React.ElementType;
  count: number;
  active: boolean;
  activeClass: string;
  label: string;
  size?: Size;
  variant?: Variant;
  onClick: () => void;
}) {
  const isFlat = variant === "minimal";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group flex items-center rounded-full font-medium transition-all duration-150",
        VOTE_BTN[size],
        isFlat
          ? active
            ? cn(
                "text-foreground",
                activeClass
                  .split(" ")
                  .filter((c) => c.startsWith("text-"))
                  .join(" "),
              )
            : "text-muted-foreground hover:text-foreground"
          : active
            ? cn("border border-transparent", activeClass)
            : "border border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          VOTE_ICON[size],
          "transition-transform duration-150 group-active:scale-90",
          !active && "group-hover:scale-110",
        )}
      />
      {count > 0 && <span className="tabular-nums">{count}</span>}
    </button>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommentAuthor {
  name: string;
  username: string;
  avatarSrc?: string;
  initials?: string;
}
export interface CommentData {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: Date | string;
  isOwn?: boolean;
  likes?: number;
  dislikes?: number;
  replies?: CommentData[];
}
export interface CommentProps
  extends CommentData, VariantProps<typeof commentVariants> {
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  onDelete?: (id: string) => void;
  onReport?: (id: string) => void;
  onReply?: (id: string, content: string) => void;
  depth?: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Comment({
  id,
  author,
  content,
  createdAt,
  isOwn = false,
  likes = 0,
  dislikes = 0,
  replies = [],
  depth = 0,
  variant = "default",
  size = "md",
  onLike,
  onDislike,
  onEdit,
  onDelete,
  onReport,
  onReply,
  className,
}: CommentProps) {
  const s = (size ?? "md") as Size;
  const v = (variant ?? "default") as Variant;

  const [vote, setVote] = useState<"like" | "dislike" | null>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [replying, setReplying] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [showReplies, setShowReplies] = useState(true);
  const [timeLabel, setTimeLabel] = useState(() => formatStaticDate(createdAt));

  useEffect(() => {
    setTimeLabel(formatRelativeTime(createdAt));
  }, [createdAt]);

  const handleLike = () => {
    if (vote === "like") {
      setVote(null);
      setLikeCount((n) => n - 1);
    } else {
      if (vote === "dislike") setDislikeCount((n) => n - 1);
      setVote("like");
      setLikeCount((n) => n + 1);
    }
    onLike?.(id);
  };
  const handleDislike = () => {
    if (vote === "dislike") {
      setVote(null);
      setDislikeCount((n) => n - 1);
    } else {
      if (vote === "like") setLikeCount((n) => n - 1);
      setVote("dislike");
      setDislikeCount((n) => n + 1);
    }
    onDislike?.(id);
  };
  const handleEditSave = () => {
    if (editValue.trim() && editValue !== content)
      onEdit?.(id, editValue.trim());
    setEditing(false);
  };
  const handleReplySubmit = () => {
    if (replyValue.trim()) {
      onReply?.(id, replyValue.trim());
      setReplyValue("");
      setReplying(false);
    }
  };

  const avatarFallback = author.initials ?? initials(author.name);
  const showAvatar = v !== "minimal";

  return (
    <div
      className={cn(
        commentVariants({ variant: v, size: s }),
        depth > 0 && "relative",
        className,
      )}
    >
      {/* Thread connector line */}
      {depth > 0 && (
        <div className="absolute -left-4 top-0 h-full w-px bg-border/50" />
      )}

      {/* Avatar */}
      {showAvatar && (
        <Avatar className={cn("mt-0.5 shrink-0", AVATAR_SIZE[s])}>
          <AvatarImage src={author.avatarSrc} />
          <AvatarFallback className={cn("font-medium", AVATAR_TEXT[s])}>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="min-w-0 flex-1">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2">
          <div className={cn("flex flex-col", GAP[s])}>
            {/* default — two-row header */}
            {v === "default" && (
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn("font-semibold leading-none", NAME_TEXT[s])}
                  >
                    {author.name}
                  </span>
                  <span
                    className={cn("text-muted-foreground/60", META_TEXT[s])}
                  >
                    @{author.username}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isOwn && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-1.5 py-0 font-medium leading-tight",
                        META_TEXT[s],
                      )}
                    >
                      you
                    </Badge>
                  )}
                  <span className={cn("text-muted-foreground", META_TEXT[s])}>
                    {timeLabel}
                  </span>
                </div>
              </div>
            )}

            {/* bubble — single-row: name · @username · badge · time all inline */}
            {v === "bubble" && (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span
                  className={cn("font-semibold leading-none", NAME_TEXT[s])}
                >
                  {author.name}
                </span>
                <span className={cn("text-muted-foreground/60", META_TEXT[s])}>
                  @{author.username}
                </span>
                {isOwn && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-1.5 py-0 font-medium leading-tight",
                      META_TEXT[s],
                    )}
                  >
                    you
                  </Badge>
                )}
                <span className={cn("text-muted-foreground", META_TEXT[s])}>
                  {timeLabel}
                </span>
              </div>
            )}

            {/* compact — single-row header */}
            {v === "compact" && (
              <div className="flex items-baseline gap-2">
                <span
                  className={cn("font-semibold leading-none", NAME_TEXT[s])}
                >
                  {author.name}
                </span>
                {isOwn && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-1.5 py-0 font-medium leading-tight",
                      META_TEXT[s],
                    )}
                  >
                    you
                  </Badge>
                )}
                <span className={cn("text-muted-foreground", META_TEXT[s])}>
                  {timeLabel}
                </span>
              </div>
            )}

            {/* minimal — name + time inline, no username */}
            {v === "minimal" && (
              <div className="flex items-baseline gap-2">
                <span
                  className={cn("font-semibold leading-none", NAME_TEXT[s])}
                >
                  {author.name}
                </span>
                {isOwn && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-1.5 py-0 font-medium leading-tight",
                      META_TEXT[s],
                    )}
                  >
                    you
                  </Badge>
                )}
                <span className={cn("text-muted-foreground", META_TEXT[s])}>
                  {timeLabel}
                </span>
              </div>
            )}
          </div>

          {/* ⋯ menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "shrink-0 text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground",
                  MORE_BTN[s],
                )}
              >
                <MoreHorizontal className={MORE_ICON[s]} />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {isOwn ? (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setEditValue(content);
                      setEditing(true);
                    }}
                    className="gap-2 text-sm"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(id)}
                    className="gap-2 text-sm text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => onReport?.(id)}
                  className="gap-2 text-sm text-destructive focus:text-destructive"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Report
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className={cn("mt-1.5", v === "bubble" && "mt-2")}>
          {editing ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                rows={3}
                className="resize-none text-sm"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                    handleEditSave();
                  if (e.key === "Escape") setEditing(false);
                }}
              />
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={handleEditSave}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-3 text-xs text-muted-foreground"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <span className="ml-1 text-[11px] text-muted-foreground/50">
                  ⌘ + Enter
                </span>
              </div>
            </div>
          ) : (
            <p
              className={cn("text-foreground/90", BODY_TEXT[s], BUBBLE_CLS[v])}
            >
              {renderMentions(content)}
            </p>
          )}
        </div>

        {/* ── Actions ────────────────────────────────────────────────── */}
        {!editing && (
          <div className={cn("mt-2.5 flex items-center", GAP[s])}>
            <VoteButton
              icon={ThumbsUp}
              count={likeCount}
              active={vote === "like"}
              size={s}
              variant={v}
              activeClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              label="Like"
              onClick={handleLike}
            />
            <VoteButton
              icon={ThumbsDown}
              count={dislikeCount}
              active={vote === "dislike"}
              size={s}
              variant={v}
              activeClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
              label="Dislike"
              onClick={handleDislike}
            />
            {depth < 3 && (
              <button
                type="button"
                onClick={() => setReplying((r) => !r)}
                className={cn(
                  "flex items-center rounded-full font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  REPLY_BTN[s],
                )}
              >
                <Reply className={VOTE_ICON[s]} />
                Reply
              </button>
            )}
          </div>
        )}

        {/* ── Reply box ──────────────────────────────────────────────── */}
        {replying && (
          <div className="mt-3 flex flex-col gap-2">
            <Textarea
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
              autoFocus
              rows={2}
              placeholder={`Reply to ${author.name}…`}
              className="resize-none text-sm"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                  handleReplySubmit();
                if (e.key === "Escape") setReplying(false);
              }}
            />
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                className="h-7 px-3 text-xs"
                disabled={!replyValue.trim()}
                onClick={handleReplySubmit}
              >
                Reply
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-3 text-xs text-muted-foreground"
                onClick={() => {
                  setReplying(false);
                  setReplyValue("");
                }}
              >
                Cancel
              </Button>
              <span className="ml-1 text-[11px] text-muted-foreground/50">
                ⌘ + Enter
              </span>
            </div>
          </div>
        )}

        {/* ── Nested replies ─────────────────────────────────────────── */}
        {replies.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowReplies((r) => !r)}
              className={cn(
                "mb-3 flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground",
                META_TEXT[s],
              )}
            >
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  !showReplies && "-rotate-90",
                )}
              />
              {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </button>

            {showReplies && (
              <div
                className={cn(
                  "relative flex flex-col gap-4 border-l border-border/50",
                  THREAD_INDENT[s],
                )}
              >
                {replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    {...reply}
                    variant={v}
                    size={s}
                    depth={depth + 1}
                    onLike={onLike}
                    onDislike={onDislike}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReport={onReport}
                    onReply={onReply}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
