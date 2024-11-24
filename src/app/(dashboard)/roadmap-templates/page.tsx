/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/features/roadmap-templates/components/template-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Template } from "@/features/roadmap-templates/types";
import { templates } from "@/features/roadmap-templates/data";
import { useGetAllRoadmapsQuery } from "@/store/queries/roadmaps";

function TemplateManagement() {
  const router = useRouter();

  const [templatesState, setTemplatesState] = useState<Template[]>(templates);
  console.log("🚀 ~ TemplateManagement ~ templatesState:", templatesState);

  const { data } = useGetAllRoadmapsQuery("");
  console.log("🚀 ~ TemplateManagement ~ data:", data);

  const handleEdit = (
    id: number,
    updatedData: Partial<Omit<Template, "id">>
  ) => {
    setTemplatesState((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === id ? { ...template, ...updatedData } : template
      )
    );
  };

  const handleDelete = (id: number) => {
    setTemplatesState((prevTemplates) =>
      prevTemplates.filter((template) => template.id !== id)
    );
  };

  const handleAdd = () => {
    router.push("/roadmap-templates/add?createBy=ai");
    // const newTemplate: Template = {
    //   id: Math.max(...templatesState.map((t) => t.id)) + 1,
    //   title: "New Template",
    //   subtitle: "Describe your new template",
    //   missionCount: 0,
    // };
    // setTemplatesState((prevTemplates) => [...prevTemplates, newTemplate]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Templates</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Create new template
              </DialogTitle>
              <p className="text-center text-slate-500 mb-4">
                Choose the method to create a new template.
              </p>
            </DialogHeader>
            <DialogFooter className="grid grid-cols-2 gap-2">
              <Button type="submit" variant="outline">
                Create by Manual
              </Button>
              <Button type="submit" onClick={handleAdd}>
                Generative AI
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((template: any) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TemplateManagement;
