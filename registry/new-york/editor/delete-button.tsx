import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr";

type DeleteButtonProps = {
  iconOnly?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
  title?: React.ReactNode;
  description?: React.ReactNode;
  deleteText?: React.ReactNode;
  cancelText?: React.ReactNode;
};

export default function DeleteButton({
  iconOnly = false,
  size,
  title = "Are you sure?",
  description = "This action permanently deletes the link and its associated data. If you may need it later, consider disabling the link instead.",
  deleteText = "Delete",
  cancelText = "Cancel",
}: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={size ?? (iconOnly ? "icon" : "default")}
          aria-label="Delete"
        >
          <TrashIcon />
          {!iconOnly ? "Delete" : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"}>
            {deleteText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
