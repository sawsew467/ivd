"use client";

import TemplateEditor from "@/features/roadmap-templates/components/template-editor";
import { RoadmapStep } from "@/features/roadmap-templates/types";
import EmptyRoadmap from "@/features/training-groups/components/empty-roadmap";
import RoadmapGenerator from "@/features/training-groups/components/roadmap-generator";
import RoadmapStarter from "@/features/training-groups/components/roadmap-starter";
import { useGetUserRoadmapsQuery } from "@/store/queries/roadmaps";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function Page() {
  const searchParams = useSearchParams();
  const createBy = searchParams.get("createBy");
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const { data, isFetching } = useGetUserRoadmapsQuery({});
  console.log("🚀 ~ Page ~ data:", data);

  useEffect(() => {
    if (data?.length) {
      setRoadmap(data?.[0]);
    }
  }, [data]);

  const renderRoadmap = () => {
    return <TemplateEditor mode="viewer" template={data?.[0]?.content} />;
  };

  const renderRoadmapCreator = () => {
    switch (createBy) {
      case null:
        return <RoadmapStarter />;
      case "ai":
        return (
          <RoadmapGenerator userId={"0e9de8ba-b406-4f73-89c5-94e9a9c2ee9e"} />
        );
    }
  };

  if (isFetching) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {role === "mentee" && !roadmap ? (
        <EmptyRoadmap />
      ) : roadmap ? (
        renderRoadmap()
      ) : (
        renderRoadmapCreator()
      )}
    </div>
  );
}

export default Page;
