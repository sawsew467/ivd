"use client";

import * as React from "react";
import axios from "axios";
import { Search, Plus, Upload, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { documentsStore } from "@/features/documents/store";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { groupId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setIsLoading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("groupId", `${groupId}`);
    formData.append("projectId", "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd");

    try {
      const response = await axios.post(
        "http://jkwgg40g4cw80kwwsskcscg8.34.66.59.129.sslip.io:4152/storage/docs/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycDRabnhQS1J3aUpIN3I0eFhKMWlLcWMxTlQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MzU5Njg4MjQsImZ1bGxfbmFtZSI6IkLhuqNvIFRo4bqvbmcgVHLhuqduIFbEg24iLCJpYXQiOjE3MzIzNjg4MjQsImltYWdlX3VybCI6Imh0dHBzOi8vaW1nLmNsZXJrLmNvbS9leUowZVhCbElqb2ljSEp2ZUhraUxDSnpjbU1pT2lKb2RIUndjem92TDJsdFlXZGxjeTVqYkdWeWF5NWtaWFl2YjJGMWRHaGZZWFJzWVhOemFXRnVMMmx0WjE4eWNFVmtTRUZvV2paV1ZEZFpaM2h2VDAxV1dtYzVXalJwYWpVaWZRIiwiaXNzIjoiaHR0cHM6Ly9zZXQta2F0eWRpZC03MS5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI5OTdmYjU5NGY0YmQ4ZGVmYmQ2YiIsIm5iZiI6MTczMjM2ODgxOSwic3ViIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28iLCJ1c2VyX2lkIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28ifQ.jBPs0p75BGa4bHbg-6paNbXm7c4y_pE-7zVoY06w3LOmrIifH3D_W4us9GTkFRKUtZ1fHMp2NT6GCzVRj1eUyFMhEZ-tsjbxjlmqD1vHCiFHSYjPuD7-cPsKE8QmEx5snbcZh1WntMygWXIHtRx8JuWNjfklLiWsyZDhzdRDbUishDpGfHcmWRa_cAayUU_WSPwP9sGhs-6DdmG3MNoKvRc38BhUxLRlSrsC8qbEDURqi_3S-BkqV46tNGSpn2e-mG33WB-Z6y9v8be5rJIRA5fzEGbzs9zz55AjW_dFDSZ6L2h6ztN45p4An6LoSxHP45wHk8m6O0e8PLDS3ZuFVg",
          },
        }
      );

      console.log("Upload successful:", response.data);

      // Update local store with uploaded files
      const uploadedFiles = Array.from(files).map((file) => ({
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
            items: [...state.folderStructure.items, ...uploadedFiles],
          },
        };
      });
      toast.success("File uploaded successfully");
      router.push(`?uuid=${Date.now()}`);
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createFolder = (folderName: string) => {
    console.log("🚀 ~ createFolder ~ folderName:", folderName);
  };

  return (
    <TabsContent value="documents">
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-semibold mb-2">Group documents</h1>
          <p className="text-muted-foreground">
            Manage your group files and folders efficiently
          </p>
        </header>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              className="pl-10"
            />
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
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload File
              {isLoading && <Loader className=" animate-spin" />}
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

        {/* Display Files and Folders */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {children}
        </div>
      </div>
    </TabsContent>
  );
}
