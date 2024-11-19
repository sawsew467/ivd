import { Store } from "@tanstack/store";

import { FolderItem } from "./types";

interface DocumentStore {
  folderStructure: FolderItem;
}

export const documentsStore = new Store<DocumentStore>({
  folderStructure: {
    id: 0,
    name: "Workspace",
    type: "folder",
    items: [
      {
        id: 1,
        name: "Documents",
        type: "folder",
        items: [
          {
            id: 2,
            name: "Work",
            type: "folder",
            items: [
              {
                id: 3,
                name: "project_plan.docx",
                type: "file",
                size: "3.5 MB",
              },
              {
                id: 4,
                name: "meeting_notes.txt",
                type: "file",
                size: "500 KB",
              },
            ],
          },
          {
            id: 5,
            name: "Personal",
            type: "folder",
            items: [
              {
                id: 6,
                name: "birthday_list.xlsx",
                type: "file",
                size: "900 KB",
              },
            ],
          },
          { id: 7, name: "budget.xlsx", type: "file", size: "1.8 MB" },
        ],
      },
      {
        id: 8,
        name: "Images",
        type: "folder",
        items: [
          {
            id: 9,
            name: "Vacation",
            type: "folder",
            items: [
              { id: 10, name: "beach.jpg", type: "file", size: "2.2 MB" },
              { id: 11, name: "mountains.jpg", type: "file", size: "3.1 MB" },
            ],
          },
          { id: 12, name: "profile_picture.jpg", type: "file", size: "3.2 MB" },
        ],
      },
      { id: 13, name: "Videos", type: "folder", items: [] },
      {
        id: 14,
        name: "1_001_C24TTK_22406_83091_001_C24TTK_22406_8309.pdf",
        type: "file",
        size: "2.5 MB",
      },
    ],
  },
});
