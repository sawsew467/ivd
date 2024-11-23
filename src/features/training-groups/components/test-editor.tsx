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

export type QuestionType = "singlechoice" | "multichoice" | "essay";

export interface QuestionData {
  id: string;
  question_type: QuestionType;
  question: string;
  options: string[];
}

export const initialQuestions: QuestionData[] = [
  {
    id: "1",
    question_type: "singlechoice",
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
  },
  {
    id: "2",
    question_type: "multichoice",
    question: "Which of the following are programming languages?",
    options: ["Python", "Java", "HTML", "CSS"],
  },
  {
    id: "3",
    question_type: "essay",
    question: "Explain the impact of climate change on global ecosystems.",
    options: [],
  },
  {
    id: "4",
    question_type: "singlechoice",
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
  },
  {
    id: "5",
    question_type: "multichoice",
    question: "Select all fruits from the list below:",
    options: ["Apple", "Carrot", "Banana", "Potato"],
  },
  {
    id: "6",
    question_type: "essay",
    question:
      "Discuss the advantages and disadvantages of renewable energy sources.",
    options: [],
  },
  {
    id: "7",
    question_type: "singlechoice",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
  },
  {
    id: "8",
    question_type: "multichoice",
    question: "Which of the following are prime numbers?",
    options: ["2", "4", "7", "9"],
  },
  {
    id: "9",
    question_type: "essay",
    question: "Explain the process of photosynthesis in plants.",
    options: [],
  },
  {
    id: "10",
    question_type: "singlechoice",
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
  },
];

export default function TestEditor() {
  const [questions, setQuestions] = useState<QuestionData[]>(initialQuestions);

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
