"use client";

import { Button } from "@/components/ui/button";
import { RoadmapStep, Template } from "@/features/roadmap-templates/types";
import RoadmapGenerator from "@/features/training-groups/components/roadmap-generator";
import RoadmapStarter from "@/features/training-groups/components/roadmap-starter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Page() {
  const router = useRouter();
  const seachParams = useSearchParams();
  const createBy = seachParams.get("createBy");
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);

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
