"use client";

import TemplateEditor, {
  initialRoadmapData,
} from "@/features/roadmap-templates/components/template-editor";
import { RoadmapStep } from "@/features/roadmap-templates/types";
import EmptyRoadmap from "@/features/training-groups/components/empty-roadmap";
import RoadmapGenerator from "@/features/training-groups/components/roadmap-generator";
import RoadmapStarter from "@/features/training-groups/components/roadmap-starter";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function Page() {
  const searchParams = useSearchParams();
  const createBy = searchParams.get("createBy");
  const [roadmap] = useState<RoadmapStep[] | null>(initialRoadmapData);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const renderRoadmap = () => {
    return <TemplateEditor mode="viewer" />;
  };

  const renderRoadmapCreator = () => {
    switch (createBy) {
      case null:
        return <RoadmapStarter />;
      case "ai":
        return <RoadmapGenerator />;
    }
  };

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
