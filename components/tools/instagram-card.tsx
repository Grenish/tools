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
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

// Types

type InstagramCardSize = "sm" | "md" | "lg" | "xl";
type InstagramPhotoLayout = 1 | 2 | 3 | 4;

interface InstagramCardProps {
  avatarSrc?: string;
  className?: string;
  description?: string;
  photoLayout?: InstagramPhotoLayout;
  photos?: string[];
  profileName?: string;
  size?: InstagramCardSize;
}

interface SizeConfig {
  avatar: string;
  button: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  card: string;
  cardSize: "default" | "sm";
  contentPadding: string;
  description: string;
  gap: string;
  itemSize: "default" | "sm";
  mediaRadius: string;
  title: string;
}

interface InstagramCardHeaderProps {
  avatarSrc?: string;
  avatarClass: string;
  buttonSize: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  description?: string;
  descriptionClass: string;
  initials: string;
  itemSize: "default" | "sm";
  profileName: string;
  titleClass: string;
}

interface InstagramCardBodyProps {
  contentPadding: string;
  gap: string;
  mediaRadius: string;
  photoLayout: InstagramPhotoLayout;
  photos: string[];
  profileName: string;
}

// Config

const sizeConfig: Record<InstagramCardSize, SizeConfig> = {
  sm: {
    avatar: "size-9",
    button: "icon-xs",
    card: "max-w-xs",
    cardSize: "sm",
    contentPadding: "px-4",
    description: "text-xs line-clamp-2",
    gap: "gap-1.5",
    itemSize: "sm",
    mediaRadius: "rounded-2xl",
    title: "text-sm",
  },
  md: {
    avatar: "size-10",
    button: "icon-sm",
    card: "max-w-sm",
    cardSize: "default",
    contentPadding: "px-5",
    description: "text-sm line-clamp-2",
    gap: "gap-2",
    itemSize: "default",
    mediaRadius: "rounded-[1.35rem]",
    title: "text-sm",
  },
  lg: {
    avatar: "size-12",
    button: "icon",
    card: "max-w-md",
    cardSize: "default",
    contentPadding: "px-6",
    description: "text-sm line-clamp-3",
    gap: "gap-2.5",
    itemSize: "default",
    mediaRadius: "rounded-[1.5rem]",
    title: "text-base",
  },
  xl: {
    avatar: "size-14",
    button: "icon-lg",
    card: "max-w-xl",
    cardSize: "default",
    contentPadding: "px-6",
    description: "text-sm line-clamp-3",
    gap: "gap-3",
    itemSize: "default",
    mediaRadius: "rounded-[1.75rem]",
    title: "text-base",
  },
};

const photoLayoutClass: Record<InstagramPhotoLayout, string> = {
  1: "grid-cols-1 grid-rows-1",
  2: "grid-cols-2 grid-rows-1",
  3: "grid-cols-[1.35fr_1fr] grid-rows-2",
  4: "grid-cols-2 grid-rows-2",
};

// Utilities

function getInitials(name?: string): string {
  return name
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "";
}

function getPhotoSpanClass(
  layout: InstagramPhotoLayout,
  index: number,
): string {
  return layout === 3 && index === 0 ? "row-span-2" : "";
}

// Components

function InstagramCardHeader({
  avatarSrc,
  avatarClass,
  buttonSize,
  description,
  descriptionClass,
  initials,
  itemSize,
  profileName,
  titleClass,
}: InstagramCardHeaderProps) {
  return (
    <Item size={itemSize} className="border-0 rounded-none bg-transparent py-0">
      <ItemMedia>
        <Avatar className={avatarClass}>
          <AvatarImage src={avatarSrc} alt={profileName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={titleClass}>{profileName}</ItemTitle>
        {description && (
          <ItemDescription
            className={cn(descriptionClass, "text-muted-foreground")}
          >
            {description}
          </ItemDescription>
        )}
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size={buttonSize}
          aria-label="Open on Instagram"
        >
          <InstagramLogoIcon weight="duotone" />
        </Button>
      </ItemActions>
    </Item>
  );
}

function InstagramCardBody({
  contentPadding,
  gap,
  mediaRadius,
  photoLayout,
  photos,
  profileName,
}: InstagramCardBodyProps) {
  const visiblePhotos = photos.slice(0, photoLayout);

  if (visiblePhotos.length === 0) return null;

  return (
    <CardContent className={contentPadding}>
      <div
        className={cn(
          "grid w-full overflow-hidden aspect-square",
          gap,
          mediaRadius,
          photoLayoutClass[photoLayout],
        )}
      >
        {visiblePhotos.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className={cn(
              "relative min-h-0 overflow-hidden",
              getPhotoSpanClass(photoLayout, index),
            )}
          >
            <Image
              src={photo}
              alt={`${profileName} photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </CardContent>
  );
}

export default function InstagramCard({
  avatarSrc,
  className,
  description,
  photoLayout = 4,
  photos = [],
  profileName = "",
  size = "md",
}: InstagramCardProps) {
  const config = sizeConfig[size];
  const initials = getInitials(profileName);

  return (
    <Card
      size={config.cardSize}
      className={cn(
        "w-full border border-border/60 bg-card/95 shadow-sm",
        config.card,
        className,
      )}
    >
      <InstagramCardHeader
        avatarSrc={avatarSrc}
        avatarClass={config.avatar}
        buttonSize={config.button}
        description={description}
        descriptionClass={config.description}
        initials={initials}
        itemSize={config.itemSize}
        profileName={profileName}
        titleClass={config.title}
      />
      <InstagramCardBody
        contentPadding={config.contentPadding}
        gap={config.gap}
        mediaRadius={config.mediaRadius}
        photoLayout={photoLayout}
        photos={photos}
        profileName={profileName}
      />
    </Card>
  );
}
