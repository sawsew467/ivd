"use client";

import EmptyQuizz from "@/features/training-groups/components/empty-quizz";
import QuizzGenerator from "@/features/training-groups/components/quizz-generator";
import QuizzStarter from "@/features/training-groups/components/quizz-starter";
import {
  initialQuestions,
  QuestionData,
} from "@/features/training-groups/components/test-editor";
import { TestTaker } from "@/features/training-groups/components/test-taker";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const seachParams = useSearchParams();
  const createBy = seachParams.get("createBy");
  const [questions] = useState<QuestionData[] | null>(initialQuestions);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const renderQuizz = () => {
    return <TestTaker questions={questions} />;
  };
  const renderQuizzCreator = () => {
    switch (createBy) {
      case null:
        return <QuizzStarter />;
      case "ai":
        return <QuizzGenerator />;
    }
  };

  return (
    <div className="w-full ">
      {role === "mentee" && !questions ? (
        <EmptyQuizz />
      ) : questions ? (
        renderQuizz()
      ) : (
        renderQuizzCreator()
      )}
    </div>
  );
}

export default Page;
