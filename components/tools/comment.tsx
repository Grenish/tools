"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Badge } from "../ui/badge";

export interface CommentAuthor {
  name: string;
  username: string;
  avatarSrc?: string;
  /** Initials fallback, e.g. "JD" */
  initials?: string;
}

export interface CommentData {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: Date | string;
  /** Whether this comment belongs to the current user (controls edit/delete vs report) */
  isOwn?: boolean;
  likes?: number;
  dislikes?: number;
  replies?: CommentData[];
}

export interface CommentProps extends CommentData {
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  onDelete?: (id: string) => void;
  onReport?: (id: string) => void;
  onReply?: (id: string, content: string) => void;
  /** Nesting depth — indentation stops at 3 */
  depth?: number;
}

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
  const mentionRegex = /@[A-Za-z0-9_]+/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    // Add text before mention
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add bold mention
    parts.push(
      <strong key={`mention-${match.index}`} className="font-semibold">
        {match[0]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function VoteButton({
  icon: Icon,
  count,
  active,
  activeClass,
  label,
  onClick,
}: {
  icon: React.ElementType;
  count: number;
  active: boolean;
  activeClass: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-all duration-150",
        active
          ? cn("border-transparent", activeClass)
          : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-150 group-active:scale-90",
          active ? "" : "group-hover:scale-110",
        )}
      />
      {count > 0 && <span className="tabular-nums">{count}</span>}
    </button>
  );
}

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
  onLike,
  onDislike,
  onEdit,
  onDelete,
  onReport,
  onReply,
}: CommentProps) {
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
    if (editValue.trim() && editValue !== content) {
      onEdit?.(id, editValue.trim());
    }
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

  return (
    <div className={cn("flex gap-3", depth > 0 && "relative")}>
      {/* Thread line for nested comments */}
      {depth > 0 && (
        <div className="absolute -left-4 top-0 h-full w-px bg-border/50" />
      )}

      <Avatar className="mt-0.5 h-8 w-8 shrink-0">
        <AvatarImage src={author.avatarSrc} />
        <AvatarFallback className="text-[11px] font-medium">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium leading-none">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground/70">
                @{author.username}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              {isOwn && <Badge variant={"outline"}>You</Badge>}
              <span className="text-[11px] text-muted-foreground">
                {timeLabel}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
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

        {/* Body */}
        <div className="mt-1.5">
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
            <p className="text-sm leading-relaxed text-foreground/90">
              {renderMentions(content)}
            </p>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="mt-2.5 flex items-center gap-1.5">
            <VoteButton
              icon={ThumbsUp}
              count={likeCount}
              active={vote === "like"}
              activeClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              label="Like"
              onClick={handleLike}
            />
            <VoteButton
              icon={ThumbsDown}
              count={dislikeCount}
              active={vote === "dislike"}
              activeClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
              label="Dislike"
              onClick={handleDislike}
            />

            {depth < 3 && (
              <button
                type="button"
                onClick={() => setReplying((v) => !v)}
                className="flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Reply className="h-3.5 w-3.5" />
                Reply
              </button>
            )}
          </div>
        )}

        {/* Reply box */}
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

        {/* Nested replies */}
        {replies.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowReplies((v) => !v)}
              className="mb-3 flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
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
              <div className="relative ml-4 flex flex-col gap-4 border-l border-border/50 pl-4">
                {replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    {...reply}
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
