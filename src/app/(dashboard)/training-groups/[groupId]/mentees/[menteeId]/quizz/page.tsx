/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EmptyQuizz from "@/features/training-groups/components/empty-quizz";
import QuizzGenerator from "@/features/training-groups/components/quizz-generator";
import QuizzStarter from "@/features/training-groups/components/quizz-starter";
// import {
//   initialQuestions,
//   QuestionData,
// } from "@/features/training-groups/components/test-editor";
import { TestTaker } from "@/features/training-groups/components/test-taker";
import { useGetUserExamsQuery } from "@/store/queries/exams";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const seachParams = useSearchParams();
  const createBy = seachParams.get("createBy");
  // const [questions] = useState<QuestionData[] | null>(initialQuestions);

  const [exam, setExam] = useState<any>();

  const [role, setRole] = useState<string | null>(null);

  const { data } = useGetUserExamsQuery({});
  console.log("🚀 ~ Page ~ data exammmm:", data);

  useEffect(() => {
    if (data) {
      setExam(data?.[0]);
    }
  }, [data]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const renderQuizz = () => {
    return <TestTaker exam={exam} />;
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
      {role === "mentee" && !exam ? (
        <EmptyQuizz />
      ) : exam ? (
        renderQuizz()
      ) : (
        renderQuizzCreator()
      )}
    </div>
  );
}

export default Page;
