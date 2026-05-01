"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Smile,
  Search,
  Clock,
  SmilePlus,
  Trees,
  UtensilsCrossed,
  Zap,
  Plane,
  Lightbulb,
  Hash,
} from "lucide-react";

type EmojiEntry = { e: string; n: string };
type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  emojis: EmojiEntry[];
};

const CATEGORIES: Category[] = [
  {
    id: "smileys",
    label: "Smileys",
    icon: SmilePlus,
    emojis: [
      { e: "😀", n: "grinning face" },
      { e: "😃", n: "grinning face with big eyes" },
      { e: "😄", n: "grinning face with smiling eyes" },
      { e: "😁", n: "beaming face" },
      { e: "😆", n: "grinning squinting face" },
      { e: "😅", n: "grinning face with sweat" },
      { e: "🤣", n: "rolling on the floor laughing" },
      { e: "😂", n: "face with tears of joy" },
      { e: "🙂", n: "slightly smiling face" },
      { e: "🙃", n: "upside-down face" },
      { e: "😉", n: "winking face" },
      { e: "😊", n: "smiling face with smiling eyes" },
      { e: "😇", n: "smiling face with halo" },
      { e: "🥰", n: "smiling face with hearts" },
      { e: "😍", n: "smiling face with heart-eyes" },
      { e: "🤩", n: "star-struck" },
      { e: "😘", n: "face blowing a kiss" },
      { e: "😗", n: "kissing face" },
      { e: "😚", n: "kissing face with closed eyes" },
      { e: "😙", n: "kissing face with smiling eyes" },
      { e: "🥲", n: "smiling face with tear" },
      { e: "😋", n: "face savoring food" },
      { e: "😛", n: "face with tongue" },
      { e: "😜", n: "winking face with tongue" },
      { e: "🤪", n: "zany face" },
      { e: "😝", n: "squinting face with tongue" },
      { e: "🤑", n: "money-mouth face" },
      { e: "🤗", n: "hugging face" },
      { e: "🤭", n: "face with hand over mouth" },
      { e: "🤫", n: "shushing face" },
      { e: "🤔", n: "thinking face" },
      { e: "🤐", n: "zipper-mouth face" },
      { e: "🤨", n: "face with raised eyebrow" },
      { e: "😐", n: "neutral face" },
      { e: "😑", n: "expressionless face" },
      { e: "😶", n: "face without mouth" },
      { e: "😏", n: "smirking face" },
      { e: "😒", n: "unamused face" },
      { e: "🙄", n: "face with rolling eyes" },
      { e: "😬", n: "grimacing face" },
      { e: "😮‍💨", n: "face exhaling" },
      { e: "🤥", n: "lying face" },
      { e: "😌", n: "relieved face" },
      { e: "😔", n: "pensive face" },
      { e: "😪", n: "sleepy face" },
      { e: "🤤", n: "drooling face" },
      { e: "😴", n: "sleeping face" },
      { e: "😷", n: "face with medical mask" },
    ],
  },
  {
    id: "people",
    label: "People",
    icon: SmilePlus,
    emojis: [
      { e: "👋", n: "waving hand" },
      { e: "🤚", n: "raised back of hand" },
      { e: "🖐️", n: "hand with fingers splayed" },
      { e: "✋", n: "raised hand" },
      { e: "🖖", n: "vulcan salute" },
      { e: "👌", n: "OK hand" },
      { e: "🤌", n: "pinched fingers" },
      { e: "✌️", n: "victory hand" },
      { e: "🤞", n: "crossed fingers" },
      { e: "🤙", n: "call me hand" },
      { e: "👈", n: "backhand index pointing left" },
      { e: "👉", n: "backhand index pointing right" },
      { e: "👆", n: "backhand index pointing up" },
      { e: "👇", n: "backhand index pointing down" },
      { e: "☝️", n: "index pointing up" },
      { e: "👍", n: "thumbs up" },
      { e: "👎", n: "thumbs down" },
      { e: "✊", n: "raised fist" },
      { e: "👊", n: "oncoming fist" },
      { e: "🤛", n: "left-facing fist" },
      { e: "🤜", n: "right-facing fist" },
      { e: "👏", n: "clapping hands" },
      { e: "🙌", n: "raising hands" },
      { e: "👐", n: "open hands" },
      { e: "🤲", n: "palms up together" },
      { e: "🙏", n: "folded hands" },
      { e: "✍️", n: "writing hand" },
      { e: "💅", n: "nail polish" },
      { e: "🤳", n: "selfie" },
      { e: "💪", n: "flexed biceps" },
    ],
  },
  {
    id: "nature",
    label: "Nature",
    icon: Trees,
    emojis: [
      { e: "🐶", n: "dog face" },
      { e: "🐱", n: "cat face" },
      { e: "🐭", n: "mouse face" },
      { e: "🐹", n: "hamster" },
      { e: "🐰", n: "rabbit face" },
      { e: "🦊", n: "fox" },
      { e: "🐻", n: "bear" },
      { e: "🐼", n: "panda" },
      { e: "🐨", n: "koala" },
      { e: "🐯", n: "tiger face" },
      { e: "🦁", n: "lion" },
      { e: "🐮", n: "cow face" },
      { e: "🐸", n: "frog" },
      { e: "🐵", n: "monkey face" },
      { e: "🐔", n: "chicken" },
      { e: "🐧", n: "penguin" },
      { e: "🐦", n: "bird" },
      { e: "🦆", n: "duck" },
      { e: "🦅", n: "eagle" },
      { e: "🦉", n: "owl" },
      { e: "🐺", n: "wolf" },
      { e: "🐗", n: "boar" },
      { e: "🐴", n: "horse face" },
      { e: "🦄", n: "unicorn" },
      { e: "🌸", n: "cherry blossom" },
      { e: "🌿", n: "herb" },
      { e: "🍀", n: "four leaf clover" },
      { e: "🌻", n: "sunflower" },
      { e: "🌊", n: "water wave" },
      { e: "🌈", n: "rainbow" },
    ],
  },
  {
    id: "food",
    label: "Food",
    icon: UtensilsCrossed,
    emojis: [
      { e: "🍕", n: "pizza" },
      { e: "🍔", n: "hamburger" },
      { e: "🍟", n: "french fries" },
      { e: "🌭", n: "hot dog" },
      { e: "🌮", n: "taco" },
      { e: "🌯", n: "burrito" },
      { e: "🥗", n: "green salad" },
      { e: "🍜", n: "steaming bowl" },
      { e: "🍣", n: "sushi" },
      { e: "🍱", n: "bento box" },
      { e: "🍛", n: "curry rice" },
      { e: "🍝", n: "spaghetti" },
      { e: "🍦", n: "soft ice cream" },
      { e: "🍩", n: "doughnut" },
      { e: "🍪", n: "cookie" },
      { e: "🎂", n: "birthday cake" },
      { e: "🍰", n: "shortcake" },
      { e: "🧁", n: "cupcake" },
      { e: "☕", n: "hot beverage" },
      { e: "🧋", n: "bubble tea" },
      { e: "🍺", n: "beer mug" },
      { e: "🥂", n: "clinking glasses" },
      { e: "🍷", n: "wine glass" },
      { e: "🥃", n: "tumbler glass" },
      { e: "🍓", n: "strawberry" },
      { e: "🍇", n: "grapes" },
      { e: "🍉", n: "watermelon" },
      { e: "🍑", n: "peach" },
      { e: "🥑", n: "avocado" },
      { e: "🌽", n: "ear of corn" },
    ],
  },
  {
    id: "activity",
    label: "Activity",
    icon: Zap,
    emojis: [
      { e: "⚽", n: "soccer ball" },
      { e: "🏀", n: "basketball" },
      { e: "🏈", n: "american football" },
      { e: "⚾", n: "baseball" },
      { e: "🎾", n: "tennis" },
      { e: "🏐", n: "volleyball" },
      { e: "🏉", n: "rugby football" },
      { e: "🥏", n: "flying disc" },
      { e: "🎱", n: "pool 8 ball" },
      { e: "🏓", n: "ping pong" },
      { e: "🏸", n: "badminton" },
      { e: "🥊", n: "boxing glove" },
      { e: "🎯", n: "direct hit" },
      { e: "🎮", n: "video game" },
      { e: "🎲", n: "game die" },
      { e: "🧩", n: "puzzle piece" },
      { e: "🏆", n: "trophy" },
      { e: "🥇", n: "1st place medal" },
      { e: "🎸", n: "guitar" },
      { e: "🎹", n: "musical keyboard" },
      { e: "🎺", n: "trumpet" },
      { e: "🥁", n: "drum" },
      { e: "🎨", n: "artist palette" },
      { e: "🎭", n: "performing arts" },
      { e: "🎬", n: "clapper board" },
      { e: "🎤", n: "microphone" },
      { e: "🎧", n: "headphone" },
      { e: "📸", n: "camera with flash" },
      { e: "🚴", n: "person biking" },
      { e: "🏋️", n: "person lifting weights" },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    emojis: [
      { e: "🚗", n: "automobile" },
      { e: "🚕", n: "taxi" },
      { e: "🚙", n: "sport utility vehicle" },
      { e: "🚌", n: "bus" },
      { e: "🚎", n: "trolleybus" },
      { e: "🏎️", n: "racing car" },
      { e: "🚓", n: "police car" },
      { e: "🚑", n: "ambulance" },
      { e: "🚒", n: "fire engine" },
      { e: "✈️", n: "airplane" },
      { e: "🚀", n: "rocket" },
      { e: "🛸", n: "flying saucer" },
      { e: "🚁", n: "helicopter" },
      { e: "⛵", n: "sailboat" },
      { e: "🚢", n: "ship" },
      { e: "🚂", n: "locomotive" },
      { e: "🌍", n: "globe showing Europe-Africa" },
      { e: "🗺️", n: "world map" },
      { e: "🏔️", n: "snow-capped mountain" },
      { e: "🏝️", n: "desert island" },
      { e: "🌃", n: "night with stars" },
      { e: "🌆", n: "cityscape at dusk" },
      { e: "🗼", n: "Eiffel Tower" },
      { e: "🗽", n: "Statue of Liberty" },
      { e: "🏯", n: "Japanese castle" },
      { e: "🕌", n: "mosque" },
      { e: "⛩️", n: "shinto shrine" },
      { e: "🎡", n: "ferris wheel" },
      { e: "🎢", n: "roller coaster" },
      { e: "🎠", n: "carousel horse" },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    icon: Lightbulb,
    emojis: [
      { e: "💡", n: "light bulb" },
      { e: "🔦", n: "flashlight" },
      { e: "📱", n: "mobile phone" },
      { e: "💻", n: "laptop" },
      { e: "⌨️", n: "keyboard" },
      { e: "🖥️", n: "desktop computer" },
      { e: "🖨️", n: "printer" },
      { e: "📷", n: "camera" },
      { e: "📺", n: "television" },
      { e: "📻", n: "radio" },
      { e: "⌚", n: "watch" },
      { e: "📡", n: "satellite antenna" },
      { e: "🔋", n: "battery" },
      { e: "🔌", n: "electric plug" },
      { e: "🔑", n: "key" },
      { e: "🔒", n: "locked" },
      { e: "🔓", n: "unlocked" },
      { e: "🔨", n: "hammer" },
      { e: "⚙️", n: "gear" },
      { e: "🧲", n: "magnet" },
      { e: "📦", n: "package" },
      { e: "📮", n: "postbox" },
      { e: "📚", n: "books" },
      { e: "📝", n: "memo" },
      { e: "✏️", n: "pencil" },
      { e: "🖊️", n: "pen" },
      { e: "📌", n: "pushpin" },
      { e: "📎", n: "paperclip" },
      { e: "✂️", n: "scissors" },
      { e: "🗑️", n: "wastebasket" },
    ],
  },
  {
    id: "symbols",
    label: "Symbols",
    icon: Hash,
    emojis: [
      { e: "❤️", n: "red heart" },
      { e: "🧡", n: "orange heart" },
      { e: "💛", n: "yellow heart" },
      { e: "💚", n: "green heart" },
      { e: "💙", n: "blue heart" },
      { e: "💜", n: "purple heart" },
      { e: "🖤", n: "black heart" },
      { e: "🤍", n: "white heart" },
      { e: "💔", n: "broken heart" },
      { e: "❣️", n: "heart exclamation" },
      { e: "💕", n: "two hearts" },
      { e: "💞", n: "revolving hearts" },
      { e: "💓", n: "beating heart" },
      { e: "💗", n: "growing heart" },
      { e: "💖", n: "sparkling heart" },
      { e: "💘", n: "heart with arrow" },
      { e: "💝", n: "heart with ribbon" },
      { e: "✨", n: "sparkles" },
      { e: "⭐", n: "star" },
      { e: "🌟", n: "glowing star" },
      { e: "💫", n: "dizzy" },
      { e: "⚡", n: "high voltage" },
      { e: "🔥", n: "fire" },
      { e: "💥", n: "collision" },
      { e: "🎉", n: "party popper" },
      { e: "🎊", n: "confetti ball" },
      { e: "🎈", n: "balloon" },
      { e: "🎀", n: "ribbon" },
      { e: "🏳️", n: "white flag" },
      { e: "🏴", n: "black flag" },
    ],
  },
];

const MAX_RECENT = 24;
const RECENT_KEY = "emoji-picker-recent";

function loadRecent(): EmojiEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(emoji: EmojiEntry, prev: EmojiEntry[]): EmojiEntry[] {
  const next = [emoji, ...prev.filter((e) => e.e !== emoji.e)].slice(
    0,
    MAX_RECENT,
  );
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EmojiGrid({
  emojis,
  onSelect,
}: {
  emojis: EmojiEntry[];
  onSelect: (entry: EmojiEntry) => void;
}) {
  return (
    <TooltipProvider delayDuration={600}>
      <div className="grid grid-cols-8 gap-0.5 p-1">
        {emojis.map((entry) => (
          <Tooltip key={entry.e}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-lg leading-none transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {entry.e}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="px-2 py-1 text-[11px] capitalize"
            >
              {entry.n}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

// ─── Panel (standalone) ───────────────────────────────────────────────────────

interface EmojiPickerPanelProps {
  onEmojiSelect?: (emoji: string) => void;
  /** Extra callback fired after selection — used by the popover to close itself. */
  onAfterSelect?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function EmojiPickerPanel({
  onEmojiSelect,
  onAfterSelect,
  autoFocus = false,
  className,
}: EmojiPickerPanelProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("smileys");
  const [recent, setRecent] = useState<EmojiEntry[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    if (autoFocus) setTimeout(() => searchRef.current?.focus(), 50);
  }, [autoFocus]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return CATEGORIES.flatMap((c) => c.emojis).filter((e) => e.n.includes(q));
  }, [query]);

  const handleSelect = (entry: EmojiEntry) => {
    onEmojiSelect?.(entry.e);
    setRecent((prev) => saveRecent(entry, prev));
    onAfterSelect?.();
  };

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className={cn("flex w-88 flex-col overflow-hidden", className)}>
      {/* Search */}
      <div className="border-b border-border/60 px-3 py-2.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emoji…"
            className="h-8 border-0 bg-muted/50 pl-8 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
      </div>

      {searchResults ? (
        <ScrollArea className="h-65">
          {searchResults.length === 0 ? (
            <div className="flex h-65 flex-col items-center justify-center gap-2 text-muted-foreground">
              <span className="text-3xl">🔍</span>
              <p className="text-xs">No results for "{query}"</p>
            </div>
          ) : (
            <div className="p-2">
              <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Results
              </p>
              <EmojiGrid emojis={searchResults} onSelect={handleSelect} />
            </div>
          )}
        </ScrollArea>
      ) : (
        <>
          <ScrollArea className="h-65">
            <div className="p-2">
              {recent.length > 0 && (
                <section className="mb-3">
                  <p className="mb-1 flex items-center gap-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    <Clock className="h-3 w-3" />
                    Recently used
                  </p>
                  <EmojiGrid emojis={recent} onSelect={handleSelect} />
                </section>
              )}
              <section>
                <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  {currentCategory.label}
                </p>
                <EmojiGrid
                  emojis={currentCategory.emojis}
                  onSelect={handleSelect}
                />
              </section>
            </div>
          </ScrollArea>

          <div className="border-t border-border/60">
            <div className="flex items-center justify-between px-2 py-1.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    title={cat.label}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                      activeCategory === cat.id
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Popover wrapper ──────────────────────────────────────────────────────────

interface EmojiPickerProps {
  onEmojiSelect?: (emoji: string) => void;
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}

export default function EmojiPicker({
  onEmojiSelect,
  trigger,
  align = "start",
  side = "top",
}: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Open emoji picker"
          >
            <Smile className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        className="w-auto p-0 shadow-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <EmojiPickerPanel
          onEmojiSelect={onEmojiSelect}
          onAfterSelect={() => setOpen(false)}
          autoFocus={open}
        />
      </PopoverContent>
    </Popover>
  );
}
