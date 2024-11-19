"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@tanstack/react-store";

import { FolderItem } from "@/features/documents/types";
import FolderCard from "@/features/documents/components/folder-card";
import FileCard from "@/features/documents/components/file-card";
import { documentsStore } from "@/features/documents/store";

export default function FileManager() {
  const router = useRouter();

  const folderStructure = useStore(
    documentsStore,
    (state) => state.folderStructure
  );

  const navigateToFolder = (folder: FolderItem) => {
    router.push(`/documents/folders/${folder.id}`);
  };

  return (
    <>
      {folderStructure.items.map((item) =>
        item.type === "folder" ? (
          <FolderCard
            key={item.id}
            folder={item}
            onNavigate={navigateToFolder}
          />
        ) : (
          <FileCard key={item.id} file={item} />
        )
      )}
    </>
  );
}
