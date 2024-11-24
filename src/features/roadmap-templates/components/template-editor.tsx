"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateRoadmapMutation } from "@/store/queries/roadmaps";
import { useRouter } from "next/navigation";

export const initialRoadmapData: RoadmapStep[] = [
  {
    stepNumber: 1,
    section: "Cooking Basics",
    subSection: [
      "Kitchen Safety and Hygiene",
      "Knife Skills",
      "Cooking Techniques (boiling, frying, baking, etc.)",
      "Understanding Ingredients",
      "Meal Planning and Preparation",
    ],
  },
  {
    stepNumber: 2,
    section: "Understanding Python",
    subSection: [
      "Python Basics",
      "Data Structures in Python",
      "Control Flow Tools in Python",
      "Modules in Python",
      "Errors and Exception Handling in Python",
    ],
  },
  {
    stepNumber: 3,
    section: "Introduction to FastAPI",
    subSection: [
      "Installation of FastAPI",
      "FastAPI Principals",
      "Basics of FastAPI",
      "FastAPI Compared to Other Frameworks",
      "Understanding FastAPI's Dependency Injection System",
    ],
  },
  {
    stepNumber: 4,
    section: "Advanced FastAPI",
    subSection: [
      "API Models with Pydantic",
      "OAuth2 with Password and Bearer",
      "Security, Testing, Scaling FastAPI",
      "FastAPI's Plugin",
      "Middleware in FastAPI",
    ],
  },
  {
    stepNumber: 5,
    section: "Database Integration with FastAPI",
    subSection: [
      "SQL (Relational) Databases",
      "NoSQL Databases",
      "Mocking in Unit Tests",
      "Automated Testing for FastAPI Applications",
      "Testing FastAPI Applications with Pytest",
    ],
  },
];

export default function TemplateEditor({
  mode = "editor",
  template,
  title,
  description,
  isTemplate = false,
  userId = null,
}: {
  mode?: "editor" | "viewer";
  template: RoadmapStep[];
  title?: string;
  description?: string;
  isTemplate?: boolean;
  userId?: string | null;
}) {
  const [roadmapData, setRoadmapData] = useState<RoadmapStep[]>(template);
  const [editingStep, setEditingStep] = useState<RoadmapStep | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (afterStep: number) => {
    const newStep: RoadmapStep = {
      stepNumber: afterStep + 1,
      section: "New Section",
      subSection: ["New Sub-section"],
    };
    const updatedData = roadmapData.map((step) =>
      step.stepNumber > afterStep
        ? { ...step, stepNumber: step.stepNumber + 1 }
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
      .filter((step) => step.stepNumber !== stepNumber)
      .map((step) =>
        step.stepNumber > stepNumber
          ? { ...step, stepNumber: step.stepNumber - 1 }
          : step
      );
    setRoadmapData(updatedData);
  };

  const [createRoadmap, { isLoading }] = useCreateRoadmapMutation();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await createRoadmap({
        title: title,
        content: roadmapData,
        description: description,
        isTemplate: isTemplate,
        userId: userId,
        projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
      }).unwrap();
      console.log("🚀 ~ handleSave ~ res:", res);
      toast.success("Roadmap saved successfully!");
      router.back();
    } catch (error) {
      console.log("🚀 ~ handleSave ~ error:", error);
    }
  };

  const handleSave = () => {
    if (editingStep) {
      setRoadmapData(
        roadmapData.map((step) =>
          step.stepNumber === editingStep.stepNumber ? editingStep : step
        )
      );
      setIsModalOpen(false);
      setEditingStep(null);
    }
  };

  const handleSubSectionChange = (index: number, value: string) => {
    if (editingStep) {
      const updatedSubSections = [...editingStep.subSection];
      updatedSubSections[index] = value;
      setEditingStep({ ...editingStep, subSection: updatedSubSections });
    }
  };

  const addSubSection = () => {
    if (editingStep) {
      setEditingStep({
        ...editingStep,
        subSection: [...editingStep.subSection, "New Sub-section"],
      });
    }
  };

  const removeSubSection = (index: number) => {
    if (editingStep) {
      const updatedSubSections = editingStep.subSection.filter(
        (_, i) => i !== index
      );
      setEditingStep({ ...editingStep, subSection: updatedSubSections });
    }
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Learning Roadmap
        </h1>
        <div className="space-y-4">
          {roadmapData?.map((step) => (
            <Card key={step.stepNumber}>
              <CardHeader className="py-4">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {step.stepNumber}. {step.section}
                  </span>
                  {mode === "editor" && (
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleCreate(step.stepNumber)}
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
                        onClick={() => handleDelete(step.stepNumber)}
                        aria-label={`Delete ${step.section}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul
                  className={cn(
                    " space-y-1",
                    mode === "editor" && "list-disc list-inside"
                  )}
                >
                  {step.subSection.map((item, index) => (
                    <li
                      key={index}
                      className={cn(
                        "text-muted-foreground "
                        // mode === "editor" && "list-disc"
                      )}
                    >
                      {mode === "viewer" && <Checkbox className="mr-2" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          {mode === "editor" && (
            <div className="flex justify-center w-full gap-2">
              <Button className="" variant="destructive">
                Delete
              </Button>
              <Button className="" onClick={handleSubmit} disabled={isLoading}>
                Save roadmap
                {isLoading && <Loader className=" animate-spin" />}
              </Button>
            </div>
          )}
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
              {editingStep.subSection.map((subSection, index) => (
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
