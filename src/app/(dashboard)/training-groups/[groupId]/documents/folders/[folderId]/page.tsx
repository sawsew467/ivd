"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FileItem, FolderItem } from "@/features/documents/types";
import FolderCard from "@/features/documents/components/folder-card";
import FileCard from "@/features/documents/components/file-card";
import { useStore } from "@tanstack/react-store";
import { documentsStore } from "@/features/documents/store";

export default function FolderPage() {
  const router = useRouter();
  const { folderId } = useParams();

  const folderStructure = useStore(
    documentsStore,
    (state) => state.folderStructure
  );

  const navigateToFolder = (folder: FolderItem) => {
    router.push(`/documents/folders/${folder.id}`);
  };

  const currentItem = folderId
    ? findItemById(Number(folderId), folderStructure)
    : null;

  if (!currentItem) {
    return <div>Folder or file not found.</div>;
  }

  if (currentItem.type === "file") {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">{currentItem.name}</h1>
        <p>Size: {currentItem.size}</p>
      </div>
    );
  }

  return (
    <>
      {currentItem.items.map((item) =>
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

function findItemById(
  id: number,
  folder: FolderItem
): FolderItem | FileItem | null {
  if (folder.id === id) {
    return folder;
  }

  for (const item of folder.items) {
    if (item.type === "folder") {
      const found = findItemById(id, item);
      if (found) {
        return found;
      }
    } else if (item.id === id) {
      return item;
    }
  }

  return null;
}
