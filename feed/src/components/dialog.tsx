import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
};

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  onConfirm,
  isLoading = false,
  confirmText = "Yes",
  cancelText = "Cancel",
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-lg md:text-xl">
          This will delete the <span className="font-bold text-black">current post</span>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="cursor-pointer text-lg md:text-xl"
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
            }}
            disabled={isLoading}
            className="cursor-pointer text-lg md:text-xl"
            variant="destructive"
          >
            {isLoading ? "Deleting..." : (<>
              <p>{confirmText}</p>
              <Trash2 />
            </>)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
