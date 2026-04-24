import { cn } from "@/lib/utils";

type StripesProps = {
  className?: string;
};

export default function HorizontalStripes({ className }: StripesProps) {
  return (
    <div
      className={cn(
        "h-10 w-full bg-[repeating-linear-gradient(-45deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]",
        `${className}`,
      )}
    />
  );
}
