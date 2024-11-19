export type FileItem = {
  id: number;
  name: string;
  type: "file";
  size: string;
};

export type FolderItem = {
  id: number;
  name: string;
  type: "folder";
  items: (FileItem | FolderItem)[];
};
