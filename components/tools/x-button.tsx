import { XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function XButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"outline"} size={"icon"} aria-label="Continue with X">
            <XLogoIcon weight="duotone" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>X (Formerly Twitter)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
