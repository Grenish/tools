import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import {
  ChatCircleIcon,
  HeartIcon,
  RepeatIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

// Types

type TweetCardSize = "sm" | "md" | "lg" | "xl";

interface TweetCardProps {
  avatarSrc?: string;
  className?: string;
  bio?: string;
  profileName: string;
  tweet?: string;
  timestamp?: string;
  media?: string[];
  likes?: number;
  retweets?: number;
  replies?: number;
  size?: TweetCardSize;
}

interface SizeConfig {
  avatar: string;
  buttonSize: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  card: string;
  cardSize: "default" | "sm";
  description: string;
  gap: string;
  inset: string;
  itemSize: "default" | "sm";
  mediaRadius: string;
  metadata: string;
  title: string;
  tweet: string;
}

interface TweetCardHeaderProps {
  avatarSrc?: string;
  avatarClass: string;
  bio?: string;
  buttonSize: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  descriptionClass: string;
  initials: string;
  inset: string;
  itemSize: "default" | "sm";
  profileName: string;
  titleClass: string;
}

interface TweetCardBodyProps {
  gap: string;
  inset: string;
  likes?: number;
  media: string[];
  mediaRadius: string;
  metadata: string;
  replies?: number;
  retweets?: number;
  timestamp?: string;
  tweet?: string;
  tweetClass: string;
}

// Config

const sizeConfig: Record<TweetCardSize, SizeConfig> = {
  sm: {
    avatar: "size-9",
    buttonSize: "icon-xs",
    card: "max-w-xs",
    cardSize: "sm",
    description: "text-xs",
    gap: "gap-1.5",
    inset: "px-4",
    itemSize: "sm",
    mediaRadius: "rounded-xl",
    metadata: "text-xs",
    title: "text-sm",
    tweet: "text-xs",
  },
  md: {
    avatar: "size-10",
    buttonSize: "icon-sm",
    card: "max-w-sm",
    cardSize: "default",
    description: "text-sm",
    gap: "gap-2",
    inset: "px-5",
    itemSize: "default",
    mediaRadius: "rounded-2xl",
    metadata: "text-xs",
    title: "text-sm",
    tweet: "text-sm",
  },
  lg: {
    avatar: "size-12",
    buttonSize: "icon",
    card: "max-w-md",
    cardSize: "default",
    description: "text-sm",
    gap: "gap-2.5",
    inset: "px-6",
    itemSize: "default",
    mediaRadius: "rounded-2xl",
    metadata: "text-sm",
    title: "text-base",
    tweet: "text-base",
  },
  xl: {
    avatar: "size-14",
    buttonSize: "icon-lg",
    card: "max-w-xl",
    cardSize: "default",
    description: "text-sm",
    gap: "gap-3",
    inset: "px-6",
    itemSize: "default",
    mediaRadius: "rounded-2xl",
    metadata: "text-sm",
    title: "text-base",
    tweet: "text-lg",
  },
};

const mediaLayoutClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-[1fr_1fr] grid-rows-2",
  4: "grid-cols-2 grid-rows-2",
};

// Utilities

function getAvatarInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatCount(count: number | undefined): string {
  if (!count) return "0";
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}

// Components

function TweetCardHeader({
  avatarSrc,
  avatarClass,
  bio,
  buttonSize,
  descriptionClass,
  initials,
  inset,
  itemSize,
  profileName,
  titleClass,
}: TweetCardHeaderProps) {
  return (
    <Item
      size={itemSize}
      className={cn("border-0 rounded-none bg-transparent py-0", inset)}
    >
      <ItemMedia>
        <Avatar className={avatarClass}>
          <AvatarImage src={avatarSrc} alt={profileName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={titleClass}>{profileName}</ItemTitle>
        {bio && (
          <ItemDescription
            className={cn(descriptionClass, "text-muted-foreground")}
          >
            {bio}
          </ItemDescription>
        )}
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size={buttonSize} aria-label="Open tweet">
          <XLogoIcon weight="duotone" />
        </Button>
      </ItemActions>
    </Item>
  );
}

function TweetCardBody({
  gap,
  inset,
  likes,
  media,
  mediaRadius,
  metadata,
  replies,
  retweets,
  timestamp,
  tweet,
  tweetClass,
}: TweetCardBodyProps) {
  const hasEngagementStats =
    likes !== undefined || retweets !== undefined || replies !== undefined;

  return (
    <CardContent className={cn("pt-0", inset)}>
      <div className={cn("flex flex-col", gap)}>
        {tweet && <p className={tweetClass}>{tweet}</p>}

        {media.length > 0 && (
          <div
            className={cn(
              "grid w-full overflow-hidden aspect-video mt-2",
              gap,
              mediaRadius,
              mediaLayoutClass[media.length],
            )}
          >
            {media.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={cn(
                  "relative min-h-0 overflow-hidden",
                  media.length === 3 && index === 0 && "row-span-2",
                )}
              >
                <Image
                  src={src}
                  alt={`Tweet media ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {(timestamp || hasEngagementStats) && (
          <div
            className={cn(
              "flex items-center justify-between text-muted-foreground border-t border-border/40 pt-2",
              metadata,
            )}
          >
            {timestamp && <span>{timestamp}</span>}
            {hasEngagementStats && (
              <div className="flex gap-4">
                {replies !== undefined && (
                  <span className="flex items-center gap-1">
                    {formatCount(replies)}
                    <ChatCircleIcon className="size-3.5" />
                  </span>
                )}
                {retweets !== undefined && (
                  <span className="flex items-center gap-1">
                    {formatCount(retweets)}
                    <RepeatIcon className="size-3.5" />
                  </span>
                )}
                {likes !== undefined && (
                  <span className="flex items-center gap-1">
                    {formatCount(likes)}
                    <HeartIcon className="size-3.5" />
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </CardContent>
  );
}

export default function TweetCard({
  avatarSrc,
  className,
  bio,
  profileName,
  tweet,
  timestamp,
  media = [],
  likes,
  retweets,
  replies,
  size = "md",
}: TweetCardProps) {
  const config = sizeConfig[size];
  const initials = getAvatarInitials(profileName);

  return (
    <Card
      size={config.cardSize}
      className={cn(
        "w-full border border-border/60 bg-card/95 shadow-sm",
        config.card,
        className,
      )}
    >
      <TweetCardHeader
        avatarClass={config.avatar}
        avatarSrc={avatarSrc}
        bio={bio}
        buttonSize={config.buttonSize}
        descriptionClass={config.description}
        initials={initials}
        inset={config.inset}
        itemSize={config.itemSize}
        profileName={profileName}
        titleClass={config.title}
      />
      <TweetCardBody
        gap={config.gap}
        inset={config.inset}
        likes={likes}
        media={media}
        mediaRadius={config.mediaRadius}
        metadata={config.metadata}
        replies={replies}
        retweets={retweets}
        timestamp={timestamp}
        tweet={tweet}
        tweetClass={config.tweet}
      />
    </Card>
  );
}
