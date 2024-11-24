import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { QuestionData, QuestionType } from "./test-editor";
import { NewQuestionForm } from "./new-question-form";
import { cn } from "@/lib/utils";

interface QuestionProps {
  question: QuestionData;
  onUpdate: (updatedQuestion: QuestionData) => void;
  onDelete: (id: string) => void;
  handleNewQuestion: (newQuestion: QuestionData, afterId?: string) => void;
  questionIndex: number;
}

export function Question({
  question,
  onUpdate,
  onDelete,
  handleNewQuestion,
  questionIndex,
}: QuestionProps) {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleSave = () => {
    onUpdate(editedQuestion);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = editedQuestion.options.filter((_, i) => i !== index);
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  return (
    <Card>
      <CardHeader
        className={cn("py-4", question.questionType === "essay" && "pb-0")}
      >
        <CardTitle className="flex items-start justify-between">
          <div>
            <p className="mb-2 font-normal text-base">
              Question {questionIndex}:
            </p>
            <h3 className="font-bold">{question.question}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Type: {question.questionType}
            </p>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Question</DialogTitle>
                </DialogHeader>
                <NewQuestionForm
                  onSubmit={(newQuestion) =>
                    handleNewQuestion(newQuestion, question.id)
                  }
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select
                    value={editedQuestion.questionType}
                    onValueChange={(value) =>
                      setEditedQuestion({
                        ...editedQuestion,
                        questionType: value as QuestionType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_choice">
                        Single Choice
                      </SelectItem>
                      <SelectItem value="multiple_choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={editedQuestion.question}
                    onChange={(e) =>
                      setEditedQuestion({
                        ...editedQuestion,
                        question: e.target.value,
                      })
                    }
                    placeholder="Question"
                  />
                  {editedQuestion.questionType !== "essay" && (
                    <div className="space-y-2">
                      {editedQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteOption(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          setEditedQuestion({
                            ...editedQuestion,
                            options: [...editedQuestion.options, ""],
                          })
                        }
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onDelete(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.questionType !== "essay" && (
          <ul className="list-disc list-inside mb-2">
            {question.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
