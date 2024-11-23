import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileItem } from "@/features/documents/types";
import FileCard from "@/features/documents/components/file-card";

interface DocumentSelectModalProps {
  isOpen: boolean;
  onClose: (selectedFiles?: number[]) => void;
  files: FileItem[];
}

export function DocumentSelectModal({
  isOpen = false,
  files,
  onClose,
}: DocumentSelectModalProps) {
  const [selectedFileIds, setSelectedFileIds] = useState<number[]>([]);

  const toggleFileSelection = (fileId: number) => {
    setSelectedFileIds((prevSelected) =>
      prevSelected.includes(fileId)
        ? prevSelected.filter((id) => id !== fileId)
        : [...prevSelected, fileId]
    );
  };

  const handleConfirm = () => {
    onClose(selectedFileIds);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Select Documents</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-2 w-full">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              isSelectable={true}
              isSelected={selectedFileIds.includes(file.id)}
              onToggle={() => toggleFileSelection(file.id)}
            />
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
