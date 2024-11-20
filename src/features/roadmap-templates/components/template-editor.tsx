"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RoadmapStep } from "../types";
import { toast } from "sonner";

const initialRoadmapData: RoadmapStep[] = [
  {
    step_number: 1,
    section: "Cooking Basics",
    sub_section: [
      "Kitchen Safety and Hygiene",
      "Knife Skills",
      "Cooking Techniques (boiling, frying, baking, etc.)",
      "Understanding Ingredients",
      "Meal Planning and Preparation",
    ],
  },
  {
    step_number: 2,
    section: "Understanding Python",
    sub_section: [
      "Python Basics",
      "Data Structures in Python",
      "Control Flow Tools in Python",
      "Modules in Python",
      "Errors and Exception Handling in Python",
    ],
  },
  {
    step_number: 3,
    section: "Introduction to FastAPI",
    sub_section: [
      "Installation of FastAPI",
      "FastAPI Principals",
      "Basics of FastAPI",
      "FastAPI Compared to Other Frameworks",
      "Understanding FastAPI's Dependency Injection System",
    ],
  },
  {
    step_number: 4,
    section: "Advanced FastAPI",
    sub_section: [
      "API Models with Pydantic",
      "OAuth2 with Password and Bearer",
      "Security, Testing, Scaling FastAPI",
      "FastAPI's Plugin",
      "Middleware in FastAPI",
    ],
  },
  {
    step_number: 5,
    section: "Database Integration with FastAPI",
    sub_section: [
      "SQL (Relational) Databases",
      "NoSQL Databases",
      "Mocking in Unit Tests",
      "Automated Testing for FastAPI Applications",
      "Testing FastAPI Applications with Pytest",
    ],
  },
];

export default function TemplateEditor() {
  const [roadmapData, setRoadmapData] =
    useState<RoadmapStep[]>(initialRoadmapData);
  const [editingStep, setEditingStep] = useState<RoadmapStep | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (afterStep: number) => {
    const newStep: RoadmapStep = {
      step_number: afterStep + 1,
      section: "New Section",
      sub_section: ["New Sub-section"],
    };
    const updatedData = roadmapData.map((step) =>
      step.step_number > afterStep
        ? { ...step, step_number: step.step_number + 1 }
        : step
    );
    updatedData.splice(afterStep, 0, newStep);
    setRoadmapData(updatedData);
  };

  const handleEdit = (step: RoadmapStep) => {
    setEditingStep({ ...step });
    setIsModalOpen(true);
  };

  const handleDelete = (stepNumber: number) => {
    if (roadmapData.length === 1) {
      toast.error("Cannot delete the only step in the roadmap");
      return;
    }
    const updatedData = roadmapData
      .filter((step) => step.step_number !== stepNumber)
      .map((step) =>
        step.step_number > stepNumber
          ? { ...step, step_number: step.step_number - 1 }
          : step
      );
    setRoadmapData(updatedData);
  };

  const handleSave = () => {
    if (editingStep) {
      setRoadmapData(
        roadmapData.map((step) =>
          step.step_number === editingStep.step_number ? editingStep : step
        )
      );
      setIsModalOpen(false);
      setEditingStep(null);
    }
  };

  const handleSubSectionChange = (index: number, value: string) => {
    if (editingStep) {
      const updatedSubSections = [...editingStep.sub_section];
      updatedSubSections[index] = value;
      setEditingStep({ ...editingStep, sub_section: updatedSubSections });
    }
  };

  const addSubSection = () => {
    if (editingStep) {
      setEditingStep({
        ...editingStep,
        sub_section: [...editingStep.sub_section, "New Sub-section"],
      });
    }
  };

  const removeSubSection = (index: number) => {
    if (editingStep) {
      const updatedSubSections = editingStep.sub_section.filter(
        (_, i) => i !== index
      );
      setEditingStep({ ...editingStep, sub_section: updatedSubSections });
    }
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Learning Roadmap
        </h1>
        <div className="space-y-4">
          {roadmapData.map((step) => (
            <Card key={step.step_number}>
              <CardHeader className="py-4">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {step.step_number}. {step.section}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCreate(step.step_number)}
                      aria-label={`Create new step after ${step.section}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(step)}
                      aria-label={`Edit ${step.section}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(step.step_number)}
                      aria-label={`Delete ${step.section}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {step.sub_section.map((item, index) => (
                    <li key={index} className="text-muted-foreground list-disc">
                      - {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center w-full gap-2">
            <Button className="" variant="destructive">
              Delete
            </Button>
            <Button className="">Save roadmap</Button>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Step</DialogTitle>
          </DialogHeader>
          {editingStep && (
            <>
              <Input
                value={editingStep.section}
                onChange={(e) =>
                  setEditingStep({ ...editingStep, section: e.target.value })
                }
                className="mb-4"
                aria-label="Section title"
              />
              {editingStep.sub_section.map((subSection, index) => (
                <div key={index} className="flex mb-2">
                  <Input
                    value={subSection}
                    onChange={(e) =>
                      handleSubSectionChange(index, e.target.value)
                    }
                    className="flex-grow"
                    aria-label={`Sub-section ${index + 1}`}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeSubSection(index)}
                    className="ml-2"
                    aria-label={`Remove sub-section ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addSubSection} className="w-full mt-2">
                Add Sub-section
              </Button>
            </>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
