/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileCard from "@/features/documents/components/file-card";
import { useGetDocsInGroupQuery } from "@/store/queries/docs";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentSelectModalProps {
  isOpen: boolean;
  onClose: (selectedFiles?: string[]) => void;
}

export function DocumentSelectModal({
  isOpen = false,
  onClose,
}: DocumentSelectModalProps) {
  const { groupId } = useParams();

  const { data } = useGetDocsInGroupQuery({
    groupId: groupId,
    projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
  });

  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  const toggleFileSelection = (fileId: string) => {
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
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4 grid-cols-2 w-full">
            {data?.map((file: any) => (
              <FileCard
                key={file.id}
                file={file}
                isSelectable={true}
                isSelected={selectedFileIds.includes(file.id)}
                onToggle={() => toggleFileSelection(file.id)}
              />
            ))}
          </div>
        </ScrollArea>
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
