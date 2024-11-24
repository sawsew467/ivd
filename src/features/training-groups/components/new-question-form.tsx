import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { QuestionData, QuestionType } from "./test-editor";

interface NewQuestionFormProps {
  onSubmit: (question: QuestionData) => void;
}

export function NewQuestionForm({ onSubmit }: NewQuestionFormProps) {
  const [newQuestion, setNewQuestion] = useState<QuestionData>({
    id: "",
    questionType: "single_choice",
    question: "",
    options: ["", ""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newQuestion);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        value={newQuestion.questionType}
        onValueChange={(value) =>
          setNewQuestion({
            ...newQuestion,
            questionType: value as QuestionType,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single_choice">Single Choice</SelectItem>
          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
          <SelectItem value="essay">Essay</SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={newQuestion.question}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, question: e.target.value })
        }
        placeholder="Question"
        required
      />
      {newQuestion.questionType !== "essay" && (
        <div className="space-y-2">
          {newQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteOption(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              setNewQuestion({
                ...newQuestion,
                options: [...newQuestion.options, ""],
              })
            }
          >
            Add Option
          </Button>
        </div>
      )}
      <Button type="submit">Add Question</Button>
    </form>
  );
}
