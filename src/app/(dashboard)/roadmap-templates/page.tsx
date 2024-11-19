"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Template } from "@/features/roadmap-templates/types";
import { TemplateCard } from "@/features/roadmap-templates/components/template-card";

export const templates: Template[] = [
  {
    id: 1,
    title: "Web Development Mastery",
    subtitle: "From Novice to Full-Stack Pro",
    missionCount: 12,
  },
  {
    id: 2,
    title: "Data Science Journey",
    subtitle: "Explore the World of Data",
    missionCount: 10,
  },
  {
    id: 3,
    title: "Mobile App Development",
    subtitle: "Create Apps for iOS and Android",
    missionCount: 8,
  },
  {
    id: 4,
    title: "DevOps Expedition",
    subtitle: "Master the Art of DevOps",
    missionCount: 9,
  },
  {
    id: 5,
    title: "Machine Learning Adventure",
    subtitle: "Dive into AI and ML",
    missionCount: 11,
  },
  {
    id: 6,
    title: "Cybersecurity Quest",
    subtitle: "Protect Digital Assets",
    missionCount: 10,
  },
];

const TemplateManagement: React.FC = () => {
  const [templatesState, setTemplatesState] = useState<Template[]>(templates);

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
    const newTemplate: Template = {
      id: Math.max(...templatesState.map((t) => t.id)) + 1,
      title: "New Template",
      subtitle: "Describe your new template",
      missionCount: 0,
    };
    setTemplatesState((prevTemplates) => [...prevTemplates, newTemplate]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Templates</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Template
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesState.map((template) => (
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
};

export default TemplateManagement;
