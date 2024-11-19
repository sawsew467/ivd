"use client";

import React, { useState, useCallback } from "react";
import { Upload, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [activeCV, setActiveCV] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const newCV = {
          id: cvs.length + 1,
          name: file.name,
          downloadUrl: URL.createObjectURL(file),
          createdAt: new Date().toISOString(),
        };
        setCVs((prevCVs) => [newCV, ...prevCVs]);
      } finally {
        setIsUploading(false);
      }
    },
    [cvs]
  );

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

      <RadioGroup
        value={activeCV.toString()}
        onValueChange={(value) => setActiveCV(Number(value))}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cvs.map((cv) => (
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

      {/* <div className="mt-6">
        <Label htmlFor="cv-upload" className="block text-sm font-medium mb-2">
          Upload New CV
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            disabled={isUploading}
            className="flex-1"
          />
          <Button disabled={isUploading}>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>
        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}
      </div> */}
    </div>
  );
}
