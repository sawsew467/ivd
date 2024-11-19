"use client";

import * as React from "react";
import { Search, Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { documentsStore } from "@/features/documents/store";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      id: Date.now(),
      name: file.name,
      type: "file" as const,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));

    documentsStore.setState((state) => {
      return {
        ...state,
        folderStructure: {
          ...state.folderStructure,
          items: [...state.folderStructure.items, ...newFiles],
        },
      };
    });
  };

  const createFolder = (folderName: string) => {
    console.log("🚀 ~ createFolder ~ folderName:", folderName);
    // const newFolder: FolderItem = {
    //   id: Date.now(),
    //   name: folderName || "New Folder",
    //   type: "folder",
    //   items: [],
    // };
    // setCurrentFolder((prev) => ({
    //   ...prev,
    //   items: [...prev.items, newFolder],
    // }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">My File Manager</h1>
        <p className="text-muted-foreground">
          Manage your files and folders efficiently
        </p>
      </header>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search files and folders..." className="pl-10" />
        </div>

        <Button
          className="md:w-auto"
          onClick={() =>
            createFolder(prompt("Enter folder name:") || "New Folder")
          }
        >
          <Plus className="mr-2 h-4 w-4" /> New Folder
        </Button>

        <Label htmlFor="upload-file" className="cursor-pointer">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </Label>
        <Input
          id="upload-file"
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
      {/* Breadcrumb Navigation */}
      {/* <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        {currentPath.map((folder, index) => (
          <React.Fragment key={folder.id}>
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => {
                const newPath = currentPath.slice(0, index + 1);
                // setCurrentPath(newPath);
                setCurrentFolder(newPath[newPath.length - 1]);
              }}
            >
              {folder.name}
            </Button>
          </React.Fragment>
        ))}
      </nav> */}

      {/* Display Files and Folders */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {children}
      </div>
    </div>
  );
}
