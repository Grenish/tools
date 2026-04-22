"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FolderOpen,
  Folder,
  Copy,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  language?: string;
}

interface CodeViewerProps {
  files: FileItem[];
  defaultSelectedPath?: string;
  className?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

interface TreeItemProps {
  item: FileItem;
  level: number;
  onSelect: (path: string, content?: string, language?: string) => void;
  selectedPath: string | null;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
}

const LANGUAGE_BADGE_COLORS: Record<string, string> = {
  typescript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  javascript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  tsx: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  jsx: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  css: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  json: "bg-green-500/10 text-green-400 border-green-500/20",
  rust: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function getFileExtension(name: string): string {
  return name.split(".").pop()?.toLowerCase() || "";
}

function findFileByPath(
  items: FileItem[],
  targetPath?: string,
): FileItem | undefined {
  if (!targetPath) return undefined;

  for (const item of items) {
    if (item.path === targetPath && item.type === "file") return item;
    if (item.children) {
      const match = findFileByPath(item.children, targetPath);
      if (match) return match;
    }
  }

  return undefined;
}

function TreeItem({
  item,
  level,
  onSelect,
  selectedPath,
  expandedFolders,
  onToggleFolder,
}: TreeItemProps) {
  const isFolder = item.type === "folder";
  const isExpanded = expandedFolders.has(item.path);
  const isSelected = selectedPath === item.path;

  return (
    <div>
      <button
        onClick={() =>
          isFolder
            ? onToggleFolder(item.path)
            : onSelect(item.path, item.content, item.language)
        }
        className={cn(
          "group w-full flex items-center gap-2 px-2 py-1.25 rounded-md text-sm transition-all duration-100",
          "text-muted-foreground hover:text-foreground hover:bg-accent/60",
          isSelected && !isFolder && "bg-accent text-foreground font-medium",
        )}
        style={{ paddingLeft: `${level * 14 + 8}px` }}
      >
        {isFolder ? (
          <>
            <span className="shrink-0 text-muted-foreground/60">
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
            {isExpanded ? (
              <FolderOpen className="w-3.5 h-3.5 shrink-0 text-amber-400/80" />
            ) : (
              <Folder className="w-3.5 h-3.5 shrink-0 text-amber-400/60" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5 shrink-0" />
            <FileCode2 className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
          </>
        )}
        <span className="truncate text-[13px] leading-none">{item.name}</span>
      </button>

      {isFolder && isExpanded && item.children && (
        <div className="relative">
          <span
            className="absolute top-0 bottom-0 left-0 w-px bg-border/50"
            style={{ left: `${level * 14 + 15}px` }}
          />
          {item.children.map((child) => (
            <TreeItem
              key={child.path}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LineNumbers({ count }: { count: number }) {
  return (
    <div className="select-none pr-4 text-right" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="leading-6 text-[12px] text-muted-foreground/30 font-mono"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function CodeContent({
  content,
  showLineNumbers,
  highlightLines,
}: {
  content: string;
  showLineNumbers: boolean;
  highlightLines: number[];
}) {
  const lines = content.split("\n");

  return (
    <div className="flex min-w-max">
      {showLineNumbers && <LineNumbers count={lines.length} />}
      <div className="min-w-max">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "leading-6 text-[13px] font-mono whitespace-pre",
              highlightLines.includes(i + 1)
                ? "bg-primary/5 border-l-2 border-primary pl-2 -ml-2"
                : "",
            )}
          >
            {line || <span className="text-transparent">·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeViewer({
  files,
  defaultSelectedPath,
  className,
  showLineNumbers = true,
  highlightLines = [],
}: CodeViewerProps) {
  const defaultSelectedFile = findFileByPath(files, defaultSelectedPath);
  const [selectedPath, setSelectedPath] = useState<string | null>(
    defaultSelectedPath ?? null,
  );
  const [selectedContent, setSelectedContent] = useState(
    defaultSelectedFile?.content ?? "",
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    defaultSelectedFile?.language ?? "typescript",
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectFile = (
    path: string,
    content?: string,
    language?: string,
  ) => {
    setSelectedPath(path);
    setSelectedContent(content ?? "");
    setSelectedLanguage(language ?? "typescript");
  };

  const handleToggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(selectedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fileName = selectedPath?.split("/").pop() ?? "";
  const ext = getFileExtension(fileName);
  const langColor =
    LANGUAGE_BADGE_COLORS[selectedLanguage] ?? LANGUAGE_BADGE_COLORS[ext] ?? "";

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "flex overflow-hidden rounded-xl border border-border bg-background shadow-sm",
          "h-120",
          className,
        )}
      >
        {/* Sidebar */}
        <div
          className={cn(
            "flex flex-col border-r border-border bg-muted/30 transition-all duration-200 ease-in-out",
            sidebarOpen
              ? "w-56 min-w-56"
              : "w-0 min-w-0 overflow-hidden border-r-0",
          )}
        >
          <div className="flex items-center justify-between px-3 h-11 border-b border-border shrink-0">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 select-none">
              Explorer
            </span>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-2 space-y-0.5">
              {files.map((item) => (
                <TreeItem
                  key={item.path}
                  item={item}
                  level={0}
                  onSelect={handleSelectFile}
                  selectedPath={selectedPath}
                  expandedFolders={expandedFolders}
                  onToggleFolder={handleToggleFolder}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between h-11 px-2 border-b border-border bg-muted/20 shrink-0 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setSidebarOpen((v) => !v)}
                  >
                    {sidebarOpen ? (
                      <PanelLeftClose className="w-4 h-4" />
                    ) : (
                      <PanelLeftOpen className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                </TooltipContent>
              </Tooltip>

              {selectedPath && (
                <>
                  <Separator orientation="vertical" className="h-4 mx-1" />
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[13px] text-muted-foreground truncate max-w-50 sm:max-w-xs">
                      {selectedPath}
                    </span>
                    {selectedLanguage && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0 h-4 font-mono tracking-wide hidden sm:flex",
                          langColor,
                        )}
                      >
                        {selectedLanguage}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>

            {selectedPath && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {copied ? "Copied!" : "Copy code"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Code Area */}
          {selectedPath ? (
            <ScrollArea className="min-h-0 flex-1">
              <div className="p-4 sm:p-5">
                <CodeContent
                  content={selectedContent}
                  showLineNumbers={showLineNumbers}
                  highlightLines={highlightLines}
                />
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
              <div className="w-10 h-10 rounded-lg border border-border bg-muted/50 flex items-center justify-center">
                <FileCode2 className="w-5 h-5 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  No file selected
                </p>
                <p className="text-xs text-muted-foreground">
                  Pick a file from the explorer to view its contents
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
