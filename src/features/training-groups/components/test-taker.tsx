/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export function TestTaker({ exam }: any) {
  const questions = exam?.questions;
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEvaluation, setIsShowEvaluation] = useState(false);
  const [evaluation, setEvaluation] = useState<any>();

  const handleSingleChoiceChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleMultipleChoiceChange = (
    questionIndex: number,
    value: string,
    checked: boolean
  ) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionIndex] as string[]) || [];
      if (checked) {
        return { ...prev, [questionIndex]: [...currentAnswers, value] };
      } else {
        return {
          ...prev,
          [questionIndex]: currentAnswers.filter((v) => v !== value),
        };
      }
    });
  };

  const handleEssayChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const submissionData = {
      exam: questions.map((question: any, index: number) => ({
        question_type: question.questionType,
        question: question.question,
        options: question.options || [],
        ai_answer: question.aiAnswer || [],
        user_answer: Array.isArray(answers[index])
          ? answers[index]
          : answers[index]
          ? [answers[index]]
          : [],
      })),
    };

    try {
      const res = await axios(
        "http://mcg48gs4wco400w0oww80gcg.34.66.59.129.sslip.io:8989/exam_generator/api/exams/evaluate/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: submissionData,
        }
      );
      setEvaluation(res?.data);
      setIsShowEvaluation(true);
      console.log("🚀 ~ handleSubmit ~ res:", res);
    } catch (error) {
      console.error("Failed to submit");
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-8">Your test</h1>
      {questions?.map((question: any, index: number) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <p>Question {index + 1}:</p>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.questionType === "single_choice" && (
              <RadioGroup
                onValueChange={(value) =>
                  handleSingleChoiceChange(index, value)
                }
                value={answers[index] as string}
              >
                {question.options.map((option: any, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`question-${index}-option-${optionIndex}`}
                    />
                    <Label htmlFor={`question-${index}-option-${optionIndex}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {question.questionType === "multiple_choice" && (
              <div className="space-y-2">
                {question.options.map((option: any, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`question-${index}-option-${optionIndex}`}
                      checked={((answers[index] as string[]) || []).includes(
                        option
                      )}
                      onCheckedChange={(checked) =>
                        handleMultipleChoiceChange(
                          index,
                          option,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`question-${index}-option-${optionIndex}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
            {question.questionType === "essay" && (
              <Textarea
                placeholder="Type your answer here..."
                value={(answers[index] as string) || ""}
                onChange={(e) => handleEssayChange(index, e.target.value)}
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit} className="mt-4" disabled={isLoading}>
        {isLoading ? "Submitting Test..." : "Submit Test"}
      </Button>
      <Dialog open={isShowEvaluation} onOpenChange={setIsShowEvaluation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Exam Evaluation</DialogTitle>
            <DialogDescription>
              Review your exam feedback and total score below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-4 font-semibold">Feedback:</span>
              <p className="col-span-4 text-sm text-muted-foreground">
                {evaluation?.feedback}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-4 font-semibold">Total Score:</span>
              <p className="col-span-4 text-lg font-bold">
                {evaluation?.total_score}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsShowEvaluation(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
