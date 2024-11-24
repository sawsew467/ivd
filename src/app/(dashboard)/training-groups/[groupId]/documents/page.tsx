/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  useParams,
  useSearchParams,
  // useRouter
} from "next/navigation";
// import { useStore } from "@tanstack/react-store";

// import { FolderItem } from "@/features/documents/types";
// import FolderCard from "@/features/documents/components/folder-card";
import FileCard from "@/features/documents/components/file-card";
// import { documentsStore } from "@/features/documents/store";
import { useGetDocsInGroupQuery } from "@/store/queries/docs";

export default function FileManager() {
  // const router = useRouter();

  // const folderStructure = useStore(
  //   documentsStore,
  //   (state) => state.folderStructure
  // );
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const { groupId } = useParams();

  const { data, refetch } = useGetDocsInGroupQuery({
    groupId: groupId,
    projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
  });

  React.useEffect(() => {
    refetch();
  }, [uuid]);

  console.log("🚀 ~ FileManager ~ data:", data);

  // const navigateToFolder = (folder: FolderItem) => {
  //   router.push(`/documents/folders/${folder.id}`);
  // };

  return (
    <>
      {/* {folderStructure.items.map((item) =>
        item.type === "folder" ? (
          <FolderCard
            key={item.id}
            folder={item}
            onNavigate={navigateToFolder}
          />
        ) : (
          <FileCard key={item.id} file={item} />
        )
      )} */}
      {data?.map(
        (item: any) =>
          item.type === "file" && <FileCard key={item.id} file={item} />
      )}
    </>
  );
}
