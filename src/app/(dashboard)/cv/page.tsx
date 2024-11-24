/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Upload, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetAllCvsQuery } from "@/store/queries/cvs";
import { toast } from "sonner";

const initialCVs = [
  {
    id: 1,
    name: "My Professional CV",
    downloadUrl: "/path/to/cv1.pdf",
    createdAt: "2024-11-19T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Creative Industry CV",
    downloadUrl: "/path/to/cv2.pdf",
    createdAt: "2024-11-18T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Technical Resume",
    downloadUrl: "/path/to/cv3.pdf",
    createdAt: "2024-11-17T00:00:00.000Z",
  },
];

export default function CVManager() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [cvs, setCVs] = useState(initialCVs);
  console.log("🚀 ~ CVManager ~ cvs:", cvs);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { data, refetch } = useGetAllCvsQuery(
    "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd"
  );
  const [activeCV, setActiveCV] = useState(data?.[0]?.id);

  console.log("🚀 ~ CVManager ~ data:", data);

  useEffect(() => {
    if (data) {
      setActiveCV(data?.[0]?.id);
    }
  }, [data]);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      console.log("🚀 ~ file:", file);

      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("projectId", "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd");
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://jkwgg40g4cw80kwwsskcscg8.34.66.59.129.sslip.io:4152/storage/cvs/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycDRabnhQS1J3aUpIN3I0eFhKMWlLcWMxTlQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MzU5Njg4MjQsImZ1bGxfbmFtZSI6IkLhuqNvIFRo4bqvbmcgVHLhuqduIFbEg24iLCJpYXQiOjE3MzIzNjg4MjQsImltYWdlX3VybCI6Imh0dHBzOi8vaW1nLmNsZXJrLmNvbS9leUowZVhCbElqb2ljSEp2ZUhraUxDSnpjbU1pT2lKb2RIUndjem92TDJsdFlXZGxjeTVqYkdWeWF5NWtaWFl2YjJGMWRHaGZZWFJzWVhOemFXRnVMMmx0WjE4eWNFVmtTRUZvV2paV1ZEZFpaM2h2VDAxV1dtYzVXalJwYWpVaWZRIiwiaXNzIjoiaHR0cHM6Ly9zZXQta2F0eWRpZC03MS5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI5OTdmYjU5NGY0YmQ4ZGVmYmQ2YiIsIm5iZiI6MTczMjM2ODgxOSwic3ViIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28iLCJ1c2VyX2lkIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28ifQ.jBPs0p75BGa4bHbg-6paNbXm7c4y_pE-7zVoY06w3LOmrIifH3D_W4us9GTkFRKUtZ1fHMp2NT6GCzVRj1eUyFMhEZ-tsjbxjlmqD1vHCiFHSYjPuD7-cPsKE8QmEx5snbcZh1WntMygWXIHtRx8JuWNjfklLiWsyZDhzdRDbUishDpGfHcmWRa_cAayUU_WSPwP9sGhs-6DdmG3MNoKvRc38BhUxLRlSrsC8qbEDURqi_3S-BkqV46tNGSpn2e-mG33WB-Z6y9v8be5rJIRA5fzEGbzs9zz55AjW_dFDSZ6L2h6ztN45p4An6LoSxHP45wHk8m6O0e8PLDS3ZuFVg",
            },
          }
        );

        const newCV = {
          id: response.data.id,
          name: file.name,
          downloadUrl: response.data.downloadUrl,
          createdAt: new Date().toISOString(),
        };
        refetch();
        setCVs((prevCVs) => [newCV, ...prevCVs]);
      } catch (error) {
        setUploadError("Failed to upload CV. Please try again.");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const sortedCVs = data
    ? [...data]?.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    : [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">CV Manager</h1>
        <Label htmlFor="upload-file" className="cursor-pointer">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload New CV
            {isUploading && <Loader2 className="animate-spin" />}
          </Button>
        </Label>
        <Input
          id="upload-file"
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleUpload(e)}
        />
      </div>

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

      <RadioGroup
        value={activeCV}
        onValueChange={(value) => {
          setActiveCV(value);
          toast.success("CV selected successfully");
        }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedCVs?.map((cv: any) => (
            <Card key={cv.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={cv.id.toString()}
                      id={`cv-${cv.id}`}
                    />
                    <Label htmlFor={`cv-${cv.id}`} className="font-medium">
                      {cv.name}
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={cv.downloadUrl} download>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download CV</span>
                    </a>
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Created on {format(new Date(cv.createdAt), "dd/MM/yyyy")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
