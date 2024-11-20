"use client";

import { RoadmapStep } from "@/features/roadmap-templates/types";
import RoadmapGenerator from "@/features/training-groups/components/roadmap-generator";
import RoadmapStarter from "@/features/training-groups/components/roadmap-starter";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function Page() {
  const seachParams = useSearchParams();
  const createBy = seachParams.get("createBy");
  const [roadmap] = useState<RoadmapStep[] | null>(null);

  const renderRoadmap = () => {
    return <div>roadmap</div>;
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
      {roadmap ? renderRoadmap() : renderRoadmapCreator()}
    </div>
  );
}

export default Page;
