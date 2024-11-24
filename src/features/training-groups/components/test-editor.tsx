/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Question } from "./question";
import { NewQuestionForm } from "./new-question-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type QuestionType = "single_choice" | "multiple_choice" | "essay";

export interface QuestionData {
  id: string;
  questionType: QuestionType;
  question: string;
  options: string[];
}

export default function TestEditor({ exam }: { exam: any }) {
  const [questions, setQuestions] = useState<QuestionData[]>(
    exam?.content || []
  );

  const handleQuestionUpdate = (updatedQuestion: QuestionData) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleQuestionDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleNewQuestion = (newQuestion: QuestionData, afterId?: string) => {
    const newQuestionWithId = { ...newQuestion, id: Date.now().toString() };
    if (afterId) {
      const index = questions.findIndex((q) => q.id === afterId);
      const newQuestions = [...questions];
      newQuestions.splice(index + 1, 0, newQuestionWithId);
      setQuestions(newQuestions);
    } else {
      setQuestions([...questions, newQuestionWithId]);
    }
  };

  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4 text-center">Quizz Editor</h3>
      {questions.map((question, index) => (
        <div key={question.id} className="mb-4">
          <Question
            question={question}
            onUpdate={handleQuestionUpdate}
            onDelete={handleQuestionDelete}
            handleNewQuestion={handleNewQuestion}
            questionIndex={index + 1}
          />
        </div>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add New Question</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Question</DialogTitle>
          </DialogHeader>
          <NewQuestionForm onSubmit={handleNewQuestion} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
