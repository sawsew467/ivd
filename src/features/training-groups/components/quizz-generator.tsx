/* eslint-disable @typescript-eslint/no-explicit-any */
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
import TestEditor from "./test-editor";
import { useGenerateExamMutation } from "@/store/queries/exams";
import { useGetUserRoadmapsQuery } from "@/store/queries/roadmaps";

const formSchema = z
  .object({
    requirement: z
      .string()
      .min(5, { message: "Requirement must be at least 5 characters." }),
    numberOfQuestions: z
      .number()
      .min(1, { message: "Number of questions must be at least 1." })
      .max(100, { message: "Number of questions cannot exceed 100." }),
    single_choicePercentage: z.string(),
    // .min(0, { message: "Percentage cannot be negative." })
    // .max(100, { message: "Percentage cannot exceed 100." }),
    multipleChoicePercentage: z.string(),
    // .min(0, { message: "Percentage cannot be negative." })
    // .max(100, { message: "Percentage cannot exceed 100." }),
    essayPercentage: z.string(),
    // .min(0, { message: "Percentage cannot be negative." })
    // .max(100, { message: "Percentage cannot exceed 100." }),
    documents: z.array(z.string()),
  })
  .refine(
    (data) => {
      const total =
        +data.single_choicePercentage +
        +data.multipleChoicePercentage +
        +data.essayPercentage;
      return total === 100;
    },
    {
      message: "The sum of all percentages must equal 100%",
      path: [
        "single_choicePercentage",
        "multipleChoicePercentage",
        "essayPercentage",
      ],
    }
  );

function QuizGenerator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isShowQuizzEditor, setIsShowQuizzEditor] = useState(false);
  console.log("🚀 ~ QuizGenerator ~ isShowQuizzEditor:", isShowQuizzEditor);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement: "",
      numberOfQuestions: 10,
      single_choicePercentage: "40",
      multipleChoicePercentage: "40",
      essayPercentage: "20",
      documents: [],
    },
    mode: "onChange",
  });

  const { errors } = form.formState;

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("createBy");

    const newPath =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");
    router.push(newPath);
  };

  const [generateExam, { isLoading }] = useGenerateExamMutation();

  const { data: roadmaps } = useGetUserRoadmapsQuery({});

  const [exam, setExam] = useState<any>();

  const handleGenerate = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await generateExam({
        title: "",
        description: "",
        docsIds: values.documents,
        projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
        candidateId: "0e9de8ba-b406-4f73-89c5-94e9a9c2ee9e",
        roadmapId: roadmaps?.[0]?.id,
        prompt: values.requirement,
        ratioQuestion: {
          singleChoice: +values.single_choicePercentage / 100,
          multipleChoice: +values.multipleChoicePercentage / 100,
          essay: +values.essayPercentage / 100,
        },
        numberOfQuestions: values.numberOfQuestions,
      }).unwrap();
      setExam(res);
      console.log("🚀 ~ handleGenerate ~ res:", res);
      // refetch();
      setIsShowQuizzEditor(true);
      toast.success("Quiz generated successfully!");
    } catch (error) {
      console.log("🚀 ~ handleGenerate ~ error:", error);
      toast.error("Failed to generate quiz. Please try again later.");
    }
  };

  const handleDocumentModalClose = (selectedFiles?: string[]) => {
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
              name="single_choicePercentage"
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
            {errors.single_choicePercentage?.message ||
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
            <Sparkles className="ml-2" />
          </Button>
        </form>
      </Form>
      {exam && <TestEditor exam={exam} />}
      <DocumentSelectModal
        isOpen={isDocumentModalOpen}
        onClose={handleDocumentModalClose}
      />
    </div>
  );
}

export default QuizGenerator;
