import { File } from "lucide-react";

import { FileItem } from "@/features/documents/types";

function FileCard({ file }: { file: FileItem }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between ">
        <File className="h-10 w-10  mr-2" color="#6b7280" />
        <div className="flex-1 truncate">
          <h3 className="font-semibold truncate">{file.name}</h3>
          <p className="text-sm text-muted-foreground">{file.size}</p>
        </div>
      </div>
    </div>
  );
}

export default FileCard;
