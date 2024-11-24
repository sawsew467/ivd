"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TemplateEditor from "@/features/roadmap-templates/components/template-editor";
import { MoveLeft, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useGenerateRoadmapMutation } from "@/store/queries/roadmaps";
import { RoadmapStep } from "@/features/roadmap-templates/types";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
  prompt: z
    .string()
    .min(5, { message: "Prompt must be at least 5 characters." }),
});

function RoadmapGenerator({ userId = null }: { userId: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [generateRoadmap, { isLoading }] = useGenerateRoadmapMutation();

  // const [isShowTemplateEditor, setIsShowTemplateEditor] = useState(false);

  const [template, setTempate] = useState<RoadmapStep[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, errors } = form.formState;
  console.log("🚀 ~ RoadmapGenerator ~ isSubmitting:", isSubmitting);
  console.log("🚀 ~ RoadmapGenerator ~ errors:", errors);

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("createBy");

    const newPath =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");
    router.push(newPath);
  };

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    prompt: string;
  } | null>();

  const handleGenerate = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await generateRoadmap({
        projectId: "e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
        userId: userId,
        roadmapTemplateId: null,
        prompt: values.prompt,
      });

      setFormData(values);
      console.log("🚀 ~ handleGenerate ~ res:", res);
      setTempate(res.data);
      toast.success("Roadmap generated successfully!");
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      toast.error("Failed to generate roadmap.");
    }
    // console.log("Generated Roadmap Data:", values);
    // setIsShowTemplateEditor(true);
    // toast.success("Roadmap generated successfully!");
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-8">
        <Button size="sm" variant="ghost" onClick={handleBack}>
          <MoveLeft />
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-2">Roadmap Generator</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGenerate)}
          className="mx-auto flex gap-4 w-2/3 mb-8 flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roadmap Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name..." {...field} />
                </FormControl>
                <FormDescription>
                  Provide name for your roadmap.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roadmap Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your roadmap.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt for Generative</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your prompt..." {...field} />
                </FormControl>
                <FormDescription>
                  Provide a prompt for generating the roadmap.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
            <Sparkles />
          </Button>
        </form>
      </Form>
      {template && (
        <TemplateEditor
          template={template}
          title={formData?.name}
          description={formData?.description}
          isTemplate={true}
          userId={userId}
        />
      )}
    </div>
  );
}

export default RoadmapGenerator;
