"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { QuestionData } from "./test-editor";

interface TestTakerProps {
  questions: QuestionData[] | null;
}

export function TestTaker({ questions }: TestTakerProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const handleSingleChoiceChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultiChoiceChange = (
    questionId: string,
    value: string,
    checked: boolean
  ) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, value] };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((v) => v !== value),
        };
      }
    });
  };

  const handleEssayChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Test Submission:", answers);
    // Here you would typically send this data to a server
    alert("Test submitted successfully!");
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-8">Your test</h1>
      {questions?.map((question, index) => (
        <Card key={question.id} className="mb-4">
          <CardHeader>
            <p>Question {index + 1}:</p>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.question_type === "singlechoice" && (
              <RadioGroup
                onValueChange={(value) =>
                  handleSingleChoiceChange(question.id, value)
                }
                value={answers[question.id] as string}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={`${question.id}-${index}`}
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {question.question_type === "multichoice" && (
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${index}`}
                      checked={(
                        (answers[question.id] as string[]) || []
                      ).includes(option)}
                      onCheckedChange={(checked) =>
                        handleMultiChoiceChange(
                          question.id,
                          option,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            )}
            {question.question_type === "essay" && (
              <Textarea
                placeholder="Type your answer here..."
                value={(answers[question.id] as string) || ""}
                onChange={(e) => handleEssayChange(question.id, e.target.value)}
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit} className="mt-4">
        Submit Test
      </Button>
    </div>
  );
}
