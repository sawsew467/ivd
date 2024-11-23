"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoveLeft, Sparkles, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { DocumentSelectModal } from "./document-select-modal";
import { FileItem } from "@/features/documents/types";
import TestEditor from "./test-editor";

const formSchema = z
  .object({
    requirement: z
      .string()
      .min(5, { message: "Requirement must be at least 5 characters." }),
    numberOfQuestions: z
      .number()
      .min(1, { message: "Number of questions must be at least 1." })
      .max(100, { message: "Number of questions cannot exceed 100." }),
    singleChoicePercentage: z
      .number()
      .min(0, { message: "Percentage cannot be negative." })
      .max(100, { message: "Percentage cannot exceed 100." }),
    multipleChoicePercentage: z
      .number()
      .min(0, { message: "Percentage cannot be negative." })
      .max(100, { message: "Percentage cannot exceed 100." }),
    essayPercentage: z
      .number()
      .min(0, { message: "Percentage cannot be negative." })
      .max(100, { message: "Percentage cannot exceed 100." }),
    documents: z.array(z.number()),
  })
  .refine(
    (data) => {
      const total =
        data.singleChoicePercentage +
        data.multipleChoicePercentage +
        data.essayPercentage;
      return total === 100;
    },
    {
      message: "The sum of all percentages must equal 100%",
      path: [
        "singleChoicePercentage",
        "multipleChoicePercentage",
        "essayPercentage",
      ],
    }
  );

const files: FileItem[] = [
  { id: 10, name: "beach.jpg", type: "file", size: "2.2 MB" },
  { id: 11, name: "mountains.jpg", type: "file", size: "3.1 MB" },
  { id: 12, name: "profile_picture.jpg", type: "file", size: "3.2 MB" },
  {
    id: 14,
    name: "1_001_C24TTK_22406_83091_001_C24TTK_22406_8309.pdf",
    type: "file",
    size: "2.5 MB",
  },
];

function QuizGenerator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isShowQuizzEditor, setIsShowQuizzEditor] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement: "",
      numberOfQuestions: 10,
      singleChoicePercentage: 40,
      multipleChoicePercentage: 40,
      essayPercentage: 20,
      documents: [],
    },
    mode: "onChange",
  });

  const { isSubmitting, errors } = form.formState;

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("createBy");

    const newPath =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");
    router.push(newPath);
  };

  const handleGenerate = (values: z.infer<typeof formSchema>) => {
    console.log("Generated Quiz Data:", values);
    setIsShowQuizzEditor(true);
    toast.success("Quiz generated successfully!");
  };

  const handleDocumentModalClose = (selectedFiles?: number[]) => {
    setIsDocumentModalOpen(false);
    if (selectedFiles) {
      form.setValue("documents", selectedFiles);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-8">
        <Button size="sm" variant="ghost" onClick={handleBack}>
          <MoveLeft />
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-2">Quizz Generator</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGenerate)}
          className="mx-auto flex gap-4 w-2/3 mb-8 flex-col"
        >
          <FormField
            control={form.control}
            name="requirement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Requirement</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter quiz requirement..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed requirement for your quiz.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of questions..."
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Specify the total number of questions for the quiz.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="singleChoicePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Single Choice %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter percentage..."
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="multipleChoicePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multiple Choice %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter percentage..."
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="essayPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Essay %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter percentage..."
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage>
            {errors.singleChoicePercentage?.message ||
              errors.multipleChoicePercentage?.message ||
              errors.essayPercentage?.message}
          </FormMessage>
          <Controller
            name="documents"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documents</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDocumentModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Documents
                    </Button>
                    <span className="text-sm text-gray-500">
                      {field.value.length} document(s) selected
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Generate
            <Sparkles className="ml-2" />
          </Button>
        </form>
      </Form>
      {!isShowQuizzEditor && <TestEditor />}
      <DocumentSelectModal
        isOpen={isDocumentModalOpen}
        onClose={handleDocumentModalClose}
        files={files}
      />
    </div>
  );
}

export default QuizGenerator;
