import React from "react";
import { File } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FileItem } from "@/features/documents/types";

interface FileCardProps {
  file: FileItem;
  isSelected?: boolean;
  isSelectable?: boolean;
  onToggle?: () => void;
}

function FileCard({
  file,
  isSelected = false,
  isSelectable = false,
  onToggle,
}: FileCardProps) {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg shadow-sm border p-4 ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={isSelectable && onToggle ? onToggle : undefined}
    >
      <div className="flex items-center justify-between">
        {isSelectable && (
          <Checkbox
            checked={isSelected}
            className="mr-2"
            onChange={() => {
              if (onToggle) onToggle();
            }}
          />
        )}
        <File className="h-10 w-10 mr-2" color="#6b7280" />
        <div className="flex-1 truncate">
          <h3 className="font-semibold truncate">{file.name}</h3>
          {/* <p className="text-sm text-muted-foreground">{file.size}</p> */}
        </div>
      </div>
    </div>
  );
}

export default FileCard;
