import { Folder } from "lucide-react";

import { FolderItem } from "@/features/documents/types";

function FolderCard({
  folder,
  onNavigate,
}: {
  folder: FolderItem;
  onNavigate: (folder: FolderItem) => void;
}) {
  return (
    <div
      className="bg-card text-card-foreground rounded-lg shadow-sm border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
      onClick={() => onNavigate(folder)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Folder className="h-10 w-10 mr-2" color="#3b82f6" />
          <div>
            <h3 className="font-semibold">{folder.name}</h3>
            <p className="text-sm text-muted-foreground">
              {folder.items.length}{" "}
              {folder.items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderCard;
